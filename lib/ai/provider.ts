import { GoogleGenerativeAI } from '@google/generative-ai'

// The provider interface allows swapping out the backend (Gemini, OpenAI, etc.) in the future
export interface AIProvider {
  generateText(prompt: string, systemPrompt?: string): Promise<string>
  chat(messages: ChatMessage[], systemPrompt?: string): Promise<string>
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI
  private modelName: string

  constructor(apiKey: string, modelName: string = 'gemini-2.5-flash') {
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.modelName = modelName
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: this.modelName,
      systemInstruction: systemPrompt,
    })

    const result = await model.generateContent(prompt)
    return result.response.text()
  }

  async chat(messages: ChatMessage[], systemPrompt?: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: this.modelName,
      systemInstruction: systemPrompt,
    })

    // Map our generic role format to Gemini's expected format
    const history = messages.filter(m => m.role !== 'system').map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }))

    // We pop the last message off to send as the actual prompt
    const lastMessage = history.pop()

    if (!lastMessage) {
      throw new Error('No messages provided to chat')
    }

    const chat = model.startChat({
      history,
    })

    const result = await chat.sendMessage(lastMessage.parts[0].text)
    return result.response.text()
  }
}

// Singleton instance
export const getAIProvider = (): AIProvider => {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY
  
  if (!apiKey) {
    console.warn("GOOGLE_GEMINI_API_KEY is missing. AI features will fail.")
    // We could return a MockProvider here in development if we wanted to
  }

  return new GeminiProvider(apiKey || 'mock-key')
}
