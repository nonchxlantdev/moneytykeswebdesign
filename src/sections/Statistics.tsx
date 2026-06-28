import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/SectionHeading'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { stats } from '@/data/stats'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export function Statistics() {
  return (
    <AnimatedSection
      compact
      className="bg-surface-secondary dark:bg-navy border-y border-navy/8 dark:border-white/10 relative overflow-hidden"
    >
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={fadeInUp} className="text-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient dark:text-gradient-light mb-1">
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                duration={2.5}
              />
            </p>
            <p className="text-ink-muted dark:text-white/85 text-sm md:text-base font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  )
}
