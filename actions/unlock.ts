'use server'

import { auth } from '@/lib/auth'
import { verifyAge } from '@/lib/unlock/age'
import { processMockKYC, processMockParentConsent } from '@/lib/unlock/kyc'
import { processMockBrokerLink, SupportedBroker } from '@/lib/unlock/broker'
import { checkUnlockEligibility } from '@/lib/unlock/eligibility'
import { revalidatePath } from 'next/cache'

export async function checkEligibilityAction() {
  const session = await auth()
  if (!session?.user?.id) return { success: false, error: 'Unauthorized' }
  try {
    const res = await checkUnlockEligibility(session.user.id)
    return { success: true, data: res }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function verifyAgeAction(dobString: string) {
  const session = await auth()
  if (!session?.user?.id) return { success: false, error: 'Unauthorized' }
  try {
    const res = await verifyAge(session.user.id, dobString)
    revalidatePath('/dashboard/profile')
    return { success: true, data: res }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function processParentConsentAction(parentEmail: string) {
  const session = await auth()
  if (!session?.user?.id) return { success: false, error: 'Unauthorized' }
  try {
    const res = await processMockParentConsent(session.user.id, parentEmail)
    revalidatePath('/dashboard/profile')
    return { success: true, data: res }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function processKYCAction(aadhaarNumber: string) {
  const session = await auth()
  if (!session?.user?.id) return { success: false, error: 'Unauthorized' }
  try {
    const res = await processMockKYC(session.user.id, aadhaarNumber)
    revalidatePath('/dashboard/profile')
    return { success: true, data: res }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function processBrokerLinkAction(broker: SupportedBroker) {
  const session = await auth()
  if (!session?.user?.id) return { success: false, error: 'Unauthorized' }
  try {
    const res = await processMockBrokerLink(session.user.id, broker)
    revalidatePath('/dashboard/profile')
    return { success: true, data: res }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
