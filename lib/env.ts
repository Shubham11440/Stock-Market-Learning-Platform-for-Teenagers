// ─────────────────────────────────────────────────────────────────────
// lib/env.ts — Validated environment variables
// Throws at startup if a required variable is missing.
// Import this in any server file that needs env access.
// ─────────────────────────────────────────────────────────────────────

function required(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
        `Copy .env.example to .env.local and fill in all values.`
    )
  }
  return value
}

function optional(key: string, fallback = ''): string {
  return process.env[key] ?? fallback
}

export const env = {
  // Auth
  NEXTAUTH_SECRET: required('NEXTAUTH_SECRET'),
  NEXTAUTH_URL: optional('NEXTAUTH_URL', 'http://localhost:3000'),

  // Google OAuth
  GOOGLE_CLIENT_ID: optional('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: optional('GOOGLE_CLIENT_SECRET'),

  // Database
  DATABASE_URL: optional('DATABASE_URL'),

  // Resend (email)
  RESEND_API_KEY: optional('RESEND_API_KEY'),
  RESEND_FROM_EMAIL: optional('RESEND_FROM_EMAIL', 'onboarding@stockup.in'),

  // App
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const
