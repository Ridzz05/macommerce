import { addMessage, getSessionByTelegramMsgId } from '@/app/lib/chat'

export async function POST(request: Request) {
  try {
    const update = await request.json()

    // Only process messages (not edits, etc.)
    if (!update.message) {
      return Response.json({ ok: true })
    }

    const message = update.message

    // Only process replies to our forwarded messages
    if (!message.reply_to_message) {
      return Response.json({ ok: true })
    }

    const replyToMsgId = message.reply_to_message.message_id
    const adminText = message.text

    if (!adminText) {
      return Response.json({ ok: true })
    }

    // Find the session this reply belongs to
    const sessionId = await getSessionByTelegramMsgId(replyToMsgId)

    if (!sessionId) {
      console.warn(`No session found for Telegram message ID: ${replyToMsgId}`)
      return Response.json({ ok: true })
    }

    // Save admin reply to the session
    await addMessage(sessionId, 'admin', adminText)

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    return Response.json({ ok: true }) // Always return 200 to Telegram
  }
}

// Telegram sends GET to verify webhook
export async function GET() {
  return Response.json({ status: 'Webhook active' })
}
