import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePointerPosition } from '@/hooks/usePointerPosition'

export function MouseTrail() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number; age: number }[]>([])
  const pos = usePointerPosition(enabled)
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      setEnabled(false)
      return
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) {
      setEnabled(false)
      return
    }

    setEnabled(true)
  }, [reducedMotion])

  useEffect(() => {
    if (!enabled || !pos.active) return
    if (lastPos.current?.x === pos.x && lastPos.current?.y === pos.y) return
    lastPos.current = { x: pos.x, y: pos.y }
    points.current.push({ x: pos.x, y: pos.y, age: 0 })
    if (points.current.length > 20) points.current.shift()
  }, [enabled, pos])

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      points.current.forEach((p) => {
        p.age++
        const alpha = 1 - p.age / 20
        if (alpha <= 0) return
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4 * alpha, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 185, 66, ${alpha * 0.35})`
        ctx.fill()
      })
      points.current = points.current.filter((p) => p.age < 20)
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [enabled])

  if (reducedMotion || !enabled) return null

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9997]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  )
}
