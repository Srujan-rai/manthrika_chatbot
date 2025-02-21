"use client"

import { useEffect, useRef } from "react"

interface EnergyExpansionProps {
  onComplete: () => void
  originX: number
  originY: number
}

export default function EnergyExpansion({ onComplete, originX, originY }: EnergyExpansionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let frame = 0
    const duration = 120 // Animation frames duration
    const particleCount = 200
    const maxRadius = Math.max(window.innerWidth, window.innerHeight)

    interface Particle {
      x: number
      y: number
      angle: number
      speed: number
      size: number
      color: string
      opacity: number
      distance: number
    }

    const particles: Particle[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      particles.push({
        x: originX,
        y: originY,
        angle,
        speed: Math.random() * 2 + 3,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`, // Blue to cyan colors
        opacity: 1,
        distance: 0,
      })
    }

    // Create energy rings
    const rings = Array.from({ length: 5 }, (_, i) => ({
      radius: 0,
      opacity: 1,
      width: (i + 1) * 2,
      speed: (i + 1) * 2,
      color: `hsla(${200 + i * 20}, 100%, 70%, 0.3)`,
    }))

    function drawCircuitLines(radius: number, opacity: number) {
      const segments = 12
      const angleStep = (Math.PI * 2) / segments

      ctx.strokeStyle = `rgba(66, 153, 225, ${opacity})`
      ctx.lineWidth = 2

      for (let i = 0; i < segments; i++) {
        const angle = i * angleStep
        const x1 = originX + Math.cos(angle) * radius
        const y1 = originY + Math.sin(angle) * radius
        const x2 = originX + Math.cos(angle + angleStep) * radius

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y1)
        ctx.stroke()

        // Draw connecting lines
        if (i % 2 === 0) {
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x1, y1 - 20)
          ctx.stroke()
        }
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.distance += particle.speed
        particle.opacity = Math.max(0, 1 - particle.distance / maxRadius)

        const x = originX + Math.cos(particle.angle) * particle.distance
        const y = originY + Math.sin(particle.angle) * particle.distance

        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(")", `, ${particle.opacity})`)
        ctx.fill()
      })

      // Update and draw rings
      rings.forEach((ring) => {
        ring.radius += ring.speed
        ring.opacity = Math.max(0, 1 - ring.radius / maxRadius)

        ctx.beginPath()
        ctx.arc(originX, originY, ring.radius, 0, Math.PI * 2)
        ctx.strokeStyle = ring.color.replace("0.3)", `${ring.opacity})`)
        ctx.lineWidth = ring.width
        ctx.stroke()

        // Draw circuit patterns
        drawCircuitLines(ring.radius, ring.opacity)
      })

      // Draw central glow
      const gradient = ctx.createRadialGradient(originX, originY, 0, originX, originY, 100)
      gradient.addColorStop(0, "rgba(66, 153, 225, 0.3)")
      gradient.addColorStop(1, "rgba(66, 153, 225, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      frame++

      if (frame < duration) {
        requestAnimationFrame(animate)
      } else {
        // Fade out
        let opacity = 1
        function fadeOut() {
          opacity -= 0.05
          canvas.style.opacity = opacity.toString()

          if (opacity > 0) {
            requestAnimationFrame(fadeOut)
          } else {
            onComplete()
          }
        }
        fadeOut()
      }
    }

    animate()

    return () => {
      // Cleanup
    }
  }, [originX, originY, onComplete])

  return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" style={{ opacity: 1 }} />
}

