import { type NextRequest, NextResponse } from "next/server"
import { otpStore } from "@/lib/db/sqlite"
import { rateLimiter } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  try {
    const { hybeId, otp } = await request.json()

    const ip = request.ip ?? "127.0.0.1"
    const { success } = await rateLimiter.limit(`verify_otp_${ip}`)

    if (!success) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    if (!hybeId || !otp) return NextResponse.json({ error: "Missing parameters" }, { status: 400 })

    const otpRecord = otpStore.getLatestValid(String(hybeId).toUpperCase())

    if (!otpRecord) {
      return NextResponse.json({ error: "No valid OTP found for this user." }, { status: 400 })
    }

    if (otpRecord.failed_attempts >= 5) {
      return NextResponse.json({ error: "Too many failed attempts. Please request a new OTP." }, { status: 400 })
    }

    if (otpRecord.code !== String(otp)) {
      // Increment failed attempts
      otpStore.incrementFailedAttempts(otpRecord.id)
      return NextResponse.json({ error: "Invalid OTP." }, { status: 400 })
    }

    // Mark OTP as used
    otpStore.markUsed(otpRecord.id)

    return NextResponse.json({ success: true, message: "OTP verified successfully" })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
