"use client"
import { useState, useEffect } from "react"
import IntroPage from "../components/IntroPage";
import ChatInterface from "../components/ChatInterface";
import { motion, AnimatePresence } from "framer-motion";
import DynamicBackground from "../components/DynamicBackground";

export default function Home() {
  const [showChat, setShowChat] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <main className="flex flex-col h-screen overflow-hidden relative">
      <DynamicBackground mousePosition={mousePosition} />
      <AnimatePresence mode="wait">
        {!showChat ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 z-10"
          >
            <IntroPage onChatStart={() => setShowChat(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 z-10"
          >
            <ChatInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

