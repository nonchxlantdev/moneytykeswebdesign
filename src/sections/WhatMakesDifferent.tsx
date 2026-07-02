import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import {
  differentiatorIntro,
  differentiatorItems,
  differentiatorClosing,
} from '@/data/about'
import { fadeInUp } from '@/animations/variants'

export function WhatMakesDifferent() {
  return (
    <AnimatedSection id="what-makes-different">
      <SectionHeading
        badge="What Makes Money Tykes Different"
        title="Experience Money, Don't Just Learn About It"
      />

      <motion.div
        className="max-w-3xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <GlowCard className="p-6 md:p-10">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-ink text-center mb-8 leading-relaxed md:whitespace-nowrap">
            {differentiatorIntro}
          </p>

          <p className="text-sm font-semibold uppercase tracking-wider text-ink-subtle mb-4">
            Children learn by:
          </p>
          <ul className="space-y-3 mb-8">
            {differentiatorItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink-muted text-sm md:text-base leading-relaxed">
                <span className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <FiCheck className="text-primary-text text-sm" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-base md:text-lg text-ink-muted text-center leading-relaxed border-t border-navy/8 dark:border-white/10 pt-6">
            {differentiatorClosing}
          </p>
        </GlowCard>
      </motion.div>
    </AnimatedSection>
  )
}
