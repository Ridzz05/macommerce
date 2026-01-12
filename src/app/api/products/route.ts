import { NextResponse } from 'next/server'
import { createProduct, getProducts, parseProductPayload } from '@/app/lib/products'

export async function GET() {
  const products = await getProducts()
  return NextResponse.json({ products })
}

export async function POST(request: Request) {
  const payload = await request.json()
  const input = payload?.product ?? payload
  const parsed = parseProductPayload(input)

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  try {
    const product = await createProduct(parsed.value)
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Gagal menyimpan produk.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
