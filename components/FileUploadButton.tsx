"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Brain, Check } from "lucide-react"
import ProcessorEffect from "./ProcessorEffect"
import CircuitAnimation from "./CircuitAnimation"

interface FileUploadButtonProps {
  onUpload: (file: File) => void
}

export default function FileUploadButton({ onUpload }: FileUploadButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [showCircuit, setShowCircuit] = useState(false)
  const [circuitPosition, setCircuitPosition] = useState({ x: 0, y: 0 })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Get the button position for the circuit animation
      const button = document.querySelector("#upload-button")
      if (button) {
        const rect = button.getBoundingClientRect()
        setCircuitPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
        setShowCircuit(true)
        setTimeout(() => setShowCircuit(false), 2000)
      }

      onUpload(file)
      setIsUploaded(true)
      setTimeout(() => setIsUploaded(false), 3000)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      {showCircuit && <CircuitAnimation x={circuitPosition.x} y={circuitPosition.y} />}
      <label
        id="upload-button"
        htmlFor="file-upload"
        className="cursor-pointer bg-slate-800/50 text-blue-400 rounded-lg p-3 flex items-center justify-center transition-all duration-300 border border-blue-500/20 hover:bg-slate-700/50 relative overflow-hidden"
      >
        <ProcessorEffect />
        <AnimatePresence mode="wait">
          {isUploaded ? (
            <motion.div
              key="uploaded"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <Check size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {isHovered ? <Brain size={24} /> : <Upload size={24} />}
            </motion.div>
          )}
        </AnimatePresence>
      </label>
      <input id="file-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
    </motion.div>
  )
}

