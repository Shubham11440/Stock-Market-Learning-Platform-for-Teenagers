import { db } from '@/lib/db'

/**
 * Generates a random 6-character uppercase alphanumeric string.
 */
function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Generates a unique squad invite code, verifying against the database.
 * Will retry up to 5 times if a collision occurs.
 */
export async function generateUniqueInviteCode(): Promise<string> {
  const MAX_RETRIES = 5

  for (let i = 0; i < MAX_RETRIES; i++) {
    const code = generateCode()
    const existing = await db.squad.findUnique({ where: { code } })
    
    if (!existing) {
      return code
    }
  }

  throw new Error('Failed to generate a unique invite code after maximum retries.')
}
