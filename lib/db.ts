// ─────────────────────────────────────────────────────────────
// Prisma Database Client Singleton
// ─────────────────────────────────────────────────────────────
// Uses a singleton pattern to avoid exhausting DB connections
// in Next.js development (hot module reload creates new instances)

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
