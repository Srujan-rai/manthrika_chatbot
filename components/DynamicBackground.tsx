"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface DynamicBackgroundProps {
  mousePosition: { x: number; y: number }
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ mousePosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Neural network nodes
    class Node {
      x: number
      y: number
      connections: Node[]
      speed: number
      angle: number
      radius: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.connections = []
        this.speed = Math.random() * 0.5 + 0.2
        this.angle = Math.random() * Math.PI * 2
        this.radius = Math.random() * 2 + 1
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        if (this.x < 0 || this.x > canvas.width) this.angle = Math.PI - this.angle
        if (this.y < 0 || this.y > canvas.height) this.angle = -this.angle
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(147, 197, 253, 0.5)"
        ctx.fill()

        // Draw connections
        this.connections.forEach((node) => {
          const distance = Math.hypot(this.x - node.x, this.y - node.y)
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(node.x, node.y)
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.2 - distance / 750})`
            ctx.stroke()
          }
        })
      }
    }

    const nodes: Node[] = []
    const nodeCount = 100

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = new Node(Math.random() * canvas.width, Math.random() * canvas.height)
      nodes.push(node)
    }

    // Connect nodes
    nodes.forEach((node) => {
      const connections = nodes
        .filter((n) => n !== node)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      node.connections = connections
    })

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node) => {
        node.update()
        node.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          filter: "blur(1px)",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))",
            "linear-gradient(to bottom right, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
    </motion.div>
  )
}

export default DynamicBackground

