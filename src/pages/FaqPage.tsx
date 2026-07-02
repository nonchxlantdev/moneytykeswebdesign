import { useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { faqPageIntro } from '@/data/faq'
import { SUPPORT_EMAIL, privacyHref } from '@/data/links'

const Navbar = lazy(() => import('@/components/layout/Navbar').then((m) => ({ default: m.Navbar })))
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

const FAQ_META =
  'Frequently asked questions about Money Tykes — parent controls, educational rewards, DigiWallet payments, schools, privacy, and compliance.'

export function FaqPage() {
  useEffect(() => {
    document.title = 'Frequently Asked Questions — MoneyTykes'

    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', FAQ_META)

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

      <section className="pt-28 md:pt-32 pb-14 md:pb-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <span className="section-badge">FAQ</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4 md:mb-5">
              Frequently Asked Questions
            </h1>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-10 md:mb-12">
              {faqPageIntro}
            </p>
          </motion.div>

          <FaqAccordion />

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-navy/8 dark:border-white/10"
          >
            <p className="text-sm md:text-base text-ink-muted leading-relaxed">
              Still have questions? Email us at{' '}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-primary-text font-semibold hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>{' '}
              or read our{' '}
              <a
                href={privacyHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-text font-semibold hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
