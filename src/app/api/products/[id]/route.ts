import { NextResponse } from 'next/server'
import { deleteProduct, getProductById, parseProductPayload, updateProduct } from '@/app/lib/products'

type RouteParams = {
  params: {
    id: string
  }
}

const parseId = (value: string) => {
  const id = Number(value)
  return Number.isFinite(id) ? id : null
}

export async function GET(_request: Request, { params }: RouteParams) {
  const id = parseId(params.id)

  if (id === null) {
    return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 })
  }

  const product = await getProductById(id)
  if (!product) {
    return NextResponse.json({ error: 'Produk tidak ditemukan.' }, { status: 404 })
  }

  return NextResponse.json({ product })
}

export async function PUT(request: Request, { params }: RouteParams) {
  const id = parseId(params.id)

  if (id === null) {
    return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 })
  }

  const payload = await request.json()
  const input = payload?.product ?? payload
  const parsed = parseProductPayload(input)

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const product = await updateProduct(id, parsed.value)
  if (!product) {
    return NextResponse.json({ error: 'Produk tidak ditemukan.' }, { status: 404 })
  }

  return NextResponse.json({ product })
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const id = parseId(params.id)

  if (id === null) {
    return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 })
  }

  const deleted = await deleteProduct(id)
  if (!deleted) {
    return NextResponse.json({ error: 'Produk tidak ditemukan.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
