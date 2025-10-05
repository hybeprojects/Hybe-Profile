import { NextResponse } from "next/server"
import { destroySession } from "@/lib/auth/session"
import { NextResponse } from "next/server"

export async function POST() {
  await destroySession()
  return NextResponse.json({ success: true })
}
