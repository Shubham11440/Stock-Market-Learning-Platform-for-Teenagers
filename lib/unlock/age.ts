import { db } from '@/lib/db'

export async function verifyAge(userId: string, dobString: string) {
  const dob = new Date(dobString)
  if (isNaN(dob.getTime())) {
    throw new Error("Invalid Date of Birth")
  }

  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--
  }

  // Update user state
  const isMinor = age < 18
  const nextStatus = isMinor ? 'PARENT_CONSENT_PENDING' : 'KYC_PENDING'

  await db.user.update({
    where: { id: userId },
    data: {
      verifiedAge: age,
      unlockStatus: 'AGE_VERIFIED',
    }
  })

  // We immediately push them to the next status if AGE_VERIFIED succeeds
  await db.user.update({
    where: { id: userId },
    data: {
      unlockStatus: nextStatus
    }
  })

  return { age, isMinor, nextStatus }
}
