import { defineConfig } from 'prisma/config'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

// ── Prisma v7 Config ─────────────────────────────────────────
// Database connection URL is configured here (not in schema.prisma)
// For local dev: set DATABASE_URL in .env.local
// For production: set it in Vercel environment variables
export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  }
})
