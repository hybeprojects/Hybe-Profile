import fs from "fs"
import path from "path"

// Attempt to load better-sqlite3. If not available (build scripts blocked), fallback to JSON store.
let sqliteAvailable = false as boolean
let BetterSqlite: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  BetterSqlite = require("better-sqlite3")
  sqliteAvailable = true
} catch {
  sqliteAvailable = false
}

export type AdminProfile = {
  id: number
  hybe_id: string
  full_name: string | null
  email: string | null
  is_registered: number
  requires_password_change: number
  password_hash: string | null
  created_at: string
  updated_at: string
}

export type OTPCode = {
  id: number
  hybe_id: string
  code: string
  expires_at: string
  used: boolean
  failed_attempts: number
  created_at: string
  updated_at: string
}

const dbDir = path.join(process.cwd(), "db")
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true })

// JSON fallback helpers
const jsonPath = path.join(dbDir, "app.json")
function readJson(): { admin_profiles: AdminProfile[]; otp_codes: OTPCode[] } {
  if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify({ admin_profiles: [], otp_codes: [] }, null, 2))
  }
  const raw = fs.readFileSync(jsonPath, "utf-8")
  try {
    const parsed = JSON.parse(raw)
    if (!parsed.admin_profiles) parsed.admin_profiles = []
    if (!parsed.otp_codes) parsed.otp_codes = []
    return parsed
  } catch {
    return { admin_profiles: [], otp_codes: [] }
  }
}
function writeJson(data: { admin_profiles: AdminProfile[]; otp_codes: OTPCode[] }) {
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))
}

// SQLite implementation
let sqliteDb: any = null
function ensureSqlite() {
  if (sqliteDb) return sqliteDb
  const dbPath = path.join(dbDir, "app.sqlite")
  const db = new BetterSqlite(dbPath)
  db.pragma("journal_mode = WAL")
  db
    .prepare(
      `CREATE TABLE IF NOT EXISTS admin_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hybe_id TEXT UNIQUE NOT NULL,
        full_name TEXT,
        email TEXT,
        is_registered INTEGER NOT NULL DEFAULT 0,
        requires_password_change INTEGER NOT NULL DEFAULT 0,
        password_hash TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    )
    .run()
  db
    .prepare(
      `CREATE TRIGGER IF NOT EXISTS trg_admin_profiles_updated
      AFTER UPDATE ON admin_profiles
      BEGIN
        UPDATE admin_profiles SET updated_at = datetime('now') WHERE id = NEW.id;
      END;`,
    )
    .run()

  // OTP codes table
  db
    .prepare(
      `CREATE TABLE IF NOT EXISTS otp_codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hybe_id TEXT NOT NULL,
        code TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        used INTEGER NOT NULL DEFAULT 0,
        failed_attempts INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
    )
    .run()
  db
    .prepare(
      `CREATE TRIGGER IF NOT EXISTS trg_otp_codes_updated
      AFTER UPDATE ON otp_codes
      BEGIN
        UPDATE otp_codes SET updated_at = datetime('now') WHERE id = NEW.id;
      END;`,
    )
    .run()

  sqliteDb = db
  return db
}

