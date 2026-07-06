import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { fadeInUp } from '@/animations/variants'
import { KidsDashboardPanel } from '@/sections/KidsDashboard'
import { ParentDashboardPanel } from '@/sections/ParentDashboard'

type DashboardTab = 'kids' | 'parent'

const tabs: { id: DashboardTab; label: string; description: string }[] = [
  {
    id: 'kids',
    label: 'Kids Dashboard',
    description: 'A gamified view that keeps children engaged while building practical financial skills.',
  },
  {
    id: 'parent',
    label: 'Parent Dashboard',
    description:
      'Monitor spending, approve transactions, and track growth. Approved spending is deducted from the parent wallet.',
  },
]

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('kids')
  const activeDescription = tabs.find((t) => t.id === activeTab)?.description ?? tabs[0].description

  return (
    <AnimatedSection id="dashboard" className="bg-surface-secondary dark:bg-navy-light/30">
      <SectionHeading
        badge="App Preview"
        title="See Money Tykes in Action"
        subtitle="Switch between the kids and parent experiences."
      />

      <motion.div
        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 lg:mb-5"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        role="tablist"
        aria-label="Dashboard preview"
      >
        {tabs.map((tab) => {
          const selected = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`dashboard-panel-${tab.id}`}
              id={`dashboard-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                selected
                  ? 'bg-primary text-white border-primary shadow-[0_2px_14px_rgba(15,175,156,0.35)]'
                  : 'bg-white/60 dark:bg-white/5 text-ink-muted border-navy/10 dark:border-white/10 hover:border-primary/30 hover:text-primary-text'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </motion.div>

      <motion.p
        key={activeTab}
        className="text-sm md:text-base text-ink-muted mb-6 lg:mb-5 max-w-2xl"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeDescription}
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id={`dashboard-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`dashboard-tab-${activeTab}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'kids' ? <KidsDashboardPanel /> : <ParentDashboardPanel />}
        </motion.div>
      </AnimatePresence>
    </AnimatedSection>
  )
}
