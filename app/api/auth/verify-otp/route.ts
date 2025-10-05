import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { rateLimiter } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  try {
    const { hybeId, otp } = await request.json()

    const ip = request.ip ?? "127.0.0.1"
    const { success, limit, remaining, reset } = await rateLimiter.limit(
      `verify_otp_${ip}`,
    )

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      )
    }

    const supabase = createServerClient()

    // Get the latest OTP record for the user that is not used and not expired
    const { data: otpRecord, error: otpError } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("hybe_id", hybeId)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (otpError || !otpRecord) {
      return NextResponse.json({ error: "No valid OTP found for this user." }, { status: 400 })
    }

    if (otpRecord.failed_attempts >= 5) {
      return NextResponse.json({ error: "Too many failed attempts. Please request a new OTP." }, { status: 400 })
    }

    if (otpRecord.code !== otp) {
      // Increment failed attempts
      await supabase
        .from("otp_codes")
        .update({ failed_attempts: otpRecord.failed_attempts + 1 })
        .eq("id", otpRecord.id)
      return NextResponse.json({ error: "Invalid OTP." }, { status: 400 })
    }

    // Mark OTP as used
    await supabase.from("otp_codes").update({ used: true }).eq("id", otpRecord.id)

    return NextResponse.json({ success: true, message: "OTP verified successfully" })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
