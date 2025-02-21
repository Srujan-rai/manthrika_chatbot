"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Brain } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaHeight, setTextareaHeight] = useState("auto")

  // Update textarea height on content change
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto"

      // Calculate new height (with max-height limit)
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200)

      // Set the new height
      textareaRef.current.style.height = `${newHeight}px`
      setTextareaHeight(`${newHeight}px`)
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage("")
      // Reset height after sending message
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
        setTextareaHeight("auto")
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex items-end">
      <div className="relative flex-1">
        <motion.textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Query the AI..."
          rows={1}
          className="w-full resize-none bg-slate-800/50 text-blue-100 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-blue-300/30 border border-blue-500/20"
          style={{
            height: textareaHeight,
            maxHeight: "200px",
            overflowY: textareaHeight === "200px" ? "auto" : "hidden",
          }}
        />
        <AnimatePresence>
          {message.trim() && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              disabled={isLoading || !message.trim()}
              className="absolute right-2 bottom-2 text-blue-400 disabled:text-blue-300/30 bg-slate-800/50 rounded-full p-2"
            >
              {isLoading ? <Brain className="animate-pulse" size={24} /> : <Send size={24} />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

