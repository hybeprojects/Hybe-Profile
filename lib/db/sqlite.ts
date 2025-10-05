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
  contact: string | null
  is_registered: number
  requires_password_change: number
  password_hash: string | null
  created_at: string
  updated_at: string
}

const dbDir = path.join(process.cwd(), "db")
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true })

// JSON fallback helpers
const jsonPath = path.join(dbDir, "app.json")
function readJson(): { admin_profiles: AdminProfile[] } {
  if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify({ admin_profiles: [] }, null, 2))
  }
  const raw = fs.readFileSync(jsonPath, "utf-8")
  try {
    const parsed = JSON.parse(raw)
    if (!parsed.admin_profiles) parsed.admin_profiles = []
    // map legacy email -> contact
    const mapped = parsed.admin_profiles.map((p: any) => ({ ...p, contact: p.email ?? null }))
    return { admin_profiles: mapped }
  } catch {
    return { admin_profiles: [] }
  }
}
function writeJson(data: { admin_profiles: AdminProfile[] }) {
  // map contact back to email for storage compatibility
  const toStore = { admin_profiles: data.map((p) => ({ ...p, email: p.contact ?? null })) }
  fs.writeFileSync(jsonPath, JSON.stringify(toStore, null, 2))
}

// SQLite implementation
let sqliteDb: any = null
function ensureSqlite() {
  if (sqliteDb) return sqliteDb
  const dbPath = path.join(dbDir, "app.sqlite")
  try {
    const db = new BetterSqlite(dbPath)
    db.pragma("journal_mode = WAL")
    db
      .prepare(
        `CREATE TABLE IF NOT EXISTS admin_profiles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hybe_id TEXT UNIQUE NOT NULL,
          full_name TEXT,
          contact TEXT,
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
    sqliteDb = db
    return db
  } catch (err) {
    // If creating the native sqlite DB fails (missing native bindings), fall back to JSON store.
    sqliteAvailable = false
    sqliteDb = null
    return null
  }
}

export const adminProfiles = {
  getByHybeId(hybeId: string): AdminProfile | undefined {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      if (d) {
        const row = d.prepare("SELECT * FROM admin_profiles WHERE hybe_id = ?").get(hybeId)
        if (!row) return undefined
        return { ...row, contact: row.contact ?? null } as AdminProfile
      }
      // fallthrough to JSON fallback
    }
    const data = readJson()
    return data.admin_profiles.find((p) => p.hybe_id === hybeId)
  },
  list(): AdminProfile[] {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      if (d) {
        const rows = d.prepare("SELECT * FROM admin_profiles ORDER BY created_at DESC").all() as any[]
        return rows.map((r) => ({ ...r, contact: r.contact ?? null })) as AdminProfile[]
      }
      // fallthrough to JSON fallback
    }
    const data = readJson()
    return data.admin_profiles
  },
  create(input: { hybe_id: string; full_name?: string; contact?: string }): AdminProfile {
    if (sqliteAvailable) {
      const d = ensureSqlite()
      if (d) {
        d
          .prepare(
            "INSERT INTO admin_profiles (hybe_id, full_name, contact, is_registered, requires_password_change) VALUES (?, ?, ?, 0, 0)",
          )
          .run(input.hybe_id, input.full_name ?? null, input.contact ?? null)
        const row = d.prepare("SELECT * FROM admin_profiles WHERE hybe_id = ?").get(input.hybe_id)
        return { ...row, contact: row.contact ?? null } as AdminProfile
      }
      // fallthrough to JSON fallback
    }
    const data = readJson()
    const now = new Date().toISOString()
    const newItem: AdminProfile = {
      id: (data.admin_profiles.at(-1)?.id ?? 0) + 1,
      hybe_id: input.hybe_id,
      full_name: input.full_name ?? null,
      contact: input.contact ?? null,
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
      if (d) {
        d
          .prepare(
            "UPDATE admin_profiles SET is_registered = 1, requires_password_change = ?, password_hash = ? WHERE hybe_id = ?",
          )
          .run(requiresChange ? 1 : 0, passwordHash, hybeId)
        return
      }
      // fallthrough to JSON fallback
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
      if (d) {
        d
          .prepare("UPDATE admin_profiles SET password_hash = ?, requires_password_change = 0 WHERE hybe_id = ?")
          .run(passwordHash, hybeId)
        return
      }
      // fallthrough to JSON fallback
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
