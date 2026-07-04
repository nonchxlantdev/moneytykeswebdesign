import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
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

  return (
    <AnimatedSection id="journey" className="bg-surface-secondary dark:bg-navy-light/30">
      <SectionHeading
        badge="How It Works"
        title="The Interactive Family Experience"
        subtitle="Watch how a simple chore becomes a powerful financial lesson — click each step to see the flow."
      />

      <motion.div
        className="grid lg:grid-cols-2 gap-12 items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="space-y-3">
          {journeySteps.map((step, i) => (
            <motion.button
              key={step.id}
              variants={fadeInUp}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
                activeStep === i
                  ? 'card-light premium-shadow glow-primary border-primary/40 border'
                  : 'hover:bg-white dark:hover:bg-white/5 border border-transparent'
              }`}
              onClick={() => setActiveStep(i)}
            >
              <motion.span
                className="inline-flex items-center justify-center w-9 h-9 shrink-0"
                animate={activeStep === i ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <JourneyStepIcon stepId={step.id} size={30} className="text-3xl" />
              </motion.span>
              <div>
                <p className="font-semibold text-ink">{step.label}</p>
                <p className="text-sm text-ink-muted">{step.description}</p>
              </div>
              <span className={`ml-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                activeStep === i ? 'bg-primary text-white' : 'bg-navy/5 dark:bg-white/10 text-ink-subtle'
              }`}>
                {i + 1}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <div className="aspect-square max-w-md mx-auto relative">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              {journeySteps.map((_, i) => {
                if (i === journeySteps.length - 1) return null
                const angle1 = (i / journeySteps.length) * Math.PI * 2 - Math.PI / 2
                const angle2 = ((i + 1) / journeySteps.length) * Math.PI * 2 - Math.PI / 2
                const r = 150
                const x1 = 200 + Math.cos(angle1) * r
                const y1 = 200 + Math.sin(angle1) * r
                const x2 = 200 + Math.cos(angle2) * r
                const y2 = 200 + Math.sin(angle2) * r
                return (
                  <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={i < activeStep ? '#0FAF9C' : 'rgba(7,26,45,0.1)'}
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: i < activeStep ? 1 : 0.3 }}
                    transition={{ duration: 0.5 }}
                  />
                )
              })}
            </svg>

            {journeySteps.map((step, i) => {
              const angle = (i / journeySteps.length) * Math.PI * 2 - Math.PI / 2
              const r = 150
              const x = 200 + Math.cos(angle) * r
              const y = 200 + Math.sin(angle) * r
              return (
                <motion.button
                  key={step.id}
                  className={`absolute w-14 h-14 -ml-7 -mt-7 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                    activeStep === i ? 'bg-primary shadow-lg glow-primary scale-125' : 'bg-white dark:bg-navy-light premium-shadow'
                  }`}
                  style={{ left: `${(x / 400) * 100}%`, top: `${(y / 400) * 100}%` }}
                  onClick={() => setActiveStep(i)}
                  whileHover={{ scale: 1.15 }}
                >
                  <JourneyStepIcon stepId={step.id} size={28} />
                </motion.button>
              )
            })}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center p-6 rounded-3xl card-light premium-shadow max-w-[200px]">
                  <div className="flex justify-center mb-2">
                    <JourneyStepIcon stepId={journeySteps[activeStep].id} size={40} />
                  </div>
                  <p className="font-bold text-ink">{journeySteps[activeStep].label}</p>
                  <p className="text-xs text-ink-muted mt-1">{journeySteps[activeStep].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
