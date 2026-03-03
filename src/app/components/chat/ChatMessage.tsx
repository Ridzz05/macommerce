'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ChatMessageProps {
  role: 'user' | 'admin'
  content: string
  timestamp: number
  status?: 'sending' | 'sent' | 'error'
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ChatMessage({ role, content, timestamp, status }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden mr-2 mt-1 shadow-sm">
          <Image src="/icons/macommerce_cs.png" alt="CS" width={28} height={28} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-col">
        <div
          className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-gradient-to-r from-[#C8956C] to-[#A67548] text-white rounded-br-md shadow-md'
              : 'bg-white text-[#5C4B37] rounded-bl-md shadow-sm border border-[#EDE3CD]/60'
          }`}
        >
          {content}
        </div>
        {/* Timestamp + Status */}
        <div className={`flex items-center gap-1 mt-0.5 ${isUser ? 'justify-end' : 'justify-start ml-0.5'}`}>
          <span className="text-[10px] text-[#B8A88A]">
            {formatTime(timestamp)}
          </span>
          {isUser && status && (
            <span className="text-[10px]">
              {status === 'sending' && <span className="text-[#B8A88A]">⏳</span>}
              {status === 'sent' && <span className="text-[#8BC34A]">✓</span>}
              {status === 'error' && <span className="text-red-400">✗</span>}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
