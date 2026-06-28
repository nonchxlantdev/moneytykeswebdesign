import { motion } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { features } from '@/data/features'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export function Features() {
  return (
    <AnimatedSection id="features">
      <SectionHeading
        badge="Features"
        title="Everything Your Family Needs"
        subtitle="Powerful tools designed for parents who want to raise financially smart kids."
      />

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <motion.div key={feature.id} variants={fadeInUp}>
              <GlowCard className="p-6 h-full group">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="text-white text-xl" />
                </motion.div>
                <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-primary-text transition-colors">
                  {feature.title}
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </GlowCard>
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatedSection>
  )
}
