import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({ error: "OTP-based authentication removed. Use HYBE ID and Password." }, { status: 410 })
}
