"use client"

import { useEffect, useRef } from "react"

interface CircuitAnimationProps {
  x: number
  y: number
}

export default function CircuitAnimation({ x, y }: CircuitAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const branches = 8
    const maxDepth = 4
    let frame = 0

    interface Branch {
      startX: number
      startY: number
      angle: number
      depth: number
      length: number
      progress: number
      children: Branch[]
    }

    function createBranch(x: number, y: number, angle: number, depth: number): Branch {
      return {
        startX: x,
        startY: y,
        angle,
        depth,
        length: Math.random() * 50 + 30,
        progress: 0,
        children: [],
      }
    }

    // Create initial branches
    const rootBranches: Branch[] = []
    for (let i = 0; i < branches; i++) {
      const angle = (i * Math.PI * 2) / branches
      rootBranches.push(createBranch(x, y, angle, 0))
    }

    function drawBranch(branch: Branch) {
      if (branch.progress < 1) {
        branch.progress += 0.05
      } else if (branch.depth < maxDepth && branch.children.length === 0) {
        // Create child branches
        const numChildren = Math.floor(Math.random() * 2) + 1
        for (let i = 0; i < numChildren; i++) {
          const angleOffset = ((Math.random() - 0.5) * Math.PI) / 2
          const newAngle = branch.angle + angleOffset
          const endX = branch.startX + Math.cos(branch.angle) * branch.length
          const endY = branch.startY + Math.sin(branch.angle) * branch.length
          branch.children.push(createBranch(endX, endY, newAngle, branch.depth + 1))
        }
      }

      const endX = branch.startX + Math.cos(branch.angle) * branch.length * branch.progress
      const endY = branch.startY + Math.sin(branch.angle) * branch.length * branch.progress

      ctx.beginPath()
      ctx.moveTo(branch.startX, branch.startY)
      ctx.lineTo(endX, endY)

      const alpha = Math.max(0, 1 - branch.depth / maxDepth)
      ctx.strokeStyle = `rgba(66, 153, 225, ${alpha})`
      ctx.lineWidth = Math.max(1, 3 - branch.depth)
      ctx.stroke()

      // Draw pulse effect
      const pulseRadius = Math.sin(frame * 0.1) * 2 + 4
      ctx.beginPath()
      ctx.arc(endX, endY, pulseRadius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(66, 153, 225, ${alpha * 0.5})`
      ctx.fill()

      branch.children.forEach(drawBranch)
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      rootBranches.forEach(drawBranch)
      frame++

      // Stop animation after all branches are complete
      const isComplete = rootBranches.every((branch) => {
        const checkBranchComplete = (b: Branch): boolean => {
          if (b.depth === maxDepth) return b.progress >= 1
          return b.progress >= 1 && b.children.every(checkBranchComplete)
        }
        return checkBranchComplete(branch)
      })

      if (!isComplete) {
        requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      // Cleanup
    }
  }, [x, y])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-50" style={{ opacity: 0.8 }} />
}

