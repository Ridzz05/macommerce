'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from '@/app/actions/auth';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-10 px-4 py-2 bg-[#5C4B37] text-white rounded-md hover:bg-[#3D3224] disabled:opacity-50 transition-colors font-bold text-sm shadow-sm"
    >
      {pending ? 'Sedang masuk...' : 'Masuk'}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#FDF6E3] px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-[#EDE3CD]">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#5C4B37]">Masuk ke Akun</h2>
          <p className="mt-2 text-sm text-[#8B7355]">Silakan masukkan email dan password Anda</p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#5C4B37] mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-lg border border-[#EDE3CD] px-4 py-2.5 text-sm focus:border-[#5C4B37] focus:outline-none focus:ring-2 focus:ring-[#5C4B37]/20 transition-all bg-[#FDF6E3]/30"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5C4B37] mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-lg border border-[#EDE3CD] px-4 py-2.5 text-sm focus:border-[#5C4B37] focus:outline-none focus:ring-2 focus:ring-[#5C4B37]/20 transition-all bg-[#FDF6E3]/30"
                placeholder="••••••••"
              />
            </div>
          </div>

          {state?.error && (
             <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {state.error}
             </div>
          )}

          <SubmitButton />
        </form>

        <p className="text-center text-sm text-[#8B7355] mt-6">
          Belum punya akun?{' '}
          <Link href="/register" className="font-bold text-[#5C4B37] hover:text-[#3D3224] hover:underline transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
