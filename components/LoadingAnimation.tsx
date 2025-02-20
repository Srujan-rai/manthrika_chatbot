import { motion } from "framer-motion"

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-purple-600">
      <motion.div
        animate={{
          scale: [1, 1.5, 1.5, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 1,
        }}
        className="w-16 h-16 bg-purple-600"
      />
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-2xl font-semibold"
      >
        Analyzing your resume...
      </motion.h2>
    </div>
  )
}

