'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Lock, LogIn } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/products')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const success = await login(password)
    if (success) {
      setPassword('')
      router.push('/admin/products')
    } else {
      setError('Password salah. Silakan coba lagi.')
      setPassword('')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FFFBF2] flex items-center justify-center px-4 py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white border border-[#EDE3CD] rounded-xl shadow-sm"
        >
          <div className="p-6 sm:p-8">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <div className="flex items-center justify-center">
                <div className="w-14 h-14 rounded-xl border border-[#EDE3CD] bg-[#FFFBF2] flex items-center justify-center">
                  <Image src="/favicon.svg" alt="MaCommerce" width={32} height={32} />
                </div>
              </div>
              <h1 className="mt-4 text-2xl font-semibold text-[#5C4B37]">Admin Login</h1>
              <p className="text-sm text-[#8B7355] mt-1">
                Masukkan password untuk melanjutkan
              </p>
            </motion.div>

            <motion.form onSubmit={handleSubmit} className="space-y-4" variants={itemVariants}>
              <label className="text-sm text-[#5C4B37] font-medium block">
                Password
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password admin"
                    className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
                    disabled={isLoading}
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C3B091] pointer-events-none" />
                </div>
              </label>

              {error && (
                <motion.div
                  variants={itemVariants}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className="w-full px-4 py-2 rounded-lg bg-[#5C4B37] text-white text-sm font-medium hover:bg-[#3D3224] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-r-transparent rounded-full"
                    />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 text-center text-xs text-[#8B7355]">
          Halaman ini hanya untuk admin terautentikasi
        </motion.div>
      </motion.div>
    </div>
  )
}
