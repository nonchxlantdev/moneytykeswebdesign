import { useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'
import { termsIntro, termsSections, termsFooter } from '@/data/terms'
import { SUPPORT_EMAIL } from '@/data/links'

const Navbar = lazy(() => import('@/components/layout/Navbar').then((m) => ({ default: m.Navbar })))
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

export function Terms() {
  useEffect(() => {
    document.title = 'Terms & Conditions — MoneyTykes'
    return () => {
      document.title = 'MoneyTykes — Teaching Kids Smart Money Habits'
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
            <span className="section-badge">Legal</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-6">
              Terms &amp; Conditions
            </h1>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-10">
              {termsIntro}
            </p>
          </motion.div>

          <div className="space-y-8">
            {termsSections.map((section, i) => (
              <motion.article
                key={section.title}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.05 * i }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-ink mb-3">{section.title}</h2>
                <p className="text-sm md:text-base text-ink-muted leading-relaxed">{section.body}</p>
              </motion.article>
            ))}

            <motion.article variants={fadeInUp} initial="hidden" animate="visible">
              <h2 className="text-xl md:text-2xl font-bold text-ink mb-3">Contact Us</h2>
              <p className="text-sm md:text-base text-ink-muted leading-relaxed">
                For any questions or concerns, email us at{' '}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-primary-text font-semibold hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>
            </motion.article>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-sm text-ink-subtle border-t border-navy/8 dark:border-white/10 pt-8"
            >
              {termsFooter}
            </motion.p>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
