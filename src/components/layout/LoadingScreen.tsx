import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { coinIcon } from '@/img'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const completedRef = useRef(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15 + 8, 100))
    }, 100)

    const timeout = setTimeout(() => {
      if (completedRef.current) return
      completedRef.current = true
      clearInterval(interval)
      setProgress(100)
      onComplete()
    }, 2200)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface dark:bg-navy px-6"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="status"
      aria-live="polite"
      aria-label="Loading MoneyTykes"
    >
      <motion.div
        className="relative mb-6 sm:mb-8 loading-coin-glow"
        animate={reducedMotion ? { scale: [1, 1.04, 1] } : { rotate: 360 }}
        transition={
          reducedMotion
            ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 1.75, repeat: Infinity, ease: 'linear' }
        }
      >
        <img
          src={coinIcon}
          alt=""
          draggable={false}
          className="w-[4.5rem] h-[4.5rem] sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain select-none"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      <h1 className="text-2xl sm:text-3xl font-bold text-ink dark:text-white mb-2">
        Money<span className="text-primary-text">Tykes</span>
      </h1>
      <p className="text-ink-muted dark:text-white/80 text-sm mb-8">Loading financial wisdom...</p>

      <div className="w-44 sm:w-48 h-1 bg-navy/10 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}
