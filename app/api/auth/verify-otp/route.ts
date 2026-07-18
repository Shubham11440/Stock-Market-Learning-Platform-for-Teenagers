// ─────────────────────────────────────────────────────────────────────
// POST /api/auth/verify-otp
// Validates the OTP, then signs the user in via NextAuth credentials.
// ─────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
import { verifyOTP, checkVerifyRateLimit, log, maskEmail } from '@/lib/auth-utils'
import { signIn } from '@/lib/auth'

const schema = z.object({
  email: z.string().email(),
  otp: z.string().length(6).regex(/^\d{6}$/),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'INVALID_OTP' }, { status: 400 })
    }

    const { email, otp } = parsed.data
    const normalizedEmail = email.toLowerCase().trim()

    // Rate limit — 5 attempts per 15 min
    const { allowed, retryAfter } = checkVerifyRateLimit(normalizedEmail)
    if (!allowed) {
      log.warn({ event: 'otp.verify.too_many_attempts', email: maskEmail(normalizedEmail) })
      return NextResponse.json({ error: 'TOO_MANY_ATTEMPTS', retryAfter }, { status: 429 })
    }

    // Fetch token from DB
    const record = await db.verificationToken.findFirst({
      where: { identifier: normalizedEmail },
    })

    // Return INVALID_OTP for both "no record" and "expired" — no enumeration
    if (!record || record.expires < new Date()) {
      log.warn({
        event: 'otp.verify.failed',
        email: maskEmail(normalizedEmail),
        reason: record ? 'EXPIRED' : 'NOT_FOUND',
      })
      // Still delete if expired to keep table clean
      if (record) await db.verificationToken.delete({ where: { identifier_token: { identifier: normalizedEmail, token: record.token } } })
      return NextResponse.json({ error: 'INVALID_OTP' }, { status: 400 })
    }

    // Constant-time bcrypt comparison
    const isValid = await verifyOTP(otp, record.token)

    if (!isValid) {
      log.warn({ event: 'otp.verify.failed', email: maskEmail(normalizedEmail), reason: 'WRONG_CODE' })
      return NextResponse.json({ error: 'INVALID_OTP' }, { status: 400 })
    }

    // Delete token immediately after successful use (prevent replay)
    await db.verificationToken.delete({
      where: { identifier_token: { identifier: normalizedEmail, token: record.token } },
    })

    log.info({ event: 'otp.verified', email: maskEmail(normalizedEmail) })

    // Sign the user in via NextAuth credentials provider
    // This creates the session cookie on the response
    await signIn('otp', { email: normalizedEmail, redirect: false })

    return NextResponse.json({ success: true })
  } catch (err) {
    log.error({ event: 'api.error', route: '/api/auth/verify-otp', error: (err as Error).message })
    return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
