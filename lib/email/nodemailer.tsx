import nodemailer from "nodemailer"
import { randomInt } from "crypto"

// Create transporter using SMTP credentials
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export function generateOTP(): string {
  return randomInt(100000, 1000000).toString().padStart(6, "0")
}

export async function sendOTPEmail(
  email: string,
  otp: string,
  fullName: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const mailOptions = {
      from: `"HYBE ACCOUNT" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "HYBE ACCOUNT - Email Verification Code",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HYBE Verification</title>
  <style>
    body {
      margin:0;
      padding:0;
      background:#f4f4f9;
      font-family: Arial, Helvetica, sans-serif;
      color:#111111;
    }
    .container {
      max-width:600px;
      margin:20px auto;
      background:#ffffff;
      border:1px solid #e9e9e9;
      border-radius:12px;
      overflow:hidden;
    }
    .header {
      text-align:center;
      padding:20px;
      border-bottom:1px solid #e9e9e9;
    }
    .header img {
      width:140px;
      height:auto;
    }
    .content {
      padding:28px 24px;
      text-align:center;
    }
    .content h1 {
      font-size:20px;
      margin:0 0 12px;
      color:#111111;
    }
    .content p {
      font-size:15px;
      line-height:1.5;
      color:#444444;
      margin-bottom:20px;
    }
    .otp {
      display:inline-block;
      padding:14px 28px;
      background:#f7f7f7;
      border:1px solid #cccccc;
      border-radius:6px;
      font-size:28px;
      font-weight:bold;
      color:#111111;
      letter-spacing:4px;
      margin-bottom:20px;
    }
    .instructions {
      font-size:13px;
      color:#666666;
    }
    .footer {
      background:#fafafa;
      border-top:1px solid #e9e9e9;
      padding:16px 20px;
      text-align:center;
      font-size:12px;
      color:#888888;
    }
    .footer a {
      color:#111111;
      text-decoration:none;
    }
    @media (prefers-color-scheme: dark) {
      body { background:#111111; color:#eeeeee; }
      .container { background:#1a1a1a; border-color:#333333; }
      .header { border-bottom-color:#333333; }
      .content h1, .content p, .otp, .footer a { color:#f5f5f5; }
      .otp { background:#2a2a2a; border-color:#444444; }
      .footer { background:#141414; border-top-color:#333333; color:#aaaaaa; }
    }
  </style>
</head>
<body>
  <!-- Preheader text (inbox preview, hidden in body) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; font-size:1px; line-height:1px; mso-hide:all;">
    Your HYBE verification code is ${otp}. Valid for 10 minutes.
  </div>

  <div class="container">
    <!-- HEADER -->
    <div class="header">
      <img src="https://freeimghost.net/images/2025/08/29/HYBElogo.png" alt="HYBE Logo">
    </div>

    <!-- CONTENT -->
    <div class="content">
      <h1>Verification Code</h1>
      <p>Your one-time password is below. It is valid for <strong>10</strong> minutes.</p>
      <div class="otp">${otp}</div>
      <p class="instructions">If you did not request this code, you can ignore this message.</p>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <p>© HYBE. All rights reserved.</p>
      <p>Need help? Contact <a href="mailto:hybe.supprt@gmail.com">supprt@hybecorp</a></p>
    </div>
  </div>
</body>
</html>`,
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function sendPasswordChangeNotification(
  email: string,
  fullName: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const mailOptions = {
      from: `"HYBE ACCOUNT" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "HYBE ACCOUNT - Password Changed Successfully",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>HYBE ACCOUNT - Password Changed</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #000000;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff;">
            <!-- Header -->
            <div style="padding: 40px 20px; text-align: center; border-bottom: 1px solid #333333;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 300; letter-spacing: 2px;">!hybe</h1>
              <p style="margin: 10px 0 0 0; color: #999999; font-size: 14px;">HYBE ACCOUNT</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 20px;">
              <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 400;">Password Changed Successfully</h2>
              <p style="margin: 0 0 20px 0; color: #cccccc; line-height: 1.6;">
                Hello ${fullName},
              </p>
              <p style="margin: 0 0 20px 0; color: #cccccc; line-height: 1.6;">
                Your HYBE ACCOUNT password has been successfully changed. You can now access your dashboard with your new password.
              </p>
              <p style="margin: 20px 0 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
                If you didn't make this change, please contact our support team immediately.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="padding: 20px; text-align: center; border-top: 1px solid #333333; color: #666666; font-size: 12px;">
              <p style="margin: 0;">© 2024 HYBE CORPORATION. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
