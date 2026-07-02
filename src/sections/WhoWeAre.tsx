import { motion } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { whoWeAreCopy, missionCopy, visionCopy } from '@/data/about'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export function WhoWeAre() {
  const paragraphs = whoWeAreCopy.split('\n\n')

  return (
    <AnimatedSection id="who-we-are" className="bg-surface-secondary dark:bg-navy-light/30">
      <SectionHeading badge="Who We Are" title="Belize's Youth Financial Literacy Ecosystem" />

      <motion.div
        className="max-w-3xl mx-auto text-center mb-10 md:mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-base md:text-lg leading-relaxed text-ink-muted mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUp}>
          <GlowCard className="p-6 md:p-8 h-full">
            <span className="section-badge mb-4">Our Mission</span>
            <p className="text-ink-muted text-sm md:text-base leading-relaxed">{missionCopy}</p>
          </GlowCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <GlowCard className="p-6 md:p-8 h-full">
            <span className="section-badge mb-4">Our Vision</span>
            <p className="text-ink-muted text-sm md:text-base leading-relaxed">{visionCopy}</p>
          </GlowCard>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
