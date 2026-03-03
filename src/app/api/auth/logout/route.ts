import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { kv } from '@vercel/kv'

export async function POST() {
  // Delete session from Redis
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')

  if (token?.value) {
    await kv.del(`admin:session:${token.value}`)
  }

  const response = NextResponse.json(
    { message: 'Logout berhasil' },
    { status: 200 }
  )

  // Clear the admin token cookie
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })

  return response
}
