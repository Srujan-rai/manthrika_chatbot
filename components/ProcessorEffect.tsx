"use client"

import { motion } from "framer-motion"

interface ProcessorEffectProps {
  className?: string
}

export default function ProcessorEffect({ className = "" }: ProcessorEffectProps) {
  return (
    <motion.div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 1.4],
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 relative">
          {/* Circuit lines */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-blue-400/30"
                style={{
                  top: `${i * 20}%`,
                  left: 0,
                  right: 0,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px bg-blue-400/30"
                style={{
                  left: `${i * 20}%`,
                  top: 0,
                  bottom: 0,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

