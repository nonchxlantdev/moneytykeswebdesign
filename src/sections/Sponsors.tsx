import { motion } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { sponsorTiers } from '@/data/sponsors'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export function Sponsors() {
  return (
    <AnimatedSection id="sponsors">
      <SectionHeading
        badge="Sponsors"
        title="Invest in Belize's Future"
        subtitle="Join leading organizations supporting financial literacy for the next generation."
      />

      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-10 lg:mb-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {sponsorTiers.map((tier) => (
          <motion.div key={tier.id} variants={fadeInUp}>
            <GlowCard className="overflow-hidden h-full">
              <div className={`bg-gradient-to-br ${tier.color} p-6 text-center`}>
                <span className="text-4xl">{tier.icon}</span>
                <h3
                  className={`text-2xl font-bold mt-2 ${
                    tier.id === 'silver' ? 'text-white' : 'text-ink dark:text-white'
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`font-semibold ${
                    tier.id === 'silver' ? 'text-white/90' : 'text-ink-muted dark:text-white/85'
                  }`}
                >
                  <AnimatedCounter
                    end={parseInt(tier.amount.replace(/[^0-9]/g, ''))}
                    prefix="$"
                    suffix="+"
                    className="text-2xl"
                  />
                </p>
              </div>
              <ul className="p-6 space-y-3">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  )
}
