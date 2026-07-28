import { useEffect, lazy, Suspense, type ComponentType } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FiCalendar,
  FiFileText,
  FiUsers,
  FiBookOpen,
  FiClipboard,
  FiAward,
  FiClock,
  FiHeart,
  FiMail,
  FiUser,
  FiMessageCircle,
  FiBarChart2,
  FiMessageSquare,
  FiPieChart,
} from 'react-icons/fi'
import { FaGraduationCap, FaUniversity } from 'react-icons/fa'
import { Button } from '@/components/ui/Button'
import { CoinImage } from '@/components/ui/CoinImage'
import { ChalkboardBoard } from '@/components/ui/ChalkboardBoard'
import { LightboxImage } from '@/components/ui/ImageLightbox'
import { classroomLoginPreview, classroomDashPreview } from '@/img'
import { SUPPORT_EMAIL, SPONSOR_WHATSAPP_URL } from '@/data/links'
import {
  classroomPageMeta,
  classroomHeroTagline,
  classroomIntroTitle,
  classroomIntro,
  classroomFeatures,
  classroomFeaturesSection,
  classroomAssessmentCentre,
  classroomParentCallout,
  classroomLoginPanel,
  classroomImagePlaceholders,
  classroomClosingHeadline,
  classroomClosingBenefits,
  classroomCtaReadyLabel,
  classroomSponsorHref,
  classroomDemoRequestUrl,
  goToClassroomLogin,
  isClassroomLoginConfigured,
  type ClassroomFeature,
} from '@/data/classroom'

const Navbar = lazy(() => import('@/components/layout/Navbar').then((m) => ({ default: m.Navbar })))
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

const TILTS = ['-1.5deg', '1deg', '-0.6deg', '1.6deg', '-1deg', '0.8deg', '-1.2deg', '1.3deg']

const FEATURE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  lessons: FiBookOpen,
  assessments: FiClipboard,
  parents: FiMessageSquare,
  calendar: FiCalendar,
  rewards: FiAward,
  students: FiUsers,
  'report-cards': FiFileText,
  insights: FiPieChart,
}

const BENEFIT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  impact: FiHeart,
  teachers: FiClock,
  students: FaGraduationCap,
  progress: FaUniversity,
}

