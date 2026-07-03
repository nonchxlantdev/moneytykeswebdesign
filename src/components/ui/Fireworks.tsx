import { useMemo } from 'react'
import { motion } from 'framer-motion'

export interface FireworkBurst {
  id: number
  x: number
  y: number
}

const BELIZE_COLORS = ['#CE1126', '#003F87', '#FFD54A', '#0FAF9C', '#FFFFFF', '#FF6B35', '#8B5CF6']

function Burst({ x, y }: { x: number; y: number }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 36 + (Math.random() - 0.5) * 0.4
        const velocity = 70 + Math.random() * 130
        return {
          id: i,
          color: BELIZE_COLORS[Math.floor(Math.random() * BELIZE_COLORS.length)],
          dx: Math.cos(angle) * velocity,
          dy: Math.sin(angle) * velocity,
          size: 3 + Math.random() * 5,
          delay: Math.random() * 0.08,
        }
      }),
    [x, y],
  )

  return (
    <>
      <motion.div
        className="absolute rounded-full bg-white"
        style={{ left: x, top: y, width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 2.5, 0], opacity: [1, 0.8, 0] }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: x,
            top: y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 8px ${s.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: s.dx,
            y: s.dy + 50,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ duration: 1.1 + Math.random() * 0.35, delay: s.delay, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}

interface FireworksProps {
  bursts: FireworkBurst[]
}

export function Fireworks({ bursts }: FireworksProps) {
  if (bursts.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden" aria-hidden>
      {bursts.map((burst) => (
        <Burst key={burst.id} x={burst.x} y={burst.y} />
      ))}
    </div>
  )
}

export function createFireworkBursts(x: number, y: number): FireworkBurst[] {
  const base = Date.now()
  return [
    { id: base, x, y },
    { id: base + 1, x: x + 55, y: y - 35 },
    { id: base + 2, x: x - 45, y: y - 55 },
  ]
}
