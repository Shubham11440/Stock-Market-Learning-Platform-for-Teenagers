import { z } from 'zod'

export const settingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters").optional(),
  theme: z.enum(['dark', 'light', 'system']).optional(),
  goalType: z.enum(['SAVE', 'INVEST', 'TRADE', 'LEARN']).nullable().optional(),
  publicProfile: z.boolean().optional(),
  showPortfolio: z.boolean().optional(),
  showSquad: z.boolean().optional(),
  featuredBadgeId: z.string().nullable().optional()
})