const FEATURE_LEFT = ['lessons', 'assessments', 'parents'] as const
const FEATURE_MID = ['calendar', 'rewards'] as const
const FEATURE_RIGHT = ['students', 'report-cards', 'insights'] as const


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
  const Icon = FEATURE_ICONS[feature.id]

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
        <div className="flex items-start gap-3">
          {Icon ? (
            <div className="fcard-icon shrink-0" style={{ background: feature.accent.fg }}>
              <Icon className="w-5 h-5" />
            </div>
          ) : null}
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-ink mb-1">{feature.title}</h3>
            <p className="text-xs leading-relaxed text-ink-muted mb-3">{feature.description}</p>
            <span className="mark" style={{ background: feature.accent.fg }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function AssessmentCentreCard() {
  const reducedMotion = useReducedMotion()
  const data = classroomAssessmentCentre

  return (
    <motion.div
      className="feature-card-wrap relative feature-board-center"
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
        className="taped feature-card feature-card-hero relative z-[1]"
        variants={
          reducedMotion
            ? undefined
            : {
                rest: { y: 0, scale: 1 },
                hover: { y: -4, scale: 1.01 },
              }
        }
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      >
        <span className="tape center" style={{ transform: 'translateX(-50%) rotate(-1deg)' }} />
        <div className="flex items-start gap-3 mb-3">
          <div className="fcard-icon fcard-icon-sq shrink-0" style={{ background: data.accent.fg }}>
            <FiBarChart2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-cta text-base sm:text-lg font-bold text-[var(--class-teal)] mb-1">
              {data.title}
            </h3>
            <p className="text-xs sm:text-[13px] leading-relaxed text-ink-muted">{data.description}</p>
          </div>
        </div>
        <div className="hero-widget hero-widget-lg">
          <div className="hero-table">
            <div className="hero-table-head">
              <span>{data.quizLabel}</span>
              <span>{data.quizMarks}</span>
            </div>
            <div className="hero-table-cols">
              <span>Student</span>
              <span>Marks</span>
              <span>%</span>
              <span>Grade</span>
            </div>
            {data.rows.map((row) => (
              <div key={row.name} className="hero-table-row">
                <span>{row.name}</span>
                <span>{row.mark}</span>
                <span>{row.pct}</span>
                <b>{row.grade}</b>
              </div>
            ))}
          </div>
          <div
            className="donut donut-lg"
            style={{
              background: `conic-gradient(#2563eb 0% 42%, #22c55e 42% 62%, #eab308 62% 74%, #f97316 74% ${data.average}%, #e5e7eb ${data.average}% 100%)`,
            }}
          >
            <span>
              Class
              <br />
              Average
              <strong>{data.average}%</strong>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function featureById(id: string) {
  return classroomFeatures.find((f) => f.id === id)!
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
      <LightboxImage
        src={src}
        alt={alt}
        className="taped photo-frame lightbox-trigger--photo"
        imgClassName="w-full h-auto object-cover object-top"
      >
        <span className="tape left" />
        <span className="tape right" />
      </LightboxImage>
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

  const loginReady = isClassroomLoginConfigured()

  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-surface"
      >
        <ChalkboardBoard>
        <div className="text-center pb-10 sm:pb-14">
          <span className="section-badge !bg-transparent !border-[color-mix(in_srgb,var(--class-chalk-gold)_40%,transparent)] text-chalk-gold">
            MoneyTykes Classroom
          </span>
          <h1 className="font-cta text-[1.85rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-chalk mb-4 md:mb-5 max-w-4xl mx-auto px-1">
            {classroomHeroTagline.beforeTech}
            <span className="text-[#3b82f6]">{classroomHeroTagline.tech}</span>
            {classroomHeroTagline.mid}
            <span className="text-[#f97316]">{classroomHeroTagline.innovation}</span>
            {classroomHeroTagline.end}
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
          <h2 className="text-xl font-bold text-ink mb-2.5">{classroomIntroTitle}</h2>
          <div className="space-y-3">
            {classroomIntro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <ChalkZigZag className="mb-10" />

        <div id="classroom-features" className="mb-5 scroll-mt-28">
          <div className="flex items-center gap-2.5 mb-3">
            <CoinImage
              size={36}
              alt="MoneyTykes"
              className="shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
            />
            <span className="block text-[11.5px] font-bold uppercase tracking-wider text-[#f5a524]">
              {classroomFeaturesSection.eyebrow}
            </span>
          </div>
          <h2 className="font-cta text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-chalk mb-3 max-w-3xl leading-tight">
            {classroomFeaturesSection.headlineBefore}
            <span className="text-[#f5a524]">{classroomFeaturesSection.headlineHighlight}</span>
          </h2>
          <p className="text-sm sm:text-base text-white leading-relaxed mb-8 max-w-xl">
            {classroomFeaturesSection.subtitle}
          </p>

          <div className="feature-board mb-9">
            <div className="feature-board-col">
              {FEATURE_LEFT.map((id, i) => (
                <FeatureCard
                  key={id}
                  feature={featureById(id)}
                  tilt={TILTS[i % TILTS.length]}
                  tapeTilt={TILTS[(i + 3) % TILTS.length]}
                />
              ))}
            </div>
            <div className="feature-board-mid">
              <FeatureCard
                feature={featureById(FEATURE_MID[0])}
                tilt={TILTS[3]}
                tapeTilt={TILTS[5]}
              />
              <AssessmentCentreCard />
              <FeatureCard
                feature={featureById(FEATURE_MID[1])}
                tilt={TILTS[4]}
                tapeTilt={TILTS[6]}
              />
            </div>
            <div className="feature-board-col">
              {FEATURE_RIGHT.map((id, i) => (
                <FeatureCard
                  key={id}
                  feature={featureById(id)}
                  tilt={TILTS[(i + 2) % TILTS.length]}
                  tapeTilt={TILTS[(i + 5) % TILTS.length]}
                />
              ))}
            </div>
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

        <div className="closing-headline">
          <h2 className="font-cta">
            <span className="closing-line">{classroomClosingHeadline.line1}</span>
            <span className="closing-highlight">
              <span className="closing-sparkles left" aria-hidden="true" />
              <span className="closing-highlight-text">{classroomClosingHeadline.highlight}</span>
              <span className="closing-sparkles right" aria-hidden="true" />
              <span className="closing-underline" aria-hidden="true" />
            </span>
            <span className="closing-line">{classroomClosingHeadline.line3}</span>
          </h2>
          <p>{classroomClosingHeadline.subtitle}</p>
        </div>

        <div className="benefit-row">
          {classroomClosingBenefits.map((benefit) => {
            const Icon = BENEFIT_ICONS[benefit.id]
            return (
              <div key={benefit.id} className="benefit">
                <div className="b-icon" style={{ background: benefit.iconFill }}>
                  {Icon ? <Icon className="w-5 h-5" /> : null}
                </div>
                <h4>{benefit.title}</h4>
                <p>{benefit.body}</p>
              </div>
            )
          })}
        </div>

        <div className="cta-panel">
          <p className="cta-ready-label">{classroomCtaReadyLabel}</p>
          <div className="cta-bar">
            <a href={classroomSponsorHref} className="cta-btn primary">
              <span className="ic">
                <FiHeart />
              </span>
              <span>
                <span className="label">Sponsor a classroom</span>
                <span className="sub">Support a school in your community</span>
              </span>
            </a>
            <a href={classroomDemoRequestUrl} className="cta-btn plain">
              <span className="ic" style={{ background: '#2563eb' }}>
                <FiCalendar />
              </span>
              <span>
                <span className="label">Request a demo</span>
                <span className="sub">We will walk your school through it</span>
              </span>
            </a>
            <button
              type="button"
              onClick={goToClassroomLogin}
              disabled={!loginReady}
              className={`cta-btn plain text-left ${loginReady ? '' : 'opacity-60 cursor-not-allowed'}`}
            >
              <span className="ic" style={{ background: '#16a34a' }}>
                <FiUser />
              </span>
              <span>
                <span className="label">School login</span>
                <span className="sub">For teachers already set up</span>
              </span>
            </button>
          </div>
        </div>

        {!loginReady ? (
          <p role="status" className="text-center text-sm text-chalk opacity-70 leading-relaxed mb-6">
            {classroomLoginPanel.notConfiguredNote}
          </p>
        ) : null}

        <div className="contact-strip pb-4">
          <a href={`mailto:${SUPPORT_EMAIL}`} className="contact-item">
            <span className="ci-icon" style={{ background: '#2563eb' }}>
              <FiMail />
            </span>
            <span>
              <b>Email us</b>
              {SUPPORT_EMAIL}
            </span>
          </a>
          <a
            href={SPONSOR_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <span className="ci-icon" style={{ background: '#16a34a' }}>
              <FiMessageCircle />
            </span>
            <span>
              <b>Message us</b>
              Sponsor questions on WhatsApp
            </span>
          </a>
        </div>
      </ChalkboardBoard>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </motion.main>
    </>
  )
}
