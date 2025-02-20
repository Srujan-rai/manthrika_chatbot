"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Sparkles } from "lucide-react"

interface FileUploadButtonProps {
  onUpload: (file: File) => void
}

export default function FileUploadButton({ onUpload }: FileUploadButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-3 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.3 }}>
          {isHovered ? <Sparkles size={24} /> : <Upload size={24} />}
        </motion.div>
      </label>
      <input id="file-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
    </motion.div>
  )
}

