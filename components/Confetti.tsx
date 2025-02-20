"use client"

import { useEffect, useState } from "react"

const Confetti = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([])

  useEffect(() => {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFEB3B",
      "#FFC107",
      "#FF9800",
      "#FF5722",
    ]
    const newParticles = []

    for (let i = 0; i < 50; i++) {
      const left = Math.random() * 100
      const top = Math.random() * 100
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = Math.random() * 2 + 1 // Added random size
      const animationDuration = Math.random() * 3 + 2 // Added variable for animation duration

      newParticles.push(
        <div
          key={i}
          className="absolute w-[6px] h-[6px] rounded-full" // Updated class for size
          style={{
            left: `${left}%`,
            top: `${top}%`,
            backgroundColor: color,
            width: `${size}px`, // Added dynamic width
            height: `${size}px`, // Added dynamic height
            animation: `fall ${animationDuration}s linear`, // Use animationDuration variable
          }}
        />,
      )
    }

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {" "}
      {/* Added z-50 for layering */}
      {particles}
    </div>
  )
}

export default Confetti

