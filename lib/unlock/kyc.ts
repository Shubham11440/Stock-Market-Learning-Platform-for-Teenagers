import { db } from '@/lib/db'

export async function processMockKYC(userId: string, aadhaarNumber: string) {
  // In a production environment, this would call DigiLocker API or a CKYC provider.
  // For the MVP, we just mock the success after a delay.
  
  // Basic mock validation
  if (aadhaarNumber.length !== 12) {
    throw new Error("Invalid Aadhaar format")
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  await db.user.update({
    where: { id: userId },
    data: {
      unlockStatus: 'BROKER_PENDING'
    }
  })

  return { success: true, nextStatus: 'BROKER_PENDING' }
}

export async function processMockParentConsent(userId: string, parentEmail: string) {
  // Simulates sending an OTP/link to parent email and parent approving it immediately
  // Real app: Send email via Resend, wait for webhook or parent login
  
  await new Promise(resolve => setTimeout(resolve, 1500))

  await db.user.update({
    where: { id: userId },
    data: {
      parentConsentStatus: 'APPROVED',
      unlockStatus: 'KYC_PENDING'
    }
  })

  return { success: true, nextStatus: 'KYC_PENDING' }
}
