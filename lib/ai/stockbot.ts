import { db } from '@/lib/db'
import { getAIProvider, ChatMessage } from './provider'
import { STOCKBOT_SYSTEM_PROMPT } from './prompts'
import { buildUserContext } from './context'

export interface StockBotResponse {
  message: string
  sessionId: string
}

export async function askStockBot(
  userId: string, 
  message: string, 
  sessionId?: string
): Promise<StockBotResponse> {
  let session = null

  // 1. Find or create the ChatSession
  if (sessionId) {
    session = await db.chatSession.findUnique({ where: { id: sessionId } })
  }
  
  if (!session) {
    session = await db.chatSession.create({
      data: {
        userId,
        title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
      }
    })
  }

  // 2. Save user message
  await db.chatMessage.create({
    data: {
      chatSessionId: session.id,
      role: 'user',
      content: message
    }
  })

  // 3. Fetch conversation history for context (last 10 messages to save tokens)
  const history = await db.chatMessage.findMany({
    where: { chatSessionId: session.id },
    orderBy: { createdAt: 'asc' },
    take: 10
  })

  // Convert to provider format
  const chatMessages: ChatMessage[] = history.map(h => ({
    role: h.role as 'user' | 'assistant' | 'system',
    content: h.content
  }))

  // 4. Build dynamic user context
  const userContext = await buildUserContext(userId)
  const finalSystemPrompt = `${STOCKBOT_SYSTEM_PROMPT}\n\n${userContext}`

  // 5. Call AI Provider
  const provider = getAIProvider()
  const responseText = await provider.chat(chatMessages, finalSystemPrompt)

  // 6. Save AI response
  await db.chatMessage.create({
    data: {
      chatSessionId: session.id,
      role: 'assistant',
      content: responseText
    }
  })

  return {
    message: responseText,
    sessionId: session.id
  }
}
