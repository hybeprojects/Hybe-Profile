import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { hybeId, otp } = await request.json()

    const supabase = createServerClient()

    // Verify OTP
    const { data: otpRecord, error: otpError } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("hybe_id", hybeId)
      .eq("code", otp)
      .eq("used", false)
      .single()

    if (otpError || !otpRecord) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    // Check if OTP is expired
    if (new Date() > new Date(otpRecord.expires_at)) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    // Mark OTP as used
    await supabase.from("otp_codes").update({ used: true }).eq("id", otpRecord.id)

    return NextResponse.json({ success: true, message: "OTP verified successfully" })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
