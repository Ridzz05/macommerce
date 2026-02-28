import { GoogleGenerativeAI } from '@google/generative-ai'
import { getProducts } from '@/app/lib/products'
import { CONTACT_INFO } from '@/app/data/contact'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

function buildSystemPrompt(productsContext: string): string {
  return `Kamu adalah **MaBot**, asisten customer service AI dari **MaCommerce** (macommerce.shop) — platform kurasi pilihan untuk Digital Product, Jasa Online, dan Growth Tools.

## Instruksi Utama
- Jawab HANYA dalam **Bahasa Indonesia** yang sopan dan ramah.
- Jawab pertanyaan HANYA seputar produk, layanan, dan cara order di MaCommerce.
- Jika user bertanya di luar topik MaCommerce, tolak dengan sopan dan arahkan kembali.
- Jangan pernah membuat informasi produk yang tidak ada di daftar.
- Jawab dengan singkat, jelas, dan to-the-point. Maksimal 3-4 paragraf per respons.
- Gunakan emoji secukupnya untuk membuat chat lebih friendly 😊

## Cara Order
Pemesanan dilakukan langsung melalui **WhatsApp** di nomor: ${CONTACT_INFO.whatsapp}
Kamu juga bisa follow Instagram kami di: @${CONTACT_INFO.instagram}

## Jika User Ingin Order
Arahkan user untuk menghubungi via WhatsApp dengan format:
"Halo, saya ingin order [nama produk] - [paket yang dipilih]"

## Daftar Produk Tersedia
${productsContext}

## Catatan
- Jika produk tidak ditemukan, sampaikan bahwa saat ini belum tersedia dan sarankan cek kembali nanti.
- Selalu tawarkan bantuan lanjutan di akhir respons.`
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages diperlukan.' }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: 'API key tidak dikonfigurasi.' }, { status: 500 })
    }

    // Fetch products from KV for context
    const products = await getProducts()
    const productsContext = products
      .map((p) => {
        let info = `- **${p.name}** (${p.category})\n  Harga: Rp${p.price.toLocaleString('id-ID')}`
        if (p.discountPrice) {
          info += ` → Rp${p.discountPrice.toLocaleString('id-ID')} (diskon)`
        }
        info += `\n  Deskripsi: ${p.description}`
        info += `\n  Fitur: ${p.features.join(', ')}`
        if (p.options && p.options.length > 0) {
          info += `\n  Paket: ${p.options.map((o) => `${o.label} (Rp${o.price.toLocaleString('id-ID')})`).join(', ')}`
        }
        if (p.demoUrl) {
          info += `\n  Demo: ${p.demoUrl}`
        }
        return info
      })
      .join('\n\n')

    const systemPrompt = buildSystemPrompt(productsContext)

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt,
    })

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }))

    const lastMessage = messages[messages.length - 1].content

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    })

    const result = await chat.sendMessageStream(lastMessage)

    // Create a readable stream for the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              controller.enqueue(new TextEncoder().encode(text))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json(
      { error: 'Terjadi kesalahan. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}
