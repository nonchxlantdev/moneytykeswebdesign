import { motion } from 'framer-motion'
import { useTilt } from '@/hooks/useTilt'
import type { ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlowCard({ children, className = '', glowColor = 'rgba(15, 175, 156, 0.3)' }: GlowCardProps) {
  const tiltRef = useTilt(6)

  return (
    <motion.div
      ref={tiltRef}
      className={`relative rounded-2xl card-light premium-shadow transition-all duration-500 ${className}`}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 60px ${glowColor}, 0 8px 24px rgba(7, 26, 45, 0.12)`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
