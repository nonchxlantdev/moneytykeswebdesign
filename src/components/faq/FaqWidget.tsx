import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiHelpCircle, FiMessageCircle, FiSearch, FiX, FiChevronLeft } from 'react-icons/fi'
import { FaqAnswer } from '@/components/faq/FaqAnswer'
import { useFaqWidget } from '@/components/faq/FaqWidgetContext'
import { faqSections, type FaqItem } from '@/data/faq'
import { SUPPORT_EMAIL } from '@/data/links'

function allFaqItems(): { sectionTitle: string; item: FaqItem }[] {
  return faqSections.flatMap((section) =>
    section.items.map((item) => ({ sectionTitle: section.title, item })),
  )
}

export function FaqWidget() {
  const { open, closeFaq, toggleFaq } = useFaqWidget()
  const [query, setQuery] = useState('')
  const [activeSection, setActiveSection] = useState<string | 'all'>('all')
  const [activeItem, setActiveItem] = useState<FaqItem | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const items = useMemo(() => allFaqItems(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(({ sectionTitle, item }) => {
      if (activeSection !== 'all' && sectionTitle !== activeSection) return false
      if (!q) return true
      const haystack = [
        item.question,
        ...(item.paragraphs ?? []),
        item.listIntro ?? '',
        ...(item.bullets ?? []),
        ...(item.listOutro ?? []),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [items, query, activeSection])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeItem) setActiveItem(null)
        else closeFaq()
      }
    }
    document.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => searchRef.current?.focus(), 80)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [open, activeItem, closeFaq])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActiveSection('all')
      setActiveItem(null)
    }
  }, [open])

  return (
    <div className="faq-widget fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-[70] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Frequently asked questions"
            className="pointer-events-auto w-[min(100vw-1.5rem,24rem)] max-h-[min(70vh,34rem)] flex flex-col rounded-2xl bg-white border border-navy/10 shadow-[0_16px_48px_rgba(7,26,45,0.18)] overflow-hidden"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <header className="shrink-0 flex items-center gap-3 px-4 py-3 bg-primary text-white">
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <FiHelpCircle className="text-lg" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm leading-tight">MoneyTykes Help</p>
                <p className="text-[11px] text-white/80 leading-tight">Browse FAQs or search a topic</p>
              </div>
              <button
                type="button"
                onClick={closeFaq}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center touch-manipulation"
                aria-label="Close FAQ panel"
              >
                <FiX className="text-lg" />
              </button>
            </header>

            {activeItem ? (
              <div className="flex-1 min-h-0 flex flex-col">
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-primary-text hover:bg-primary/5 border-b border-navy/8"
                >
                  <FiChevronLeft aria-hidden />
                  Back to questions
                </button>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-primary/10 px-3.5 py-2.5 text-sm font-semibold text-ink">
                    {activeItem.question}
                  </div>
                  <div className="mr-auto max-w-[95%] rounded-2xl rounded-bl-md bg-surface-secondary border border-navy/8 px-3.5 py-3">
                    <FaqAnswer item={activeItem} />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="shrink-0 px-3 pt-3 pb-2 border-b border-navy/8">
                  <label className="relative block">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" aria-hidden />
                    <input
                      ref={searchRef}
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search FAQs..."
                      className="w-full rounded-xl border border-navy/12 bg-surface-secondary pl-9 pr-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                    <button
                      type="button"
                      onClick={() => setActiveSection('all')}
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        activeSection === 'all'
                          ? 'bg-primary text-white'
                          : 'bg-navy/5 text-ink-muted hover:bg-navy/10'
                      }`}
                    >
                      All
                    </button>
                    {faqSections.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setActiveSection(section.title)}
                        className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${
                          activeSection === section.title
                            ? 'bg-primary text-white'
                            : 'bg-navy/5 text-ink-muted hover:bg-navy/10'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0">
                  {filtered.length === 0 ? (
                    <p className="px-4 py-8 text-sm text-ink-muted text-center">
                      No matches. Try another search, or email{' '}
                      <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-text font-semibold underline">
                        {SUPPORT_EMAIL}
                      </a>
                      .
                    </p>
                  ) : (
                    <ul className="divide-y divide-navy/8">
                      {filtered.map(({ item }) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => setActiveItem(item)}
                            className="w-full text-left px-4 py-3.5 text-sm font-medium text-ink hover:bg-primary/5 transition-colors"
                          >
                            {item.question}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <footer className="shrink-0 px-4 py-2.5 border-t border-navy/8 text-[11px] text-ink-subtle text-center">
                  Still stuck?{' '}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary-text font-semibold hover:underline">
                    Email support
                  </a>
                </footer>
              </>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleFaq}
        className="pointer-events-auto w-14 h-14 rounded-full bg-primary text-white shadow-[0_8px_28px_rgba(15,175,156,0.45)] hover:bg-primary-dark flex items-center justify-center touch-manipulation transition-colors"
        aria-label={open ? 'Close FAQ panel' : 'Open FAQ help'}
        aria-expanded={open}
      >
        {open ? <FiX className="text-2xl" /> : <FiMessageCircle className="text-2xl" />}
      </button>
    </div>
  )
}
