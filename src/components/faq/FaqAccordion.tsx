import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { FaqAnswer } from '@/components/faq/FaqAnswer'
import { faqSections, type FaqItem } from '@/data/faq'
import { fadeInUp } from '@/animations/variants'

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      className={`w-full text-left p-5 rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        isOpen
          ? 'glass premium-shadow glow-primary'
          : 'bg-surface-secondary dark:bg-navy-light/50 hover:bg-white dark:hover:bg-navy-light'
      }`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${item.id}`}
      id={`faq-trigger-${item.id}`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-ink dark:text-white text-left">{item.question}</h3>
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
            id={`faq-panel-${item.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pr-4 sm:pr-12">
              <FaqAnswer item={item} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(faqSections[0]?.items[0]?.id ?? null)

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }, [])

  return (
    <div className="space-y-10 md:space-y-12">
      {faqSections.map((section, sectionIndex) => (
        <motion.section
          key={section.id}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: sectionIndex * 0.03 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-ink mb-4 pb-3 border-b border-navy/10 dark:border-white/10">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.items.map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  )
}
