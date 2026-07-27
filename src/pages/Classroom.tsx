import { useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { FiImage } from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import { GlowCard } from '@/components/ui/GlowCard'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import {
  classroomPageMeta,
  classroomIntro,
  classroomFeatures,
  classroomParentCallout,
  classroomLoginPanel,
  classroomImagePlaceholders,
  goToClassroomLogin,
  isClassroomLoginConfigured,
  type ClassroomFeature,
} from '@/data/classroom'

const Navbar = lazy(() => import('@/components/layout/Navbar').then((m) => ({ default: m.Navbar })))
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

function FeatureBadge({ badge }: { badge: NonNullable<ClassroomFeature['badge']> }) {
  const isNew = badge === 'New'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
        isNew
          ? 'bg-amber-400/20 text-amber-800 dark:text-amber-200 border-amber-500/35'
          : 'bg-[color-mix(in_srgb,var(--class-teal)_12%,transparent)] text-[var(--class-teal)] dark:text-[color-mix(in_srgb,var(--class-chalk)_90%,#5eead4)] border-[color-mix(in_srgb,var(--class-teal)_30%,transparent)]'
      }`}
    >
      {badge}
    </span>
  )
}

function ScreenshotPlaceholder({
  heading,
  caption,
  alt,
}: {
  heading: string
  caption: string
  alt: string
}) {
  return (
    <div
      className="w-full max-w-4xl mx-auto aspect-video rounded-2xl border-2 border-dashed border-[color-mix(in_srgb,var(--class-teal)_22%,transparent)] dark:border-white/20 bg-[color-mix(in_srgb,var(--class-chalk)_35%,var(--surface-card))] dark:bg-white/5 flex flex-col items-center justify-center gap-3 px-6 text-center"
      role="img"
      aria-label={alt}
    >
      <FiImage className="text-3xl text-[var(--class-teal)] dark:text-[var(--class-chalk)] opacity-70" aria-hidden />
      <p className="text-base font-bold text-ink">{heading}</p>
      <p className="text-sm text-ink-muted max-w-md leading-relaxed">{caption}</p>
    </div>
  )
}

function LoginButton({ className = '' }: { className?: string }) {
  const ready = isClassroomLoginConfigured()
  return (
    <Button
      variant="primary"
      onClick={goToClassroomLogin}
      disabled={!ready}
      magnetic={ready}
      className={`${ready ? '' : 'opacity-50 cursor-not-allowed'} ${className}`.trim()}
    >
      Log In
    </Button>
  )
}

export function Classroom() {
  useEffect(() => {
    document.title = 'MoneyTykes Classroom | MoneyTykes'

    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', classroomPageMeta)

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

      <div className="pt-28 md:pt-32 pb-8">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-badge">MoneyTykes Classroom</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4 md:mb-5">
              A money smart dashboard built for your classroom
            </h1>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-8 md:mb-10">
              {classroomPageMeta}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <LoginButton />
              <Button
                variant="outline"
                href="#classroom-features"
                target="_self"
                rel="noopener"
              >
                See what is inside
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection compact>
          {/* Swap this placeholder for a real screenshot of the MoneyTykes Classroom login screen (src/pages/LoginPage.jsx in the dashboard repo) once one is available. */}
          <ScreenshotPlaceholder
            heading={classroomImagePlaceholders.login.heading}
            caption={classroomImagePlaceholders.login.caption}
            alt={classroomImagePlaceholders.login.alt}
          />
        </AnimatedSection>

        <AnimatedSection>
          <SectionHeading title="What is MoneyTykes Classroom" subtitle={classroomIntro} />
        </AnimatedSection>

        <AnimatedSection id="classroom-features">
          <SectionHeading
            badge="Built for teachers"
            title="Everything your day needs, already built"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {classroomFeatures.map((feature) => (
              <GlowCard key={feature.id} className="p-5 md:p-6 h-full">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-ink">{feature.title}</h3>
                  {feature.badge ? <FeatureBadge badge={feature.badge} /> : null}
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{feature.description}</p>
              </GlowCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection compact>
          {/* Swap this placeholder for a real screenshot of the MoneyTykes Classroom dashboard once one is available from the dashboard app. */}
          <ScreenshotPlaceholder
            heading={classroomImagePlaceholders.dashboard.heading}
            caption={classroomImagePlaceholders.dashboard.caption}
            alt={classroomImagePlaceholders.dashboard.alt}
          />
        </AnimatedSection>

        <AnimatedSection>
          <GlowCard className="max-w-3xl mx-auto p-6 md:p-8 text-center bg-[color-mix(in_srgb,var(--class-chalk)_55%,var(--surface-card))] dark:bg-[color-mix(in_srgb,var(--class-teal)_35%,var(--surface-card))] border border-[color-mix(in_srgb,var(--class-wood)_18%,transparent)]">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-3 bg-[color-mix(in_srgb,var(--class-teal)_12%,transparent)] text-[var(--class-teal)] dark:text-[var(--class-chalk)] border-[color-mix(in_srgb,var(--class-teal)_30%,transparent)]">
              {classroomParentCallout.badge}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-ink mb-2">{classroomParentCallout.title}</h2>
            <p className="text-sm md:text-base text-ink-muted leading-relaxed">
              {classroomParentCallout.body}
            </p>
          </GlowCard>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">{classroomLoginPanel.title}</h2>
            <p className="text-base text-ink-muted leading-relaxed mb-6">{classroomLoginPanel.body}</p>
            <LoginButton />
            {!isClassroomLoginConfigured() ? (
              <p
                role="status"
                className="mt-4 text-sm text-ink-subtle leading-relaxed"
              >
                {classroomLoginPanel.notConfiguredNote}
              </p>
            ) : null}
          </div>
        </AnimatedSection>
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
