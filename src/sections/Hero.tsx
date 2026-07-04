import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiArrowRight, FiDownload } from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import { DownloadAppButton } from '@/components/ui/DownloadAppButton'
import { GlowingOrbs, FloatingParticles } from '@/components/ui/BackgroundEffects'
import { HeroKidsPhotoBackground, HeroKidsPhotoMobile } from '@/components/ui/HeroKidsPhotoBackground'
import { slideInLeft } from '@/animations/variants'
import { isTouchDevice } from '@/hooks/useDevice'
import { PARENT_APP_URL } from '@/data/links'
import { BelizeHeroBadge } from '@/components/ui/BelizeHeroBadge'

const touchMotion = isTouchDevice() ? 'visible' : 'hidden'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative max-sm:min-h-0 sm:min-h-[100dvh] sm:min-h-screen flex items-start lg:items-center overflow-hidden gradient-mesh"
    >
      <HeroKidsPhotoBackground sectionRef={sectionRef} />
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <GlowingOrbs />
        <FloatingParticles />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-[5.5rem] sm:pt-28 pb-8 sm:pb-16 relative z-10 w-full flex flex-col">
        <motion.div
          variants={slideInLeft}
          initial={touchMotion}
          animate="visible"
          className="max-w-md sm:max-w-lg lg:max-w-[27rem] xl:max-w-[29rem] max-lg:hero-copy-panel max-lg:rounded-2xl max-lg:px-4 max-lg:py-5 sm:max-lg:px-5 sm:max-lg:py-6 lg:hero-copy-panel lg:rounded-3xl lg:px-7 lg:py-8 xl:px-8 xl:py-9"
        >
          <BelizeHeroBadge />

          <h1 className="text-[1.85rem] leading-[1.12] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-ink mb-3 sm:mb-4">
            Financial Literacy Starts Young.{' '}
            <span className="text-gradient">Confidence</span> Lasts a Lifetime.
          </h1>

          <p className="text-[0.95rem] sm:text-lg md:text-xl text-ink leading-relaxed mb-6 sm:mb-7 max-lg:hero-readable-muted">
            Money Tykes® is Belize&apos;s financial literacy platform for children ages 5–17, helping families and schools build lifelong financial knowledge, confidence, and responsible money habits through engaging, parent-guided learning experiences.
          </p>

          <div className="lg:hidden flex flex-col gap-2.5">
            <Button
              href={PARENT_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              className="group w-full !px-4 !py-3.5 !text-sm min-h-[48px]"
              magnetic={false}
            >
              Parent Sign Up
              <FiArrowRight className="group-hover:translate-x-1 transition-transform shrink-0" />
            </Button>
            <DownloadAppButton
              size="md"
              variant="secondary"
              magnetic={false}
              className="w-full !px-4 !py-3.5 !text-sm min-h-[48px] justify-center"
            >
              <FiDownload className="text-base shrink-0" />
              Download App
            </DownloadAppButton>
            <Button
              variant="secondary"
              size="md"
              className="group relative w-full !px-4 !py-3.5 !text-sm min-h-[48px] ring-2 ring-accent/60 shadow-[0_0_20px_rgba(255,213,74,0.4)]"
              magnetic={false}
            >
              <FiPlay className="group-hover:scale-110 transition-transform shrink-0 text-sm" />
              <span className="flex items-baseline gap-1 whitespace-nowrap">
                Dance Challenge
                <span className="text-[11px] sm:text-xs font-bold tracking-wide opacity-90">#comingsoon</span>
              </span>
            </Button>

            <HeroKidsPhotoMobile />
          </div>

          <div className="hidden lg:flex flex-wrap items-center gap-3">
            <Button
              href={PARENT_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              className="group shrink-0 !px-5 !py-3 !text-base min-h-[44px]"
              magnetic={false}
            >
              Parent Sign Up
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="group relative shrink-0 !px-4 !py-3 !text-sm min-h-[44px] ring-2 ring-accent/60 shadow-[0_0_20px_rgba(255,213,74,0.4)] hover:shadow-[0_0_28px_rgba(255,213,74,0.55)]"
              magnetic={false}
            >
              <FiPlay className="group-hover:scale-110 transition-transform shrink-0 text-sm" />
              <span className="flex items-baseline gap-1 whitespace-nowrap">
                Dance Challenge
                <span className="text-xs font-bold tracking-wide opacity-90">#comingsoon</span>
              </span>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-navy/20 dark:border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