export const adminProfiles = {
  getByHybeId(hybeId: string): AdminProfile | undefined {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      const row = d.prepare("SELECT * FROM admin_profiles WHERE hybe_id = ?").get(hybeId)
      return row as AdminProfile | undefined
    }
    const data = readJson()
    return data.admin_profiles.find((p) => p.hybe_id === hybeId)
  },
  list(): AdminProfile[] {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      return d.prepare("SELECT * FROM admin_profiles ORDER BY created_at DESC").all() as AdminProfile[]
    }
    const data = readJson()
    return data.admin_profiles
  },
  create(input: { hybe_id: string; full_name?: string; email?: string }): AdminProfile {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      d
        .prepare(
          "INSERT INTO admin_profiles (hybe_id, full_name, email, is_registered, requires_password_change) VALUES (?, ?, ?, 0, 0)",
        )
        .run(input.hybe_id, input.full_name ?? null, input.email ?? null)
      const row = d.prepare("SELECT * FROM admin_profiles WHERE hybe_id = ?").get(input.hybe_id)
      return row as AdminProfile
    }
    const data = readJson()
    const now = new Date().toISOString()
    const newItem: AdminProfile = {
      id: (data.admin_profiles.at(-1)?.id ?? 0) + 1,
      hybe_id: input.hybe_id,
      full_name: input.full_name ?? null,
      email: input.email ?? null,
      is_registered: 0,
      requires_password_change: 0,
      password_hash: null,
      created_at: now,
      updated_at: now,
    }
    data.admin_profiles.unshift(newItem)
    writeJson(data)
    return newItem
  },
  markRegistered(hybeId: string, passwordHash: string, requiresChange: boolean) {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      d
        .prepare(
          "UPDATE admin_profiles SET is_registered = 1, requires_password_change = ?, password_hash = ? WHERE hybe_id = ?",
        )
        .run(requiresChange ? 1 : 0, passwordHash, hybeId)
      return
    }
    const data = readJson()
    const idx = data.admin_profiles.findIndex((p) => p.hybe_id === hybeId)
    if (idx !== -1) {
      data.admin_profiles[idx].is_registered = 1
      data.admin_profiles[idx].requires_password_change = requiresChange ? 1 : 0
      data.admin_profiles[idx].password_hash = passwordHash
      data.admin_profiles[idx].updated_at = new Date().toISOString()
      writeJson(data)
    }
  },
  updatePassword(hybeId: string, passwordHash: string) {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      d
        .prepare("UPDATE admin_profiles SET password_hash = ?, requires_password_change = 0 WHERE hybe_id = ?")
        .run(passwordHash, hybeId)
      return
    }
    const data = readJson()
    const idx = data.admin_profiles.findIndex((p) => p.hybe_id === hybeId)
    if (idx !== -1) {
      data.admin_profiles[idx].password_hash = passwordHash
      data.admin_profiles[idx].requires_password_change = 0
      data.admin_profiles[idx].updated_at = new Date().toISOString()
      writeJson(data)
    }
  },
}

export const otpStore = {
  async create(otp: { hybe_id: string; code: string; expires_at: string; used?: boolean; failed_attempts?: number }) {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      d
        .prepare(
          "INSERT INTO otp_codes (hybe_id, code, expires_at, used, failed_attempts) VALUES (?, ?, ?, ?, ?)",
        )
        .run(otp.hybe_id, otp.code, otp.expires_at, otp.used ? 1 : 0, otp.failed_attempts ?? 0)
      const row = d.prepare("SELECT * FROM otp_codes WHERE id = last_insert_rowid() LIMIT 1").get()
      return row as OTPCode
    }

    const data = readJson()
    const now = new Date().toISOString()
    const newItem: OTPCode = {
      id: (data.otp_codes.at(-1)?.id ?? 0) + 1,
      hybe_id: otp.hybe_id,
      code: otp.code,
      expires_at: otp.expires_at,
      used: Boolean(otp.used ?? false),
      failed_attempts: otp.failed_attempts ?? 0,
      created_at: now,
      updated_at: now,
    }
    data.otp_codes.unshift(newItem)
    writeJson(data)
    return newItem
  },
  getLatestValid(hybeId: string): OTPCode | undefined {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      const row = d
        .prepare(
          "SELECT * FROM otp_codes WHERE hybe_id = ? AND used = 0 AND expires_at > datetime('now') ORDER BY created_at DESC LIMIT 1",
        )
        .get(hybeId)
      return row as OTPCode | undefined
    }
    const data = readJson()
    return data.otp_codes.find((o) => o.hybe_id === hybeId && !o.used && new Date(o.expires_at) > new Date())
  },
  markUsed(id: number) {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      d.prepare("UPDATE otp_codes SET used = 1 WHERE id = ?").run(id)
      return
    }
    const data = readJson()
    const idx = data.otp_codes.findIndex((o) => o.id === id)
    if (idx !== -1) {
      data.otp_codes[idx].used = true
      data.otp_codes[idx].updated_at = new Date().toISOString()
      writeJson(data)
    }
  },
  incrementFailedAttempts(id: number) {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      d.prepare("UPDATE otp_codes SET failed_attempts = failed_attempts + 1 WHERE id = ?").run(id)
      return
    }
    const data = readJson()
    const idx = data.otp_codes.findIndex((o) => o.id === id)
    if (idx !== -1) {
      data.otp_codes[idx].failed_attempts += 1
      data.otp_codes[idx].updated_at = new Date().toISOString()
      writeJson(data)
    }
  },
}
