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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

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

  const handleFileUpload = async (file: File) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append("resume", file)

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to analyze resume")

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.analysis }])
    } 
    catch (error) {
      console.error("Error analyzing resume:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oh no! It seems the magical resume analyzer encountered a mystical error. Could you please try uploading it again?",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="flex flex-col h-full bg-slate-900/50 backdrop-blur-md rounded-lg border border-blue-500/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
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
      <motion.div
        className="flex-1 overflow-y-auto p-6 space-y-6"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
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
        <div ref={messagesEndRef} />
      </motion.div>
      <motion.div
        className="p-4 border-t border-blue-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-3xl mx-auto flex items-center space-x-4">
          <FileUploadButton onUpload={handleFileUpload} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </motion.div>
    </motion.div>
  )
}