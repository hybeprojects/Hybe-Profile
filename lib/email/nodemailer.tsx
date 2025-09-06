import nodemailer from "nodemailer"

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
  return Math.floor(100000 + Math.random() * 900000).toString()
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
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>HYBE ACCOUNT - Email Verification</title>
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
              <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 400;">Email Verification</h2>
              <p style="margin: 0 0 20px 0; color: #cccccc; line-height: 1.6;">
                Hello ${fullName},
              </p>
              <p style="margin: 0 0 30px 0; color: #cccccc; line-height: 1.6;">
                Please use the following verification code to complete your HYBE ACCOUNT login:
              </p>
              
              <!-- OTP Code -->
              <div style="text-align: center; margin: 40px 0;">
                <div style="display: inline-block; background-color: #ffffff; color: #000000; padding: 20px 40px; border-radius: 8px; font-size: 32px; font-weight: 600; letter-spacing: 4px;">
                  ${otp}
                </div>
              </div>
              
              <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.6;">
                This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="padding: 20px; text-align: center; border-top: 1px solid #333333; color: #666666; font-size: 12px;">
              <p style="margin: 0;">© 2024 HYBE CORPORATION. All rights reserved.</p>
              <p style="margin: 10px 0 0 0;">
                <a href="#" style="color: #999999; text-decoration: none;">Privacy Policy</a> | 
                <a href="#" style="color: #999999; text-decoration: none;">Terms of Service</a>
              </p>
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
