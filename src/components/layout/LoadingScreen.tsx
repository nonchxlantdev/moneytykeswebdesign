import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const completedRef = useRef(false)

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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface dark:bg-navy"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary border-r-accent flex items-center justify-center text-2xl">
          🪙
        </div>
      </motion.div>

      <h1 className="text-3xl font-bold text-ink dark:text-white mb-2">
        Money<span className="text-primary-text">Tykes</span>
      </h1>
      <p className="text-ink-muted dark:text-white/80 text-sm mb-8">Loading financial wisdom...</p>

      <div className="w-48 h-1 bg-navy/10 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}
