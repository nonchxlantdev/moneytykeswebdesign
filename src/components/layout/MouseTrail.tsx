import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number; age: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      points.current.push({ x: e.clientX, y: e.clientY, age: 0 })
      if (points.current.length > 20) points.current.shift()
    }
    window.addEventListener('mousemove', onMove)

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
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9997]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  )
}
