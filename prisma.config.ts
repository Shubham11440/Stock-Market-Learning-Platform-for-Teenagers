import { defineConfig } from 'prisma/config'

// ── Prisma v7 Config ─────────────────────────────────────────
// Database connection URL is configured here (not in schema.prisma)
// For local dev: set DATABASE_URL in .env.local
// For production: set it in Vercel environment variables
export default defineConfig({
  schema: './prisma/schema.prisma',
})
