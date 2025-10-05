import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { adminProfiles } from "@/lib/db/sqlite"

export async function POST() {
  try {
    // Seed a registered admin profile
    const hybeRegistered = "ARMY2013"
    const emailRegistered = "army2013@example.com"
    let existing = adminProfiles.getByHybeId(hybeRegistered)
    if (!existing) {
      const created = adminProfiles.create({ hybe_id: hybeRegistered, full_name: "ARMY Official", email: emailRegistered })
      const hash = await bcrypt.hash("HYBEARMY2025", 10)
      adminProfiles.markRegistered(created.hybe_id, hash, false)
    }

    // Seed an unregistered profile (first-time user)
    const hybeUnregistered = "ARMYNEW"
    const emailUnregistered = "newarmy@example.com"
    existing = adminProfiles.getByHybeId(hybeUnregistered)
    if (!existing) {
      adminProfiles.create({ hybe_id: hybeUnregistered, full_name: "New ARMY", email: emailUnregistered })
    }

    return NextResponse.json({ success: true, message: "Seed completed" })
  } catch (e) {
    console.error("Seed error:", e)
    return NextResponse.json({ error: "Seed failed" }, { status: 500 })
  }
}
