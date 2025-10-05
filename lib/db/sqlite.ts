import Database from "better-sqlite3"
import fs from "fs"
import path from "path"

let db: Database.Database | null = null

function ensureDb(): Database.Database {
  if (db) return db
  const dbDir = path.join(process.cwd(), "db")
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true })
  const dbPath = path.join(dbDir, "app.sqlite")
  const instance = new Database(dbPath)
  instance.pragma("journal_mode = WAL")

  // Create tables if not exist
  instance
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

  // Trigger to keep updated_at fresh
  instance
    .prepare(
      `CREATE TRIGGER IF NOT EXISTS trg_admin_profiles_updated
      AFTER UPDATE ON admin_profiles
      BEGIN
        UPDATE admin_profiles SET updated_at = datetime('now') WHERE id = NEW.id;
      END;`,
    )
    .run()

  db = instance
  return instance
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

export const adminProfiles = {
  getByHybeId(hybeId: string): AdminProfile | undefined {
    const d = ensureDb()
    const row = d.prepare("SELECT * FROM admin_profiles WHERE hybe_id = ?").get(hybeId)
    return row as AdminProfile | undefined
  },
  list(): AdminProfile[] {
    const d = ensureDb()
    return d.prepare("SELECT * FROM admin_profiles ORDER BY created_at DESC").all() as AdminProfile[]
  },
  create(input: { hybe_id: string; full_name?: string; email?: string }): AdminProfile {
    const d = ensureDb()
    d
      .prepare(
        "INSERT INTO admin_profiles (hybe_id, full_name, email, is_registered, requires_password_change) VALUES (?, ?, ?, 0, 0)",
      )
      .run(input.hybe_id, input.full_name ?? null, input.email ?? null)
    return this.getByHybeId(input.hybe_id) as AdminProfile
  },
  markRegistered(hybeId: string, passwordHash: string, requiresChange: boolean) {
    const d = ensureDb()
    d
      .prepare(
        "UPDATE admin_profiles SET is_registered = 1, requires_password_change = ?, password_hash = ? WHERE hybe_id = ?",
      )
      .run(requiresChange ? 1 : 0, passwordHash, hybeId)
  },
  updatePassword(hybeId: string, passwordHash: string) {
    const d = ensureDb()
    d.prepare("UPDATE admin_profiles SET password_hash = ?, requires_password_change = 0 WHERE hybe_id = ?").run(passwordHash, hybeId)
  },
}
