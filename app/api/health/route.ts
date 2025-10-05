import { NextResponse } from "next/server"
import { adminProfiles } from "@/lib/db/sqlite"

export async function GET() {
  try {
    const profiles = adminProfiles.list()
    return NextResponse.json({ ok: true, profilesCount: profiles.length })
  } catch (e) {
    console.error("Health check error:", e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
