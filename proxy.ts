// ─────────────────────────────────────────────────────────────────────
// proxy.ts — Edge-compatible route protection (Middleware)
// Reads auth state from the JWT cookie — zero DB calls.
// ─────────────────────────────────────────────────────────────────────

import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'
import { NextResponse } from 'next/server'

// Initialize NextAuth with edge-compatible config
const { auth } = NextAuth(authConfig)

const PUBLIC_PATHS = ['/', '/login', '/signup']
const AUTH_PATHS = ['/login', '/signup']

export default auth(async (req: any) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  const isAuthenticated = !!session?.user?.id
  const hasCompletedOnboarding = !!session?.user?.goalType

  // ── Public paths — always accessible ────────────────────────────
  if (PUBLIC_PATHS.includes(pathname)) {
    // Redirect authenticated users away from login/signup
    if (isAuthenticated && AUTH_PATHS.includes(pathname)) {
      const dest = hasCompletedOnboarding ? '/dashboard' : '/onboarding'
      return NextResponse.redirect(new URL(dest, req.url))
    }
    return NextResponse.next()
  }

  // ── /onboarding — must be authenticated ─────────────────────────
  if (pathname === '/onboarding') {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    // Already onboarded — send to dashboard
    if (hasCompletedOnboarding) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.next()
  }

  // ── Dashboard routes — must be authenticated + onboarded ────────
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/learn') ||
    pathname.startsWith('/trade') ||
    pathname.startsWith('/portfolio') ||
    pathname.startsWith('/leaderboard') ||
    pathname.startsWith('/arena') ||
    pathname.startsWith('/news') ||
    pathname.startsWith('/social') ||
    pathname.startsWith('/profile')
  ) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
    if (!hasCompletedOnboarding) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
    return NextResponse.next()
  }

  // ── NextAuth internal routes — always pass through ───────────────
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // ── Protected API routes — return 401 for unauthenticated ────────
  if (pathname.startsWith('/api/')) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
    }
  }

  return NextResponse.next()
})

export const config = {
  // Match all paths except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
