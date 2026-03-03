import { kv } from '@vercel/kv'

// --- Types ---

export interface ChatMessage {
  id: string
  sessionId: string
  role: 'user' | 'admin'
  content: string
  timestamp: number
}

export interface ChatSession {
  id: string
  createdAt: number
  lastActivity: number
  telegramMsgIds: number[]
}

// --- Constants ---

const SESSION_TTL = 60 * 60 * 24 // 24 hours
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

// --- Session Management ---

export async function createSession(): Promise<ChatSession> {
  const id = crypto.randomUUID().slice(0, 8)
  const session: ChatSession = {
    id,
    createdAt: Date.now(),
    lastActivity: Date.now(),
    telegramMsgIds: [],
  }
  await kv.set(`chat:session:${id}`, session, { ex: SESSION_TTL })
  return session
}

export async function getSession(id: string): Promise<ChatSession | null> {
  return kv.get<ChatSession>(`chat:session:${id}`)
}

export async function updateSessionActivity(id: string): Promise<void> {
  const session = await getSession(id)
  if (!session) return
  session.lastActivity = Date.now()
  await kv.set(`chat:session:${id}`, session, { ex: SESSION_TTL })
}

export async function addTelegramMsgId(sessionId: string, msgId: number): Promise<void> {
  const session = await getSession(sessionId)
  if (!session) return
  session.telegramMsgIds.push(msgId)
  session.lastActivity = Date.now()
  await kv.set(`chat:session:${sessionId}`, session, { ex: SESSION_TTL })
}

// --- Message Management ---

export async function addMessage(
  sessionId: string,
  role: 'user' | 'admin',
  content: string
): Promise<ChatMessage> {
  const message: ChatMessage = {
    id: crypto.randomUUID(),
    sessionId,
    role,
    content,
    timestamp: Date.now(),
  }

  // Get existing messages and append
  const messages = await getMessages(sessionId)
  messages.push(message)
  await kv.set(`chat:messages:${sessionId}`, messages, { ex: SESSION_TTL })

  return message
}

export async function getMessages(sessionId: string): Promise<ChatMessage[]> {
  const messages = await kv.get<ChatMessage[]>(`chat:messages:${sessionId}`)
  return messages || []
}

export async function getMessagesSince(
  sessionId: string,
  sinceTimestamp: number
): Promise<ChatMessage[]> {
  const messages = await getMessages(sessionId)
  return messages.filter((m) => m.timestamp > sinceTimestamp)
}

// --- Telegram Integration ---

export async function sendToTelegram(sessionId: string, text: string): Promise<number | null> {
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID
  if (!chatId) {
    console.error('TELEGRAM_ADMIN_CHAT_ID is not configured')
    return null
  }

  const formattedText = `💬 *Live Chat — MaCommerce*\n\n` +
    `📋 Session: \`${sessionId}\`\n` +
    `━━━━━━━━━━━━━━━━━\n\n` +
    `${text}\n\n` +
    `━━━━━━━━━━━━━━━━━\n` +
    `_Reply pesan ini untuk membalas customer_`

  try {
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedText,
        parse_mode: 'Markdown',
      }),
    })

    const data = await response.json()

    if (data.ok && data.result?.message_id) {
      // Map this telegram message to the session
      await kv.set(`chat:tg_map:${data.result.message_id}`, sessionId, { ex: SESSION_TTL })
      await addTelegramMsgId(sessionId, data.result.message_id)
      return data.result.message_id
    }

    console.error('Telegram API error:', data)
    return null
  } catch (error) {
    console.error('Failed to send to Telegram:', error)
    return null
  }
}

export async function getSessionByTelegramMsgId(msgId: number): Promise<string | null> {
  return kv.get<string>(`chat:tg_map:${msgId}`)
}
