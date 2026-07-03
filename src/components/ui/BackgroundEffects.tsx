import { motion } from 'framer-motion'
import { isTouchDevice } from '@/hooks/useDevice'

const lite = typeof window !== 'undefined' && isTouchDevice()

const orbs = lite
  ? [
      { size: 220, x: '15%', y: '25%', color: 'rgba(15, 175, 156, 0.12)', delay: 0 },
      { size: 180, x: '75%', y: '55%', color: 'rgba(59, 130, 246, 0.1)', delay: 0.5 },
    ]
  : [
      { size: 300, x: '10%', y: '20%', color: 'rgba(15, 175, 156, 0.15)', delay: 0 },
      { size: 400, x: '70%', y: '10%', color: 'rgba(59, 130, 246, 0.12)', delay: 1 },
      { size: 250, x: '50%', y: '60%', color: 'rgba(139, 92, 246, 0.1)', delay: 2 },
      { size: 200, x: '85%', y: '70%', color: 'rgba(255, 213, 74, 0.08)', delay: 0.5 },
      { size: 350, x: '20%', y: '80%', color: 'rgba(15, 175, 156, 0.08)', delay: 1.5 },
    ]

export function GlowingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${lite ? 'blur-2xl' : 'blur-3xl'}`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          }}
          animate={
            lite
              ? { opacity: [0.35, 0.5, 0.35] }
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                  x: [0, 30, -20, 0],
                  y: [0, -20, 30, 0],
                }
          }
          transition={{
            duration: lite ? 6 + i : 8 + i * 2,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function FloatingParticles() {
  if (lite) return null

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
