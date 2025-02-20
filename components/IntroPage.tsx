"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface IntroPageProps {
  onChatStart: () => void
}

export default function IntroPage({ onChatStart }: IntroPageProps) {
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

  const calculateRotation = (axis: "x" | "y") => {
    const center = axis === "x" ? window.innerWidth / 2 : window.innerHeight / 2
    const position = axis === "x" ? mousePosition.x : mousePosition.y
    return ((position - center) / center) * 10 // Max rotation of 10 degrees
  }

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500"
        animate={{
          background: [
            "linear-gradient(to bottom right, #9333ea, #ec4899, #ef4444)",
            "linear-gradient(to bottom right, #3b82f6, #8b5cf6, #d946ef)",
            "linear-gradient(to bottom right, #10b981, #3b82f6, #6366f1)",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <motion.div
        className="z-10 text-center"
        style={{
          perspective: "1000px",
        }}
        animate={{
          rotateX: calculateRotation("y"),
          rotateY: calculateRotation("x"),
        }}
      >
        <motion.h1
          className="text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          MANTHRIKA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-2xl mb-12 text-center max-w-md mx-auto"
        >
          Your magical AI-powered career assistant
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={onChatStart}
          className="bg-white text-purple-700 font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Start Your Journey</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </motion.div>
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          backgroundImage: [
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            "radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)",
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          ],
          backgroundSize: ["50px 50px", "40px 40px", "50px 50px"],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
    </div>
  )
}

