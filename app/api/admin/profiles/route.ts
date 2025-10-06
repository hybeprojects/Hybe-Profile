import { NextResponse } from "next/server"
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
  const created = adminProfiles.create({ hybe_id: String(body.hybe_id).toUpperCase(), full_name: body.full_name, contact: body.contact ?? null })
  return NextResponse.json({ data: created })
}
