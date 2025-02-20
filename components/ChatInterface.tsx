"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ChatMessage from "@/components/ChatMessage"
import ChatInput from "@/components/ChatInput"
import FileUploadButton from "@/components/FileUploadButton"

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
  }, [messages, messagesEndRef]) // Updated dependency

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get response")
      }

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

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze resume")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.analysis }])
    } catch (error) {
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            <div className="loader"></div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <motion.div
        className="p-4 border-t border-purple-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-3xl mx-auto flex items-center space-x-2">
          <FileUploadButton onUpload={handleFileUpload} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </motion.div>
    </div>
  )
}

