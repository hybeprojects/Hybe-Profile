import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { adminProfiles } from "@/lib/db/sqlite"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { currentPassword, newPassword } = await req.json()
    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const profile = adminProfiles.getByHybeId(session.hybeId)
    if (!profile || !profile.password_hash) return NextResponse.json({ error: "Account not found" }, { status: 404 })

    const ok = await bcrypt.compare(currentPassword, profile.password_hash)
    if (!ok) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })

    const hash = await bcrypt.hash(newPassword, 10)
    adminProfiles.updatePassword(profile.hybe_id, hash)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
