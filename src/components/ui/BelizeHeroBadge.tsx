import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { belizeFlagWave } from '@/img'
import { Fireworks, createFireworkBursts, type FireworkBurst } from '@/components/ui/Fireworks'

export function BelizeHeroBadge() {
  const [bursts, setBursts] = useState<FireworkBurst[]>([])
  const lastCelebrate = useRef(0)

  const celebrate = useCallback((clientX: number, clientY: number) => {
    const now = Date.now()
    if (now - lastCelebrate.current < 500) return
    lastCelebrate.current = now

    const next = createFireworkBursts(clientX, clientY)
    setBursts((prev) => [...prev, ...next])

    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !next.some((n) => n.id === b.id)))
    }, 1600)
  }, [])

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    celebrate(e.clientX, e.clientY)
  }

  return (
    <>
      <Fireworks bursts={bursts} />

      <motion.button
        type="button"
        onPointerUp={handlePointerUp}
        className="group relative inline-flex items-center gap-3 pl-2.5 pr-5 py-2 rounded-full glass text-sm font-bold text-primary-text mb-4 touch-manipulation cursor-pointer ring-2 ring-[#CE1126]/25 hover:ring-[#003F87]/35 shadow-[0_4px_22px_rgba(206,17,38,0.18)] hover:shadow-[0_8px_28px_rgba(0,63,135,0.22)] transition-[box-shadow,ring-color] duration-300"
        initial={{ opacity: 0, y: 20, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 320, damping: 22 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Belize flag — tap for fireworks"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#CE1126]/10 via-transparent to-[#003F87]/10 opacity-80 pointer-events-none" />

        <motion.div
          className="relative shrink-0"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.img
            src={belizeFlagWave}
            alt=""
            draggable={false}
            className="h-11 sm:h-12 w-auto object-contain mix-blend-screen dark:mix-blend-normal drop-shadow-[0_6px_16px_rgba(0,63,135,0.45)] select-none"
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          />
          <span className="absolute -inset-2 rounded-full bg-accent/25 blur-lg opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>

        <span className="relative z-10 text-left leading-snug">
          Belize&apos;s #1 Family Fintech Platform
        </span>

        <span className="relative z-10 hidden sm:inline text-[10px] font-extrabold uppercase tracking-wider text-accent-text opacity-0 group-hover:opacity-100 transition-opacity">
          Tap me!
        </span>
      </motion.button>
    </>
  )
}
