import { useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { Button } from '@/components/ui/Button'
import { DownloadAppButton } from '@/components/ui/DownloadAppButton'
import { GlowCard } from '@/components/ui/GlowCard'
import { CoinImage } from '@/components/ui/CoinImage'
import {
  storyPageMeta,
  storyIntro,
  storyBodyParagraphs,
  storyMoments,
  storyClosing,
  missionCopy,
  visionCopy,
  storyValues,
  founderParagraphs,
  founderHighlights,
  founderClosing,
  founderName,
  founderTitle,
  founderOrg,
  promiseCopy,
  promiseClosing,
  storyTagline,
  storyNavSections,
} from '@/data/story'
import { plansHref } from '@/data/links'
import { founderSham } from '@/img'

const Navbar = lazy(() => import('@/components/layout/Navbar').then((m) => ({ default: m.Navbar })))
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-10 md:py-12" aria-hidden>
      <span className="text-ink-subtle dark:text-white/25 text-lg tracking-widest">⸻</span>
    </div>
  )
}

function StorySectionNav({ variant }: { variant: 'sidebar' | 'mobile' }) {
  if (variant === 'sidebar') {
    return (
      <nav className="story-sidebar-nav" aria-label="On this page">
        <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle mb-4 text-center lg:text-left">
          On this page
        </p>
        <ul className="flex flex-col gap-0.5 border-l-2 border-navy/10 dark:border-white/10">
          {storyNavSections.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="story-sidebar-link block pl-4 py-2 text-sm font-medium text-ink-muted hover:text-primary-text border-l-2 border-transparent -ml-[2px] transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <nav
      className="lg:hidden mb-8 p-4 rounded-2xl bg-navy/[0.03] dark:bg-white/5 border border-navy/8 dark:border-white/10"
      aria-label="On this page"
    >
      <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle mb-3">On this page</p>
      <ul className="flex flex-wrap gap-2">
        {storyNavSections.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-block px-3 py-1.5 text-sm font-medium text-ink-muted hover:text-primary-text rounded-lg hover:bg-primary/8 transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function OurStory() {
  useEffect(() => {
    document.title = 'Our Story — MoneyTykes'

    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', storyPageMeta)

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

      <article className="pt-28 md:pt-32 pb-14 md:pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-[10.5rem_minmax(0,1fr)] xl:grid-cols-[11.5rem_minmax(0,1fr)] lg:gap-10 xl:gap-14">
            <aside className="hidden lg:block relative">
              <StorySectionNav variant="sidebar" />
            </aside>

            <div className="min-w-0 max-w-3xl lg:max-w-none">
              <StorySectionNav variant="mobile" />

              <motion.header
                className="mb-8 md:mb-10"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <span className="section-badge">Our Story</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
                  Born in Belize, Built for Families
                </h1>
              </motion.header>

              <motion.section
                id="founder"
                className="scroll-mt-28 md:scroll-mt-32"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-xl md:text-2xl font-bold text-ink mb-6">A Message From Our Founder</h2>

                <div className="grid md:grid-cols-[minmax(200px,220px)_1fr] lg:grid-cols-[minmax(220px,240px)_1fr] gap-6 md:gap-8 items-start">
                  <figure className="mx-auto md:mx-0 w-full max-w-[240px] md:max-w-none md:sticky md:top-32">
                    <div className="relative rounded-2xl overflow-hidden premium-shadow ring-1 ring-navy/10 dark:ring-white/10 bg-surface-secondary dark:bg-navy-light/40">
                      <div
                        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-primary/80 to-accent z-10"
                        aria-hidden
                      />
                      <img
                        src={founderSham}
                        alt="Shamira Young, Founder of Money Tykes"
                        className="w-full aspect-[3/4] object-cover object-[center_18%]"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="mt-4 text-center md:text-left">
                      <p className="font-bold text-ink text-lg leading-tight">{founderName}</p>
                      <p className="text-sm text-ink-muted mt-0.5">{founderTitle}</p>
                      <p className="text-sm text-primary-text font-semibold">{founderOrg}</p>
                    </figcaption>
                  </figure>

                  <div className="min-w-0 space-y-5 text-base md:text-lg text-ink-muted leading-relaxed">
                    {founderParagraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}

                    <div className="pt-3 md:pt-5 space-y-2">
                      {founderHighlights.map((line) => (
                        <p key={line} className="text-lg md:text-xl font-semibold text-ink">
                          {line}
                        </p>
                      ))}
                    </div>

                    {founderClosing.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </motion.section>

              <SectionDivider />

              <motion.section
                id="story"
                className="scroll-mt-28 md:scroll-mt-32"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="section-badge">Our Story</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-ink mb-6">
                  Preparing Children for Life Through Financial Education
                </h2>
                <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-8">{storyIntro}</p>
              </motion.section>

              <motion.div
                className="space-y-5 text-base md:text-lg text-ink-muted leading-relaxed"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {storyBodyParagraphs.map((paragraph) => (
                  <motion.p key={paragraph.slice(0, 48)} variants={fadeInUp}>
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>

              <motion.div
                className="my-10 md:my-14 py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-surface-secondary dark:bg-navy-light/30 border border-navy/8 dark:border-white/10"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ul className="space-y-4 md:space-y-5 mb-6 max-w-prose mx-auto">
                  {storyMoments.map((line) => (
                    <li key={line} className="flex items-start gap-3 md:gap-4">
                      <CoinImage
                        size={32}
                        className="shrink-0 mt-0.5 md:mt-1"
                        aria-hidden
                      />
                      <p className="text-lg md:text-xl font-semibold text-ink leading-snug">{line}</p>
                    </li>
                  ))}
                </ul>
                <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-prose mx-auto">
                  {storyClosing}
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div id="mission" className="scroll-mt-28 md:scroll-mt-32 h-full" variants={fadeInUp}>
                  <GlowCard className="p-6 md:p-8 h-full">
                    <span className="section-badge mb-4">Our Mission</span>
                    <p className="text-ink-muted text-sm md:text-base leading-relaxed">{missionCopy}</p>
                  </GlowCard>
                </motion.div>
                <motion.div id="vision" className="scroll-mt-28 md:scroll-mt-32 h-full" variants={fadeInUp}>
                  <GlowCard className="p-6 md:p-8 h-full">
                    <span className="section-badge mb-4">Our Vision</span>
                    <p className="text-ink-muted text-sm md:text-base leading-relaxed">{visionCopy}</p>
                  </GlowCard>
                </motion.div>
              </motion.div>

              <SectionDivider />

              <motion.section
                id="values"
                className="scroll-mt-28 md:scroll-mt-32"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-ink mb-6 md:mb-8">Our Values</h2>
                <motion.div
                  className="grid sm:grid-cols-2 gap-4 md:gap-5"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {storyValues.map((value) => (
                    <motion.div key={value.id} variants={fadeInUp}>
                      <GlowCard className="p-5 md:p-6 h-full">
                        <h3 className="font-bold text-ink mb-2">{value.title}</h3>
                        <p className="text-sm md:text-base text-ink-muted leading-relaxed">{value.description}</p>
                      </GlowCard>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              <SectionDivider />

              <motion.section
                id="promise"
                className="scroll-mt-28 md:scroll-mt-32 relative overflow-hidden rounded-3xl p-8 md:p-12 text-center border border-primary/20 bg-gradient-to-br from-primary/8 via-surface to-accent/10 dark:from-primary/15 dark:via-navy dark:to-accent/10"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 gradient-mesh opacity-40 pointer-events-none" aria-hidden />
                <div className="relative z-10">
                  <span className="section-badge mb-4">Our Promise</span>
                  <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-4 max-w-prose mx-auto">
                    {promiseCopy}
                  </p>
                  <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-6 max-w-prose mx-auto">
                    {promiseClosing}
                  </p>
                  <p className="text-2xl md:text-3xl font-extrabold text-gradient dark:text-gradient-light mb-8">
                    {storyTagline}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button href={plansHref()} size="lg" className="group">
                      View Plans
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <DownloadAppButton size="lg" variant="secondary" magnetic={false}>
                      Download App
                    </DownloadAppButton>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </article>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
