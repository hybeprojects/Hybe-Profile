import { NextResponse } from "next/server"
import { adminProfiles } from "@/lib/db/sqlite"
import { createSession } from "@/lib/auth/session"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { hybeId, password } = await req.json()
    if (!hybeId || !password) return NextResponse.json({ error: "Missing credentials" }, { status: 400 })

    const profile = adminProfiles.getByHybeId(String(hybeId).toUpperCase())
    if (!profile) return NextResponse.json({ error: "Invalid HYBE ID" }, { status: 400 })

    const isRegistered = profile.is_registered === 1

    if (!isRegistered) {
      // First-time login must use default password
      if (password !== "HYBEARMY2025") {
        return NextResponse.json({ error: "Please use the default password: HYBEARMY2025" }, { status: 400 })
      }
      const hash = await bcrypt.hash(password, 10)
      adminProfiles.markRegistered(profile.hybe_id, hash, true)
      await createSession({ hybeId: profile.hybe_id, email: profile.email, requiresPasswordChange: true })
      return NextResponse.json({ success: true, email: profile.email, hybeId: profile.hybe_id, requiresPasswordChange: true })
    }

    if (!profile.password_hash) {
      return NextResponse.json({ error: "Account not fully set up. Reset password." }, { status: 400 })
    }

    const valid = await bcrypt.compare(password, profile.password_hash)
    if (!valid) return NextResponse.json({ error: "Invalid password" }, { status: 400 })

    const requiresPasswordChange = profile.requires_password_change === 1
    await createSession({ hybeId: profile.hybe_id, email: profile.email, requiresPasswordChange })
    return NextResponse.json({ success: true, email: profile.email, hybeId: profile.hybe_id, requiresPasswordChange })
  } catch (e) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
