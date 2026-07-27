import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CoinImage } from '@/components/ui/CoinImage'
import { usePointerPosition } from '@/hooks/usePointerPosition'

export function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [inWindow, setInWindow] = useState(true)
  const [hovering, setHovering] = useState(false)
  const pos = usePointerPosition(enabled)

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
    document.documentElement.classList.add('has-custom-cursor')

    const leave = () => setInWindow(false)
    const enter = () => setInWindow(true)

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [data-magnetic], input, textarea, select'))
    }

    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    document.addEventListener('mouseover', handleOver)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      document.removeEventListener('mouseover', handleOver)
      setEnabled(false)
    }
  }, [reducedMotion])

  if (reducedMotion || !enabled || !pos.active || !inWindow) return null

  const size = hovering ? 40 : 32

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        rotate: hovering ? 12 : 0,
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.45 }}
    >
      <motion.div
        animate={{ scale: hovering ? 1.12 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <CoinImage size={size} />
      </motion.div>
    </motion.div>
  )
}
