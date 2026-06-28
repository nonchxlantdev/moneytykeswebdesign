import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function octagonPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i - Math.PI / 8
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')
}

function BelizeCoin({ size = 28 }: { size?: number }) {
  const r = size / 2
  const cx = r
  const cy = r
  const outer = octagonPoints(cx, cy, r - 1)
  const inner = octagonPoints(cx, cy, r - 4)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <polygon points={outer} fill="#312e81" />
      <polygon points={inner} fill="#f5b942" />
      <polygon
        points={octagonPoints(cx, cy, r - 6)}
        fill="#e8941a"
        opacity="0.45"
        transform={`rotate(12 ${cx} ${cy})`}
      />
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#312e81"
        fontSize={size * 0.38}
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        $
      </text>
    </svg>
  )
}

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

  const size = hovering ? 34 : 28

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        rotate: hovering ? 18 : 0,
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.45 }}
    >
      <motion.div
        animate={{ scale: hovering ? 1.15 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="drop-shadow-[0_2px_8px_rgba(245,185,66,0.45)]"
      >
        <BelizeCoin size={size} />
      </motion.div>
    </motion.div>
  )
}
