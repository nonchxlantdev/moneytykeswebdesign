import { motion } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { ecosystemMembers } from '@/data/about'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export function Ecosystem() {
  return (
    <AnimatedSection id="ecosystem" className="bg-surface-secondary dark:bg-navy-light/30">
      <SectionHeading
        badge="Partners"
        title="Our Ecosystem"
        subtitle="Families, educators, businesses, and institutions working together to raise financially confident young people."
      />

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {ecosystemMembers.map((member) => (
          <motion.div key={member.id} variants={fadeInUp}>
            <GlowCard
              className={`p-6 h-full group relative overflow-hidden ${
                member.comingSoon ? 'opacity-90' : ''
              }`}
            >
              {member.comingSoon ? (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-transparent text-ink-subtle border border-navy/15 dark:border-white/20">
                  Coming Soon
                </span>
              ) : null}
              <motion.span
                className="text-4xl mb-4 block"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                {member.emoji}
              </motion.span>
              <h3 className="text-lg font-bold text-ink mb-2 pr-24 group-hover:text-primary-text transition-colors">
                {member.title}
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed">{member.description}</p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  )
}
