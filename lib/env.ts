import { z } from 'zod'
import { logger } from './monitoring/logger'

const envSchema = z.object({
  DATABASE_URL: z.string().url("Must be a valid URL"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required").optional(),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required").optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  logger.error("❌ Invalid environment variables:", { errors: parsed.error.flatten().fieldErrors })
  throw new Error("Invalid environment variables. Check the logs for details.")
}

export const env = parsed.data
