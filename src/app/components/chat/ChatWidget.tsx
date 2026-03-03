'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

interface Message {
  id: string
  role: 'user' | 'admin'
  content: string
  timestamp: number
  status?: 'sending' | 'sent' | 'error'
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'admin',
  content: 'Halo! 👋 Selamat datang di MaCommerce.\nTim kami siap membantu kamu.\n\nMau tanya soal produk, harga, atau cara order? Langsung aja ketik di bawah! 😊',
  timestamp: Date.now(),
}

const POLL_INTERVAL = 3000
const SESSION_KEY = 'macommerce_chat_session'
const MESSAGES_KEY = 'macommerce_chat_messages'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastTimestampRef = useRef<number>(0)

  // Restore session from localStorage
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(SESSION_KEY)
      const savedMessages = localStorage.getItem(MESSAGES_KEY)
      if (savedSession) setSessionId(savedSession)
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages) as Message[]
        if (parsed.length > 0) {
          setMessages([WELCOME_MESSAGE, ...parsed])
          lastTimestampRef.current = Math.max(...parsed.map((m) => m.timestamp))
        }
      }
    } catch {}
  }, [])

  // Persist messages
  useEffect(() => {
    const toSave = messages.filter((m) => m.id !== 'welcome')
    if (toSave.length > 0) {
      try { localStorage.setItem(MESSAGES_KEY, JSON.stringify(toSave)) } catch {}
    }
  }, [messages])

  // Persist session ID
  useEffect(() => {
    if (sessionId) {
      try { localStorage.setItem(SESSION_KEY, sessionId) } catch {}
    }
  }, [sessionId])

  // Lock body scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Poll for new messages
  const pollMessages = useCallback(async () => {
    if (!sessionId) return
    try {
      const response = await fetch(
        `/api/chat?sessionId=${sessionId}&after=${lastTimestampRef.current}`
      )
      if (!response.ok) return
      const data = await response.json()
      const adminMessages = (data.messages || []).filter((m: any) => m.role === 'admin')

      if (adminMessages.length > 0) {
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id))
          const newMsgs: Message[] = adminMessages
            .filter((m: any) => !existingIds.has(m.id))
            .map((m: any) => ({
              id: m.id,
              role: 'admin' as const,
              content: m.content,
              timestamp: m.timestamp,
              status: 'sent' as const,
            }))
          if (newMsgs.length > 0) {
            if (!document.hasFocus() || !isOpen) setHasNewMessage(true)
            lastTimestampRef.current = Math.max(
              lastTimestampRef.current,
              ...newMsgs.map((m) => m.timestamp)
            )
            return [...prev, ...newMsgs]
          }
          return prev
        })
      }
    } catch (error) {
      console.error('Poll error:', error)
    }
  }, [sessionId, isOpen])

  useEffect(() => {
    if (sessionId) {
      pollIntervalRef.current = setInterval(pollMessages, POLL_INTERVAL)
      return () => { if (pollIntervalRef.current) clearInterval(pollIntervalRef.current) }
    }
  }, [sessionId, pollMessages])

  const handleSend = async (content: string) => {
    const tempId = `temp-${Date.now()}`
    const userMessage: Message = {
      id: tempId,
      role: 'user',
      content,
      timestamp: Date.now(),
      status: 'sending',
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: content }),
      })
      if (!response.ok) {
        let errorMsg = 'Gagal mengirim pesan.'
        try {
          const errorData = await response.json()
          if (errorData?.error) errorMsg = errorData.error
        } catch {}
        throw new Error(errorMsg)
      }
      const data = await response.json()
      if (!sessionId) setSessionId(data.sessionId)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId
            ? { ...m, id: data.messageId, status: 'sent', timestamp: data.timestamp }
            : m
        )
      )
      lastTimestampRef.current = Math.max(lastTimestampRef.current, data.timestamp)
    } catch (error: any) {
      console.error('Send error:', error)
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, status: 'error' } : m))
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
    setHasNewMessage(false)
  }

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE])
    setSessionId(null)
    lastTimestampRef.current = 0
    try {
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem(MESSAGES_KEY)
    } catch {}
  }

  return (
    <>
      {/* Full Screen Chat Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#FFFBF2]"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#C8956C] to-[#A67548] text-white safe-area-top">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggle}
                  className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors -ml-1"
                  aria-label="Kembali"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">Live Chat</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                    <p className="text-[11px] opacity-90">Tim MaCommerce</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {sessionId && (
                  <button
                    onClick={handleClearChat}
                    className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Chat baru"
                    title="Mulai chat baru"
                  >
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-[15%] xl:px-[20%] py-4 space-y-1 scrollbar-thin"
            >
              {/* Date Indicator */}
              <div className="flex justify-center mb-4">
                <span className="text-[11px] text-[#B8A88A] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-[#EDE3CD]/40">
                  Hari ini
                </span>
              </div>

              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                  status={message.status}
                />
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start mb-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#C8956C] to-[#A67548] flex items-center justify-center mr-2 mt-1 shadow-sm">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <div className="bg-white text-[#5C4B37] rounded-2xl rounded-bl-md shadow-sm border border-[#EDE3CD]/60 px-4 py-3">
                    <span className="flex gap-1.5">
                      <span className="w-2 h-2 bg-[#C8956C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#C8956C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#C8956C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 safe-area-bottom">
              <ChatInput onSend={handleSend} disabled={isLoading} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={handleToggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#C8956C] to-[#A67548] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Buka live chat"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>

            {/* Notification dot */}
            {hasNewMessage && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
