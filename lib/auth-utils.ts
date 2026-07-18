// ─────────────────────────────────────────────────────────────────────
// lib/auth-utils.ts — OTP helpers, rate limiting, logging
// All functions are pure / side-effect-free except the rate-limit Map.
// ─────────────────────────────────────────────────────────────────────

import bcryptjs from 'bcryptjs'

// ── Logging ───────────────────────────────────────────────────────────

type LogLevel = 'info' | 'warn' | 'error'

function structuredLog(level: LogLevel, data: Record<string, unknown>) {
  const payload = { ts: new Date().toISOString(), level, ...data }
  if (level === 'error') console.error(JSON.stringify(payload))
  else if (level === 'warn') console.warn(JSON.stringify(payload))
  else console.log(JSON.stringify(payload))
}

export const log = {
  info: (data: Record<string, unknown>) => structuredLog('info', data),
  warn: (data: Record<string, unknown>) => structuredLog('warn', data),
  error: (data: Record<string, unknown>) => structuredLog('error', data),
}

// ── Email masking (never log full emails) ────────────────────────────

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***@***'
  const masked = local.slice(0, 2) + '**'
  return `${masked}@${domain}`
}

// ── OTP generation & hashing ─────────────────────────────────────────

/** Returns a cryptographically random 6-digit string ("000000"–"999999"). */
export function generateOTP(): string {
  // Use crypto.getRandomValues for a uniform distribution — not Math.random()
  const buf = new Uint32Array(1)
  crypto.getRandomValues(buf)
  const n = buf[0]! % 1_000_000
  return n.toString().padStart(6, '0')
}

/** Hashes an OTP with bcrypt cost=10. Stored in VerificationToken.token. */
export async function hashOTP(otp: string): Promise<string> {
  return bcryptjs.hash(otp, 10)
}

/** Constant-time comparison of a plain OTP against its bcrypt hash. */
export async function verifyOTP(otp: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(otp, hash)
}

// ── OTP TTL ───────────────────────────────────────────────────────────

export const OTP_TTL_SECONDS = 600 // 10 minutes

export function otpExpiresAt(): Date {
  return new Date(Date.now() + OTP_TTL_SECONDS * 1_000)
}

// ── In-memory rate limiter ────────────────────────────────────────────
//
// Keyed by email string. Tracks attempts within a rolling window.
// In production with multiple server instances, swap the Map for
// Upstash Redis (atomic INCR + EXPIRE). The interface is identical.

interface RateLimitEntry {
  count: number
  windowStart: number // ms timestamp
}

const sendRateMap = new Map<string, RateLimitEntry>()
const verifyRateMap = new Map<string, RateLimitEntry>()

function checkRateLimit(
  map: Map<string, RateLimitEntry>,
  key: string,
  maxRequests: number,
  windowSeconds: number
): { allowed: boolean; retryAfter: number } {
  const now = Date.now()
  const windowMs = windowSeconds * 1_000
  const entry = map.get(key)

  if (!entry || now - entry.windowStart > windowMs) {
    map.set(key, { count: 1, windowStart: now })
    return { allowed: true, retryAfter: 0 }
  }

  if (entry.count >= maxRequests) {
    const retryAfter = Math.ceil((entry.windowStart + windowMs - now) / 1_000)
    return { allowed: false, retryAfter }
  }

  entry.count += 1
  return { allowed: true, retryAfter: 0 }
}

/** Max 3 OTP sends per email per 15 minutes. */
export function checkSendRateLimit(email: string) {
  return checkRateLimit(sendRateMap, email.toLowerCase(), 3, 900)
}

/** Max 5 verify attempts per email per 15 minutes. */
export function checkVerifyRateLimit(email: string) {
  return checkRateLimit(verifyRateMap, email.toLowerCase(), 5, 900)
}

/** Clear verify attempts after successful verification (no residual lock). */
export function clearVerifyRateLimit(email: string) {
  verifyRateMap.delete(email.toLowerCase())
}
