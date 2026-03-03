'use client'

import { motion } from 'framer-motion'

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
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#C8956C] to-[#A67548] flex items-center justify-center mr-2 mt-1 shadow-sm">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
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
