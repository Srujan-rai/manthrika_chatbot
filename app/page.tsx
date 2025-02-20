"use client"

import { useState } from "react"
import IntroPage from "@/components/IntroPage"
import ChatInterface from "@/components/ChatInterface"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  return (
    <main className="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!showChat ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <IntroPage onChatStart={() => setShowChat(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <ChatInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

