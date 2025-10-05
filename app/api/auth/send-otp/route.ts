import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { sendOTPEmail, generateOTP } from "@/lib/email/nodemailer"
import { rateLimiter } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  try {
    const { hybeId } = await request.json()

    const ip = request.ip ?? "127.0.0.1"
    const { success, limit, remaining, reset } = await rateLimiter.limit(
      `send_otp_${ip}`,
    )

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      )
    }

    const supabase = createServerClient()

    // Get user profile from admin_profiles
    const { data: profile, error: profileError } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("hybe_id", hybeId)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: "Invalid HYBE ID" }, { status: 400 })
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store OTP in database
    const { error: otpError } = await supabase.from("otp_codes").upsert({
      hybe_id: hybeId,
      code: otp,
      expires_at: expiresAt.toISOString(),
      used: false,
      failed_attempts: 0,
    })

    if (otpError) {
      return NextResponse.json({ error: "Failed to generate OTP" }, { status: 500 })
    }

    // Send email
    const emailResult = await sendOTPEmail(profile.email, otp, profile.full_name)

    if (!emailResult.success) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email",
      email: profile.email.replace(/(.{2}).*(@.*)/, "$1***$2"), // Mask email
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
