import { db } from '@/lib/db'

export type SupportedBroker = 'ZERODHA' | 'GROWW' | 'ANGELONE' | 'UPSTOX'

export async function processMockBrokerLink(userId: string, broker: SupportedBroker) {
  // In a production environment, this would redirect to broker's OAuth flow 
  // and handle the callback via a webhook to complete the linking.
  
  await new Promise(resolve => setTimeout(resolve, 2000))

  await db.user.update({
    where: { id: userId },
    data: {
      brokerProvider: broker,
      unlockStatus: 'UNLOCKED',
      unlockCompletedAt: new Date()
    }
  })

  return { success: true, nextStatus: 'UNLOCKED' }
}
