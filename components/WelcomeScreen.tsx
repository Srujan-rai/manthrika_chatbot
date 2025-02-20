import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold mb-8"
      >
        Welcome to Manthrika
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl mb-12 text-center max-w-2xl"
      >
        Your AI-powered resume analysis and chat assistant
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Button onClick={onStart} size="lg" className="bg-white text-purple-600 hover:bg-purple-100">
          Get Started
        </Button>
      </motion.div>
    </div>
  )
}

