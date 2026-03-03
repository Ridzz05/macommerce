import {
  createSession,
  getSession,
  addMessage,
  getMessagesSince,
  sendToTelegram,
  updateSessionActivity,
} from '@/app/lib/chat'

// POST — User sends a message
export async function POST(request: Request) {
  try {
    const { sessionId, message } = await request.json()

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return Response.json({ error: 'Pesan tidak boleh kosong.' }, { status: 400 })
    }

    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_ADMIN_CHAT_ID) {
      return Response.json({ error: 'Chat service belum dikonfigurasi.' }, { status: 500 })
    }

    const trimmedMessage = message.trim()

    // Get or create session
    let session = sessionId ? await getSession(sessionId) : null
    if (!session) {
      session = await createSession()
    }

    // Save user message
    const savedMessage = await addMessage(session.id, 'user', trimmedMessage)

    // Forward to Telegram admin
    await sendToTelegram(session.id, trimmedMessage)

    return Response.json({
      sessionId: session.id,
      messageId: savedMessage.id,
      timestamp: savedMessage.timestamp,
    })
  } catch (error) {
    console.error('Chat POST error:', error)
    return Response.json(
      { error: 'Terjadi kesalahan. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}

// GET — Poll for new messages
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const after = searchParams.get('after')

    if (!sessionId) {
      return Response.json({ error: 'Session ID diperlukan.' }, { status: 400 })
    }

    const session = await getSession(sessionId)
    if (!session) {
      return Response.json({ error: 'Session tidak ditemukan.' }, { status: 404 })
    }

    // Update session activity
    await updateSessionActivity(sessionId)

    const sinceTimestamp = after ? parseInt(after, 10) : 0
    const messages = await getMessagesSince(sessionId, sinceTimestamp)

    return Response.json({
      messages,
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Chat GET error:', error)
    return Response.json(
      { error: 'Terjadi kesalahan.' },
      { status: 500 }
    )
  }
}
