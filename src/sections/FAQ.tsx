import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { faqItems } from '@/data/faq'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1')

  return (
    <AnimatedSection id="faq">
      <SectionHeading
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about MoneyTykes."
      />

      <motion.div
        className="max-w-3xl mx-auto space-y-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {faqItems.map((item) => {
          const isOpen = openId === item.id
          return (
            <motion.div key={item.id} variants={fadeInUp}>
              <button
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                  isOpen ? 'glass premium-shadow glow-primary' : 'bg-surface-secondary dark:bg-navy-light/50 hover:bg-white dark:hover:bg-navy-light'
                }`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-ink dark:text-white">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isOpen ? 'bg-primary text-white' : 'bg-navy/5 dark:bg-white/10 text-ink-subtle'
                    }`}
                  >
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </motion.div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-ink-muted dark:text-white/85 text-sm leading-relaxed mt-4 pr-12">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatedSection>
  )
}
