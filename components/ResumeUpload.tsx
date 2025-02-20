"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileText, Loader2 } from "lucide-react"

interface ResumeUploadProps {
  onUpload: (file: File) => void
  isAnalyzing: boolean
}

export default function ResumeUpload({ onUpload, isAnalyzing }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <label
          htmlFor="resume-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">PDF, DOC, or DOCX (MAX. 10MB)</p>
          </div>
          <Input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </motion.div>
      {file && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-2 text-sm text-gray-300"
        >
          <FileText className="w-4 h-4" />
          <span>{file.name}</span>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Button
          onClick={handleUpload}
          disabled={!file || isAnalyzing}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" /> Upload Resume
            </>
          )}
        </Button>
      </motion.div>
    </div>
  )
}

