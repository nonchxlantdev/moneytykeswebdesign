import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { coinIcon } from '@/img'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    document.documentElement.classList.add('has-custom-cursor')

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const leave = () => setVisible(false)

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [data-magnetic], input, textarea, select'))
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseover', handleOver)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseover', handleOver)
    }
  }, [])

  if (!visible) return null

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
      <motion.img
        src={coinIcon}
        alt=""
        draggable={false}
        width={size}
        height={size}
        animate={{ scale: hovering ? 1.12 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="object-contain drop-shadow-[0_2px_10px_rgba(245,185,66,0.5)] select-none"
      />
    </motion.div>
  )
}
