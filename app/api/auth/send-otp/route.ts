// ─────────────────────────────────────────────────────────────────────
// POST /api/auth/send-otp
// Generates a 6-digit OTP, hashes it, stores in VerificationToken,
// and emails it via Resend.
// ─────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
import {
  generateOTP,
  hashOTP,
  otpExpiresAt,
  checkSendRateLimit,
  log,
  maskEmail,
} from '@/lib/auth-utils'

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@stockup.in'

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'INVALID_EMAIL' }, { status: 400 })
    }

    const { email } = parsed.data
    const normalizedEmail = email.toLowerCase().trim()

    // Rate limit check
    const { allowed, retryAfter } = checkSendRateLimit(normalizedEmail)
    if (!allowed) {
      log.warn({ event: 'otp.send.rate_limited', email: maskEmail(normalizedEmail) })
      return NextResponse.json({ error: 'RATE_LIMITED', retryAfter }, { status: 429 })
    }

    const otp = generateOTP()
    const hash = await hashOTP(otp)
    const expires = otpExpiresAt()

    // Upsert so only one active token exists per email at a time
    await db.verificationToken.upsert({
      where: { identifier_token: { identifier: normalizedEmail, token: normalizedEmail } },
      update: { token: hash, expires },
      create: { identifier: normalizedEmail, token: hash, expires },
    })

    // Send OTP email
    // In dev without RESEND_API_KEY, we log the OTP to the server console only.
    if (!process.env.RESEND_API_KEY) {
      // NEVER log otp in production — this branch is development only
      if (process.env.NODE_ENV === 'development') {
        console.log(`[DEV ONLY] OTP for ${maskEmail(normalizedEmail)}: ${otp}`)
      }
    } else {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: FROM,
        to: normalizedEmail,
        subject: 'Your StockUp login code',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2 style="color: #0F172A;">Your login code</h2>
            <p style="color: #475569;">Enter this code to sign in to StockUp. It expires in 10 minutes.</p>
            <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #6366F1; padding: 24px 0;">
              ${otp}
            </div>
            <p style="color: #94A3B8; font-size: 12px;">
              If you didn't request this code, you can safely ignore this email.
            </p>
          </div>
        `,
      })
    }

    log.info({ event: 'otp.sent', email: maskEmail(normalizedEmail) })
    return NextResponse.json({ success: true, expiresIn: 600 })
  } catch (err) {
    log.error({ event: 'api.error', route: '/api/auth/send-otp', error: (err as Error).message })
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
