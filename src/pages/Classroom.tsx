import { useEffect, lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ChalkboardBoard } from '@/components/ui/ChalkboardBoard'
import { classroomLoginPreview, classroomDashPreview } from '@/img'
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

const TILTS = ['-1.5deg', '1deg', '-0.6deg', '1.6deg', '-1deg', '0.8deg', '-1.2deg', '1.3deg', '-0.4deg']

function ChalkZigZag({ className = '' }: { className?: string }) {
  return (
    <div className={`chalk-zigzag ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 560 18" preserveAspectRatio="none" className="chalk-zigzag-svg">
        <path
          d="M2 9 L18 3 L34 14 L50 4 L66 13 L82 3 L98 14 L114 5 L130 13 L146 3 L162 14 L178 4 L194 13 L210 3 L226 14 L242 5 L258 12 L274 3 L290 14 L306 5 L322 13 L338 3 L354 14 L370 4 L386 13 L402 3 L418 14 L434 5 L450 12 L466 3 L482 14 L498 5 L514 13 L530 3 L546 14 L558 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function FeatureBadge({ badge }: { badge: NonNullable<ClassroomFeature['badge']> }) {
  const isNew = badge === 'New'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-2 ${
        isNew
          ? 'bg-amber-400/20 text-amber-800 border-amber-500/35'
          : 'bg-[color-mix(in_srgb,var(--class-teal)_14%,transparent)] text-[var(--class-teal)] border-[color-mix(in_srgb,var(--class-teal)_30%,transparent)]'
      }`}
    >
      {badge}
    </span>
  )
}

function FeatureCard({
  feature,
  tilt,
  tapeTilt,
}: {
  feature: ClassroomFeature
  tilt: string
  tapeTilt: string
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="feature-card-wrap relative"
      initial="rest"
      whileHover={reducedMotion ? undefined : 'hover'}
      animate="rest"
    >
      <motion.span
        className="feature-card-light"
        aria-hidden="true"
        variants={{
          rest: { opacity: 0, scale: 0.98 },
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />
      <motion.div
        className="taped feature-card relative z-[1]"
        style={reducedMotion ? { rotate: tilt } : undefined}
        variants={
          reducedMotion
            ? undefined
            : {
                rest: { y: 0, scale: 1, rotate: tilt },
                hover: { y: -5, scale: 1.02, rotate: 0 },
              }
        }
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      >
        <span
          className="tape center"
          style={{ transform: `translateX(-50%) rotate(${tapeTilt})` }}
        />
        {feature.badge ? <FeatureBadge badge={feature.badge} /> : null}
        <h3 className="text-sm font-bold text-ink mb-1">{feature.title}</h3>
        <p className="text-xs leading-relaxed text-ink-muted">{feature.description}</p>
      </motion.div>
    </motion.div>
  )
}

function TapedPhoto({
  src,
  alt,
  caption,
  rotate,
}: {
  src: string
  alt: string
  caption: string
  rotate: string
}) {
  return (
    <div
      className="mb-10 sm:mb-14 photo-preview-wrap"
      style={{ ['--photo-tilt' as string]: rotate }}
    >
      <div className="taped photo-frame">
        <span className="tape left" />
        <span className="tape right" />
        <img src={src} alt={alt} className="w-full h-auto object-cover object-top" loading="lazy" decoding="async" />
      </div>
      <p className="photo-caption">{caption}</p>
    </div>
  )
}

function LoginButton({ className = '' }: { className?: string }) {
  const ready = isClassroomLoginConfigured()
  return (
    <Button
      variant="secondary"
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

      <ChalkboardBoard>
        <div className="text-center pb-10 sm:pb-14">
          <span className="section-badge !bg-transparent !border-[color-mix(in_srgb,var(--class-chalk-gold)_40%,transparent)] text-chalk-gold">
            MoneyTykes Classroom
          </span>
          <h1 className="font-cta text-[1.65rem] leading-tight sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-chalk mb-4 md:mb-5">
            A money smart dashboard built for your classroom
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-chalk opacity-90 leading-relaxed mb-7 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
            {classroomPageMeta}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
            <LoginButton className="w-full sm:w-auto justify-center" />
            <Button
              variant="ghost"
              href="#classroom-features"
              target="_self"
              rel="noopener"
              className="w-full sm:w-auto justify-center !text-white !bg-white/10 border-2 border-[var(--class-chalk)]/40 hover:!bg-white/20 hover:border-[var(--class-chalk)]/70"
            >
              See what is inside
            </Button>
          </div>
        </div>

        <TapedPhoto
          src={classroomLoginPreview}
          alt={classroomImagePlaceholders.login.alt}
          caption={classroomImagePlaceholders.login.heading}
          rotate="-2.2deg"
        />

        <div className="taped index-card mb-14">
          <span className="tape left" />
          <span className="tape right" />
          <h2 className="text-xl font-bold text-ink mb-2.5">What is MoneyTykes Classroom</h2>
          <p className="text-sm leading-relaxed text-ink-muted">{classroomIntro}</p>
        </div>

        <ChalkZigZag className="mb-10" />

        <div id="classroom-features" className="mb-5 scroll-mt-28">
          <span className="block text-[11.5px] font-bold uppercase tracking-wider text-chalk-gold mb-2">
            Built for teachers
          </span>
          <h2 className="font-cta text-2xl font-bold text-chalk mb-7 max-w-sm">
            Everything your day needs, right on the board
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-5 gap-y-7 sm:gap-y-9 mb-9">
            {classroomFeatures.map((feature, i) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                tilt={TILTS[i % TILTS.length]}
                tapeTilt={TILTS[(i + 3) % TILTS.length]}
              />
            ))}
          </div>
        </div>

        <TapedPhoto
          src={classroomDashPreview}
          alt={classroomImagePlaceholders.dashboard.alt}
          caption={classroomImagePlaceholders.dashboard.heading}
          rotate="2deg"
        />

        <ChalkZigZag className="mb-10" />

        <div className="flex justify-center mb-14">
          <div className="sticky-note">
            <span className="sticky-badge">{classroomParentCallout.badge}</span>
            <h3 className="font-cta text-base font-bold mb-1.5">{classroomParentCallout.title}</h3>
            <p className="text-[13px] leading-relaxed">{classroomParentCallout.body}</p>
          </div>
        </div>

        <div className="text-center pb-4">
          <h2 className="font-cta text-2xl md:text-3xl font-bold text-chalk mb-3">{classroomLoginPanel.title}</h2>
          <p className="text-base text-chalk opacity-90 leading-relaxed mb-6">{classroomLoginPanel.body}</p>
          <LoginButton />
          {!isClassroomLoginConfigured() ? (
            <p role="status" className="mt-4 text-sm text-chalk opacity-70 leading-relaxed">
              {classroomLoginPanel.notConfiguredNote}
            </p>
          ) : null}
        </div>
      </ChalkboardBoard>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
