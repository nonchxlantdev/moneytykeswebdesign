import { motion } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { sponsorPrograms } from '@/data/sponsors'
import { staggerContainer, fadeInUp } from '@/animations/variants'

const accentStyles = {
  family: {
    tag: 'bg-accent/20 text-accent-text border-accent/35',
    heading: 'text-primary-text',
    benefitIcon: 'bg-primary/12 text-primary-text',
    benefitsLabel: 'text-primary-text',
  },
  classroom: {
    tag: 'bg-violet-500/12 text-violet-700 dark:text-violet-300 border-violet-500/25',
    heading: 'text-violet-700 dark:text-violet-300',
    benefitIcon: 'bg-violet-500/12 text-violet-700 dark:text-violet-300',
    benefitsLabel: 'text-violet-700 dark:text-violet-300',
  },
} as const

export function Sponsors() {
  return (
    <AnimatedSection id="sponsors">
      <SectionHeading
        badge="Make an Impact"
        title="Your Support. Their Future."
        subtitle="Help us build a financially confident generation. Choose how you'd like to make an impact in a child's life or in a classroom."
      />

      <motion.div
        className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {sponsorPrograms.map((program) => {
          const styles = accentStyles[program.accent]
          return (
            <motion.div key={program.id} variants={fadeInUp}>
              <GlowCard className="overflow-hidden h-full flex flex-col">
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <span
                    className={`inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border mb-4 ${styles.tag}`}
                  >
                    <span aria-hidden>{program.tagIcon}</span>
                    {program.tag}
                  </span>

                  <h3 className="text-xl md:text-2xl font-bold text-ink mb-2">{program.title}</h3>
                  <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-5">
                    {program.description}
                  </p>

                  <div className="rounded-2xl overflow-hidden mb-6 border border-navy/8 dark:border-white/10">
                    <img
                      src={program.image}
                      alt={program.imageAlt}
                      className="w-full aspect-[16/10] object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <p className={`text-[11px] font-bold uppercase tracking-wider mb-4 ${styles.benefitsLabel}`}>
                    Your Support Provides:
                  </p>

                  <ul className="grid grid-cols-2 gap-4">
                    {program.benefits.map((benefit) => {
                      const Icon = benefit.icon
                      return (
                        <li key={benefit.label} className="flex flex-col items-center text-center gap-2">
                          <span
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${styles.benefitIcon}`}
                          >
                            <Icon className="w-5 h-5" aria-hidden />
                          </span>
                          <span className="text-xs sm:text-sm text-ink-muted leading-snug">{benefit.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </GlowCard>
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatedSection>
  )
}
