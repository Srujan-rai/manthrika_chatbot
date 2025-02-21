"use client"

import { motion } from "framer-motion"
import { User, CircuitBoardIcon as Circuit } from "lucide-react"

interface ChatMessageProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <motion.div
        className={`max-w-[80%] p-4 rounded-lg ${
          isUser ? "bg-blue-500/20 border border-blue-500/30" : "bg-slate-800/50 border border-slate-700/50"
        } shadow-lg flex items-start space-x-3 relative overflow-hidden`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: 0,
          }}
        />
        <div className={`flex-shrink-0 ${isUser ? "order-2 ml-3" : "mr-3"}`}>
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center relative">
              <User className="w-5 h-5 text-blue-400" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center relative">
              <Circuit className="w-5 h-5 text-blue-400" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>
          )}
        </div>
        <p className={`text-sm ${isUser ? "text-blue-100" : "text-slate-300"} relative z-10`}>{message.content}</p>
      </motion.div>
    </motion.div>
  )
}

