import { NextResponse } from "next/server"
import { adminProfiles } from "@/lib/db/sqlite"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ data: adminProfiles.list() })
}

export async function POST(req: Request) {
  const body = await req.json()
  if (!body?.hybe_id) return NextResponse.json({ error: "hybe_id is required" }, { status: 400 })
  const created = adminProfiles.create({ hybe_id: String(body.hybe_id).toUpperCase(), full_name: body.full_name, email: body.email })
  return NextResponse.json({ data: created })
}
