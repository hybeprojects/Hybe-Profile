import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ authenticated: false })
  return NextResponse.json({ authenticated: true, session })
}
