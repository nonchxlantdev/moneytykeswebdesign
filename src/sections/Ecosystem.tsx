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
        subtitle="Families, educators, businesses, and institutions working together."
      />

      <motion.div
        className="hidden lg:grid lg:grid-cols-3 gap-3 xl:gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {ecosystemMembers.map((member) => (
          <motion.div key={member.id} variants={fadeInUp}>
            <GlowCard
              className={`p-4 h-full group relative overflow-hidden ${member.comingSoon ? 'opacity-90' : ''}`}
            >
              {member.comingSoon ? (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-ink-subtle border border-navy/15 dark:border-white/20">
                  Soon
                </span>
              ) : null}
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 leading-none" aria-hidden>
                  {member.emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-ink mb-1 pr-12 group-hover:text-primary-text transition-colors leading-snug">
                    {member.title}
                  </h3>
                  <p className="text-ink-muted text-xs leading-relaxed">{member.shortDescription}</p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 gap-4 lg:hidden"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {ecosystemMembers.map((member) => (
          <motion.div key={member.id} variants={fadeInUp}>
            <GlowCard
              className={`p-5 h-full group relative overflow-hidden ${member.comingSoon ? 'opacity-90' : ''}`}
            >
              {member.comingSoon ? (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-transparent text-ink-subtle border border-navy/15 dark:border-white/20">
                  Coming Soon
                </span>
              ) : null}
              <motion.span
                className="text-3xl mb-3 block"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
              >
                {member.emoji}
              </motion.span>
              <h3 className="text-base font-bold text-ink mb-1.5 pr-20 group-hover:text-primary-text transition-colors">
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
