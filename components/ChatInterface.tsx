"use client"

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import FileUploadButton from "../components/FileUploadButton";
import { CircuitBoardIcon as Circuit } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial greeting message
    setMessages([
      {
        role: "assistant",
        content:
          "Welcome to Manthrika! I'm your magical AI career assistant. How can I enchant your career journey today? Feel free to upload your resume or ask me anything about your professional path!",
      },
    ])
  }, [])

  // 🔥 FIX: Auto-scroll ensuring last message is always fully visible
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    }
  }, [messages])

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error in chat:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but it seems my crystal ball is a bit foggy. Could you please try again?",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-900/50 backdrop-blur-md rounded-lg border border-blue-500/20">
      {/* Header */}

      <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <Circuit className="w-5 h-5 text-blue-400" />
          <span className="text-blue-300 font-medium">AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-blue-400/60 text-sm">Active</span>
        </div>
      </div>

      {/* Chat messages container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(147, 197, 253, 0.3) transparent",
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
            <div className="typing-indicator flex space-x-2 bg-slate-800/50 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
            </div>
          </motion.div>
        )}
        {/* 👇 Invisible div to handle auto-scroll */}
        <div ref={messagesEndRef} className="h-12" />
      </div>

      {/* Fixed input area */}
      <div className="sticky bottom-0 left-0 right-0 bg-slate-900/50 p-4 border-t border-blue-500/20">
        <div className="max-w-3xl mx-auto flex items-center space-x-4">
          <FileUploadButton onUpload={() => {}} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
