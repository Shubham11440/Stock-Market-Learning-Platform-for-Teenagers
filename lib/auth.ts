// ─────────────────────────────────────────────────────────────────────
// lib/auth.ts — Node.js compatible NextAuth setup (with Prisma)
// ─────────────────────────────────────────────────────────────────────

import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import { log, clearVerifyRateLimit } from '@/lib/auth-utils'
import { authConfig } from '@/lib/auth.config'

// Extend the default session/JWT types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      goalType?: string | null
    }
  }
  interface User {
    goalType?: string | null
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string
    goalType?: string | null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    // ── Google OAuth ─────────────────────────────────────────────
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
    }),

    // ── Email OTP (Credentials) ───────────────────────────────────
    Credentials({
      id: 'otp',
      name: 'OTP',
      credentials: {
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        if (!email) return null

        try {
          // Upsert user — creates on first login, fetches on subsequent
          const user = await db.user.upsert({
            where: { email },
            update: { lastLoginDate: new Date() },
            create: {
              email,
              name: email.split('@')[0] ?? 'User',
              lastLoginDate: new Date(),
            },
            select: { id: true, email: true, name: true, image: true, goalType: true },
          })

          clearVerifyRateLimit(email)
          log.info({ event: 'auth.otp.signin', userId: user.id })
          return user
        } catch (err) {
          log.error({ event: 'auth.otp.authorize.error', error: (err as Error).message })
          return null
        }
      },
    }),
  ],
})
