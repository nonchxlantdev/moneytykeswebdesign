import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/SectionHeading'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { stats } from '@/data/stats'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export function Statistics() {
  return (
    <AnimatedSection
      compact
      className="bg-surface-secondary dark:bg-navy border-y border-navy/8 dark:border-white/10 relative overflow-hidden !py-6 md:!py-8"
    >
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 max-w-5xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={fadeInUp} className="text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gradient dark:text-gradient-light mb-0.5">
              {stat.display ?? (
                <AnimatedCounter
                  end={stat.value ?? 0}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={2.5}
                />
              )}
            </p>
            <p className="text-ink-muted dark:text-white/85 text-xs sm:text-sm font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  )
}
