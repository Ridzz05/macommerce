import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { cookies } from 'next/headers'

const SESSION_TTL = 24 * 60 * 60 // 24 hours

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password tidak ditemukan' },
        { status: 400 }
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set')
      return NextResponse.json(
        { error: 'Konfigurasi server bermasalah.' },
        { status: 500 }
      )
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Password salah' },
        { status: 401 }
      )
    }

    // Generate secure session token
    const token = crypto.randomUUID()

    // Store session in Redis with TTL
    await kv.set(`admin:session:${token}`, {
      createdAt: Date.now(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    }, { ex: SESSION_TTL })

    // Set cookie with session token
    const response = NextResponse.json(
      { message: 'Login berhasil' },
      { status: 200 }
    )

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_TTL,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    )
  }
}
