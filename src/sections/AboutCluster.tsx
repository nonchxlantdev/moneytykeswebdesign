import { motion } from 'framer-motion'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { Button } from '@/components/ui/Button'
import {
  whoWeAreCopy,
  missionCopy,
  visionCopy,
  differentiatorIntro,
  differentiatorItems,
  differentiatorClosing,
} from '@/data/about'
import { storyHref } from '@/data/links'
import { fadeInUp, staggerContainer } from '@/animations/variants'

export function AboutCluster() {
  return (
    <AnimatedSection id="who-we-are" className="bg-surface-secondary dark:bg-navy-light/30">
      <SectionHeading badge="Who We Are" title="Belize's Youth Financial Literacy Ecosystem" />

      <motion.p
        className="max-w-3xl mx-auto text-center text-base md:text-lg leading-relaxed text-ink-muted mb-8 lg:mb-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {whoWeAreCopy}
      </motion.p>

      <motion.div
        className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUp}>
          <GlowCard className="p-6 md:p-8 h-full">
            <span className="section-badge mb-4">What Makes Us Different</span>
            <p className="text-base lg:text-lg font-semibold text-ink mb-6 leading-relaxed">
              {differentiatorIntro}
            </p>
            <p className="text-sm font-semibold uppercase tracking-wider text-ink-subtle mb-3">
              Children learn by:
            </p>
            <ul className="space-y-2.5 mb-6">
              {differentiatorItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-muted text-sm md:text-base leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <FiCheck className="text-primary-text text-sm" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm md:text-base text-ink-muted leading-relaxed border-t border-navy/8 dark:border-white/10 pt-5">
              {differentiatorClosing}
            </p>
          </GlowCard>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col gap-6">
          <GlowCard className="p-6 md:p-8 flex-1">
            <span className="section-badge mb-4">Our Mission</span>
            <p className="text-ink-muted text-sm md:text-base leading-relaxed">{missionCopy}</p>
          </GlowCard>
          <GlowCard className="p-6 md:p-8 flex-1">
            <span className="section-badge mb-4">Our Vision</span>
            <p className="text-ink-muted text-sm md:text-base leading-relaxed">{visionCopy}</p>
          </GlowCard>
        </motion.div>
      </motion.div>

      <motion.div
        className="text-center mt-8 lg:mt-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Button href={storyHref()} variant="outline" size="lg" className="group">
          Read Our Full Story
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </AnimatedSection>
  )
}
