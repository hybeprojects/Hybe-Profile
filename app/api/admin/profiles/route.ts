import { NextResponse } from "next/server"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { adminProfiles } from "@/lib/db/sqlite"
import { getSession } from "@/lib/auth/session"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return NextResponse.json({ data: adminProfiles.list() })
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  if (!body?.hybe_id) return NextResponse.json({ error: "hybe_id is required" }, { status: 400 })

  // Create the profile (stored as unregistered by default)
  const created = adminProfiles.create({ hybe_id: String(body.hybe_id).toUpperCase(), full_name: body.full_name, contact: body.contact ?? null })

  // If an initial password is provided, register the account immediately
  if (body?.password) {
    if (typeof body.password !== "string" || body.password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }
    const requiresChange = Boolean(body.requiresPasswordChange)
    const hash = await bcrypt.hash(body.password, 10)
    adminProfiles.markRegistered(created.hybe_id, hash, requiresChange)
  }

  // Return the latest profile record
  const profile = adminProfiles.getByHybeId(String(body.hybe_id).toUpperCase())
  return NextResponse.json({ data: profile })
}
