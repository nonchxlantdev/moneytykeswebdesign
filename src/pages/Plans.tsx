import { useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { fadeInUp } from '@/animations/variants'
import { Button } from '@/components/ui/Button'
import { PricingCard } from '@/components/plans/PricingCard'
import { PlansFAQ } from '@/components/plans/PlansFAQ'
import { pricingPlans, plansTrustItems } from '@/data/plans'
import { PARENT_APP_URL } from '@/data/links'

const Navbar = lazy(() => import('@/components/layout/Navbar').then((m) => ({ default: m.Navbar })))
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

const PLANS_META =
  'Choose the MoneyTykes plan that fits your family. Start free or unlock everything with the Family Control Plan.'

export function Plans() {
  useEffect(() => {
    document.title = 'Plans & Pricing — MoneyTykes'

    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', PLANS_META)

    return () => {
      document.title = 'MoneyTykes — Teaching Kids Smart Money Habits'
      meta?.setAttribute('content', previous)
    }
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-surface"
    >
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-10 md:pb-14 px-4 md:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <span className="section-badge">Plans & Subscriptions</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4 md:mb-5">
            Simple Plans for Every Family
          </h1>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto">
            Start free, upgrade when you&apos;re ready. All plans include parent controls and a safe
            learning environment for your kids.
          </p>
        </motion.div>
      </section>

      {/* Pricing cards */}
      <section className="pb-12 md:pb-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-10 md:py-12 px-4 md:px-8 border-y border-navy/8 dark:border-white/10 bg-surface-secondary/50 dark:bg-navy-light/20">
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plansTrustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                {item.icon}
              </span>
              <p className="font-semibold text-ink text-sm md:text-base">{item.title}</p>
              <p className="text-ink-muted text-sm leading-relaxed max-w-[220px]">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-16 px-4 md:px-8">
        <motion.div
          className="text-center mb-8 md:mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">Questions?</h2>
        </motion.div>
        <PlansFAQ />
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-16 md:py-20 px-4 md:px-8 bg-primary text-white">
        <div className="absolute inset-0 opacity-20 gradient-mesh pointer-events-none" />
        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Ready to raise money-smart kids?
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Join families across Belize already using MoneyTykes.
          </p>
          <Button
            href={PARENT_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="group"
            magnetic={false}
          >
            Create Parent Account
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
