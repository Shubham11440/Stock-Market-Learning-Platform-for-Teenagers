// ─────────────────────────────────────────────────────────────────────
// lib/auth.config.ts — Edge-compatible NextAuth config
// ─────────────────────────────────────────────────────────────────────

import type { NextAuthConfig } from 'next-auth'
import { log, maskEmail } from '@/lib/auth-utils'

export const authConfig = {
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 }, // 24h
  providers: [], // Added in auth.ts (requires Node.js / Prisma)
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    // Persist extra user fields into the JWT on sign-in
    async jwt({ token, user, trigger, session }) {
      if (user) {
        if (user.id) token.id = user.id
        token.goalType = user.goalType ?? null
      }

      // `update()` called from client refreshes goalType in the token
      if (trigger === 'update' && session?.goalType !== undefined) {
        token.goalType = session.goalType
      }

      return token
    },

    // Expose JWT fields to the session object (accessible via useSession/req.auth)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.goalType = (token.goalType as string) ?? null
      }
      return session
    },

    // Validate callbackUrl to prevent open redirects
    async redirect({ url, baseUrl }) {
      const allowed = [baseUrl, process.env.NEXTAUTH_URL ?? baseUrl]
      if (allowed.some((base) => url.startsWith(base))) return url
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return baseUrl
    },

    // Log OAuth sign-in events
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        log.info({ event: 'auth.google.signin', email: maskEmail(user.email ?? '') })
      }
      return true
    },
  },
} satisfies NextAuthConfig
