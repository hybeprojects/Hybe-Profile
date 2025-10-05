import { type NextRequest, NextResponse } from "next/server"
import { adminProfiles, otpStore } from "@/lib/db/sqlite"
import { sendOTPEmail, generateOTP } from "@/lib/email/nodemailer"
import { rateLimiter } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  try {
    const { hybeId } = await request.json()

    const ip = request.ip ?? "127.0.0.1"
    const { success } = await rateLimiter.limit(`send_otp_${ip}`)

    if (!success) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    if (!hybeId) return NextResponse.json({ error: "Missing HYBE ID" }, { status: 400 })

    const profile = adminProfiles.getByHybeId(String(hybeId).toUpperCase())
    if (!profile) return NextResponse.json({ error: "Invalid HYBE ID" }, { status: 400 })

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store OTP in local DB
    await otpStore.create({
      hybe_id: profile.hybe_id,
      code: otp,
      expires_at: expiresAt.toISOString(),
    })

    // Send email
    const emailResult = await sendOTPEmail(profile.email ?? "", otp, profile.full_name ?? "")

    if (!emailResult.success) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email",
      email: profile.email ? profile.email.replace(/(.{2}).*(@.*)/, "$1***$2") : null,
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
