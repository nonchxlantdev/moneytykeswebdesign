import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { plansFaqItems } from '@/data/plans'
import { fadeInUp } from '@/animations/variants'

export function PlansFAQ() {
  const [openId, setOpenId] = useState<string | null>(plansFaqItems[0]?.id ?? null)

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }, [])

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {plansFaqItems.map((item, i) => {
        const isOpen = openId === item.id
        return (
          <motion.div
            key={item.id}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              type="button"
              className={`w-full text-left p-5 rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isOpen
                  ? 'glass premium-shadow glow-primary'
                  : 'bg-surface-secondary dark:bg-navy-light/50 hover:bg-white dark:hover:bg-navy-light'
              }`}
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggle(item.id)
                }
              }}
              aria-expanded={isOpen}
              aria-controls={`plans-faq-panel-${item.id}`}
              id={`plans-faq-trigger-${item.id}`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-ink dark:text-white">{item.question}</h3>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isOpen ? 'bg-primary text-white' : 'bg-navy/5 dark:bg-white/10 text-ink-subtle'
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? <FiMinus /> : <FiPlus />}
                </motion.div>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`plans-faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`plans-faq-trigger-${item.id}`}
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
    </div>
  )
}
