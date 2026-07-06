import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { CoinImage } from '@/components/ui/CoinImage'
import { journeySteps } from '@/data/stats'
import { staggerContainer, fadeInUp } from '@/animations/variants'

function JourneyStepIcon({ stepId, size, className = '' }: { stepId: string; size: number; className?: string }) {
  if (stepId === 'earn') {
    return <CoinImage size={size} className={`inline-block ${className}`.trim()} />
  }
  const step = journeySteps.find((s) => s.id === stepId)
  return <span className={className}>{step?.icon}</span>
}

export function FamilyJourney() {
  const [activeStep, setActiveStep] = useState(0)
  const step = journeySteps[activeStep]

  return (
    <AnimatedSection id="journey" className="bg-surface-secondary dark:bg-navy-light/30">
      <SectionHeading
        badge="How It Works"
        title="The Interactive Family Experience"
        subtitle="See how a simple chore becomes a powerful financial lesson."
      />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-6 lg:hidden"
      >
        <div
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin"
          role="tablist"
          aria-label="Family journey steps"
        >
          {journeySteps.map((item, i) => {
            const selected = activeStep === i
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveStep(i)}
                className={`shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl border text-left transition-all duration-200 ${
                  selected
                    ? 'bg-primary text-white border-primary shadow-[0_2px_12px_rgba(15,175,156,0.3)]'
                    : 'bg-white/70 dark:bg-white/5 border-navy/10 dark:border-white/10 text-ink-muted hover:border-primary/25'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-base shrink-0 ${
                    selected ? 'bg-white/20' : 'bg-navy/5 dark:bg-white/10'
                  }`}
                >
                  <JourneyStepIcon stepId={item.id} size={22} />
                </span>
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">{item.label}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:hidden mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <GlowCard className="p-5 text-center">
              <div className="flex justify-center mb-2">
                <JourneyStepIcon stepId={step.id} size={36} />
              </div>
              <h3 className="font-bold text-ink mb-1">{step.label}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{step.description}</p>
            </GlowCard>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] gap-6 lg:gap-8 items-start"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <div className="space-y-2 lg:space-y-1.5">
          {journeySteps.map((item, i) => (
            <motion.button
              key={item.id}
              variants={fadeInUp}
              type="button"
              className={`w-full text-left p-3 lg:p-2.5 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                activeStep === i
                  ? 'card-light premium-shadow border-primary/30 border bg-primary/5'
                  : 'hover:bg-white dark:hover:bg-white/5 border border-transparent'
              }`}
              onClick={() => setActiveStep(i)}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-navy/5 dark:bg-white/10">
                <JourneyStepIcon stepId={item.id} size={24} className="text-xl" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink text-sm lg:text-[0.9rem]">{item.label}</p>
                <p className="text-xs text-ink-muted leading-snug line-clamp-1 lg:line-clamp-none">
                  {item.description}
                </p>
              </div>
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeStep === i ? 'bg-primary text-white' : 'bg-navy/5 dark:bg-white/10 text-ink-subtle'
                }`}
              >
                {i + 1}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="lg:sticky lg:top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <GlowCard className="p-6 lg:p-5 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary-text mb-3">
                  Step {activeStep + 1} of {journeySteps.length}
                </p>
                <div className="flex justify-center mb-3">
                  <JourneyStepIcon stepId={step.id} size={40} />
                </div>
                <h3 className="font-bold text-ink text-lg mb-2">{step.label}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{step.description}</p>
              </GlowCard>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
