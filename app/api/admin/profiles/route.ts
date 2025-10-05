import { NextResponse } from "next/server"
import { adminProfiles } from "@/lib/db/sqlite"

export async function GET() {
  return NextResponse.json({ data: adminProfiles.list() })
}

export async function POST(req: Request) {
  const body = await req.json()
  if (!body?.hybe_id) return NextResponse.json({ error: "hybe_id is required" }, { status: 400 })
  const created = adminProfiles.create({ hybe_id: String(body.hybe_id).toUpperCase(), full_name: body.full_name, contact: body.contact ?? null })
  return NextResponse.json({ data: created })
}
