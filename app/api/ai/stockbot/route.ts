import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { askStockBot } from '@/lib/ai/stockbot'

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message, sessionId } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    const response = await askStockBot(session.user.id, message, sessionId)

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('[STOCKBOT_API_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to process chat message', details: error.message || String(error) },
      { status: 500 }
    )
  }
}
