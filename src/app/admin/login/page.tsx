'use client'

import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
    <div className="min-h-screen bg-[#FFFBF2] flex items-center justify-center px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Card Container */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100"
        >
          {/* Header Gradient */}
          <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500"></div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Logo Area */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 mb-4 mx-auto"
              >
                <Lock className="w-8 h-8 text-orange-600" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                Admin Panel
              </h1>
              <p className="text-gray-500 font-medium text-sm md:text-base">
                Masukkan password untuk melanjutkan
              </p>
            </motion.div>

            {/* Login Form */}
            <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
              {/* Password Input */}
              <motion.div variants={itemVariants} className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password admin"
                    className="w-full px-5 py-3 pl-5 pr-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-white hover:border-orange-300"
                    disabled={isLoading}
                    required
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  variants={itemVariants}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4"
                >
                  <p className="text-red-700 font-medium text-sm">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className="w-full relative h-12 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-300"></div>
                <div className="relative flex items-center justify-center gap-2 h-full">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-r-transparent rounded-full"
                      />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Login</span>
                    </>
                  )}
                </div>
              </motion.button>
            </motion.form>

            {/* Footer Info */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-8 border-t border-gray-200 text-center"
            >
              <p className="text-gray-500 text-sm">
                Halaman ini hanya untuk admin terautentikasi
              </p>
              <p className="text-gray-400 text-xs mt-2">
                v1.0 • MaCommerce Admin
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center"
        >
          <p className="text-gray-500 text-sm">
            ©2026 MaCommerce. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
