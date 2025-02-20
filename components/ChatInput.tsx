"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, []) // Updated dependency

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex items-end">
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Cast your career spell..."
          rows={1}
          className="w-full resize-none bg-purple-900 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={isLoading || !message.trim()}
          className="absolute right-2 bottom-2 text-pink-500 disabled:text-gray-500"
        >
          {isLoading ? <Sparkles className="animate-spin" size={24} /> : <Send size={24} />}
        </motion.button>
      </div>
    </form>
  )
}

