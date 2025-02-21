"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, Cpu } from "lucide-react"
import EnergyExpansion from "./EnergyExpansion"

interface IntroPageProps {
  onChatStart: () => void
}

export default function IntroPage({ onChatStart }: IntroPageProps) {
  const [showEnergyExpansion, setShowEnergyExpansion] = useState(false)
  const [expansionOrigin, setExpansionOrigin] = useState({ x: 0, y: 0 })

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const handleInitialize = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setExpansionOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    setShowEnergyExpansion(true)
  }

  const handleExpansionComplete = () => {
    setShowEnergyExpansion(false)
    onChatStart()
  }

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <AnimatePresence>
        {showEnergyExpansion && (
          <EnergyExpansion
            onComplete={handleExpansionComplete}
            originX={expansionOrigin.x}
            originY={expansionOrigin.y}
          />
        )}
      </AnimatePresence>
      <div className="relative">
        <motion.div
          className="absolute -left-16 -top-16 text-blue-400/40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Brain size={64} />
        </motion.div>
        <motion.h1
          className="text-8xl font-bold mb-8 relative"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {Array.from("MANTHRIKA").map((letter, index) => (
            <motion.span key={index} variants={letterVariants} custom={index} className="inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{letter}</span>
            </motion.span>
          ))}
        </motion.h1>
      </div>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-2xl mb-12 text-center max-w-md text-blue-100/80 font-light">
          AI-Powered Career Intelligence
        </p>
        <motion.div
          className="absolute -right-12 top-0 text-blue-400/40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1.5,
          }}
        >
          <Sparkles size={32} />
        </motion.div>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={handleInitialize}
        className="group relative bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-medium py-4 px-8 rounded-lg text-lg transition-all duration-300 overflow-hidden border border-blue-500/30"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Cpu className="w-5 h-5" />
          Initialize AI Assistant
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
          initial={{ x: "100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={false}
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.button>
    </div>
  )
}

