import { motion } from "framer-motion"

interface ChatMessageProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-lg ${
          message.role === "user"
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            : "bg-gradient-to-r from-blue-500 to-teal-400 text-white"
        } shadow-lg`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </motion.div>
  )
}

