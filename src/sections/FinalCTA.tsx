import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiArrowRight } from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import { DownloadAppButton } from '@/components/ui/DownloadAppButton'
import { fadeInUp } from '@/animations/variants'
import { PARENT_APP_URL } from '@/data/links'

function Confetti() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#0FAF9C', '#FFD54A', '#3B82F6', '#8B5CF6'][Math.floor(Math.random() * 4)],
    delay: Math.random() * 0.5,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ left: `${p.x}%`, top: '50%', background: p.color }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ y: [-200, 400], opacity: [1, 0], rotate: 720 }}
          transition={{ duration: 2, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export function FinalCTA() {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleClick = useCallback(() => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2500)
  }, [])

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-surface dark:bg-navy border-t border-navy/8 dark:border-white/10 overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 gradient-mesh" />

      {showConfetti && <Confetti />}

      <motion.div
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink dark:text-white mb-4 leading-tight">
          Start Building{' '}
          <span className="text-gradient dark:text-gradient-light">Financially Smart</span>{' '}
          Kids Today.
        </h2>
        <p className="text-lg text-ink-muted dark:text-white/90 mb-8 max-w-xl mx-auto">
          Join thousands of Belizean families teaching the next generation how to earn, save, and spend wisely.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href={PARENT_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            onClick={handleClick}
            className="group"
          >
            Create Parent Account
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <DownloadAppButton size="lg" className="group">
            <FiDownload className="group-hover:scale-110 transition-transform" />
            Download App
          </DownloadAppButton>
        </div>
      </motion.div>
    </section>
  )
}
