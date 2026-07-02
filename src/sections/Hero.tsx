import { motion } from 'framer-motion'
import { FiPlay, FiArrowRight } from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import { GlowingOrbs, FloatingParticles } from '@/components/ui/BackgroundEffects'
import { slideInLeft, slideInRight } from '@/animations/variants'
import { isTouchDevice } from '@/hooks/useDevice'
import { logo } from '@/img'
import { PARENT_APP_URL } from '@/data/links'
import { WalletFillScene } from '@/components/easterEgg/WalletFillScene'

const touchMotion = isTouchDevice() ? 'visible' : 'hidden'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden gradient-mesh">
      <GlowingOrbs />
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 grid lg:grid-cols-2 gap-10 items-center relative z-10">
        <motion.div variants={slideInLeft} initial={touchMotion} animate="visible">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-primary-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Belize&apos;s #1 Family Fintech Platform
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-ink leading-[1.1] mb-4">
            Teaching Kids{' '}
            <span className="text-gradient">Smart Money</span>{' '}
            Habits.
          </h1>

          <p className="text-lg md:text-xl text-ink-muted leading-relaxed mb-6 max-w-xl">
            Money Tykes empowers children to build lifelong financial literacy skills through interactive learning, rewards, savings goals, and parent-guided financial experiences.
          </p>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
            <Button
              href={PARENT_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              className="group shrink-0 !px-4 sm:!px-5 !py-3 !text-sm sm:!text-base min-h-[44px]"
            >
              Parent Sign Up
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="group relative shrink-0 !px-3 sm:!px-4 !py-3 !text-xs sm:!text-sm min-h-[44px] ring-2 ring-accent/60 shadow-[0_0_20px_rgba(255,213,74,0.4)] hover:shadow-[0_0_28px_rgba(255,213,74,0.55)]"
              magnetic={false}
            >
              <FiPlay className="group-hover:scale-110 transition-transform shrink-0 text-sm" />
              <span className="flex items-baseline gap-1 whitespace-nowrap">
                Dance Challenge
                <span className="text-[11px] sm:text-xs font-bold tracking-wide opacity-90">#comingsoon</span>
              </span>
            </Button>
          </div>
        </motion.div>

        {/* App preview placeholder — visible on tablet & mobile too (iPad is below lg) */}
        <motion.div
          variants={slideInRight}
          initial={touchMotion}
          animate="visible"
          className="flex items-center justify-center min-h-[220px] sm:min-h-[300px] lg:min-h-[420px] mt-8 sm:mt-10 lg:mt-0 w-full"
        >
          <div className="w-full min-h-[220px] h-[240px] sm:h-[340px] lg:h-[480px] rounded-2xl sm:rounded-3xl border-2 border-dashed border-navy/12 dark:border-white/15 bg-surface-secondary/60 dark:bg-white/5 flex flex-col overflow-hidden">
            <WalletFillScene>
              <img
                id="mt-logo"
                src={logo}
                alt="MoneyTykes"
                className="max-h-32 sm:max-h-40 lg:max-h-[15rem] w-auto max-w-full object-contain"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </WalletFillScene>
            {/* Spain teaser — remove `hidden` to restore */}
            <div className="space-y-1 hidden">
              <p className="text-base sm:text-lg md:text-xl font-bold text-ink leading-snug max-w-sm">
                Spain: Boss I got an idea just wait...
              </p>
              <p className="text-ink-muted text-xs sm:text-sm">App preview launching shortly.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
