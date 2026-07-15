import { useEffect, lazy, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlay, FiMusic, FiVideo, FiUpload, FiCheck, FiYoutube } from 'react-icons/fi'
import { CoinImage } from '@/components/ui/CoinImage'
import { DanceChallengeSignupForm } from '@/components/danceChallenge/DanceChallengeSignupForm'
import {
  DANCE_CHALLENGE_META,
  eligibilityItems,
  howItWorksSteps,
  keyDates,
  prizeItems,
} from '@/data/danceChallenge'
import { OFFICIAL_MUSIC_VIDEO_URL } from '@/data/links'
import { danceChallengeSong, themeSong } from '@/audio'
import { useSound } from '@/hooks/useSound'

const Navbar = lazy(() => import('@/components/layout/Navbar').then((m) => ({ default: m.Navbar })))
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/FcoHlbgjz5A?rel=0&modestbranding=1'
const TYKER_LOGO_SRC = `${import.meta.env.BASE_URL}images/dance-challenge/tyker-logo.png`

const stepIcons = [FiPlay, FiMusic, FiVideo, FiUpload] as const

/** Scattered coin “stars” all around the stage */
const FLOATING_COINS = [
  // top edge
  { top: '3%', left: '5%', size: 28, delay: 0, duration: 3.2 },
  { top: '6%', left: '22%', size: 16, delay: 0.4, duration: 4.1 },
  { top: '2%', left: '42%', size: 34, delay: 0.2, duration: 3.6 },
  { top: '8%', left: '62%', size: 20, delay: 0.8, duration: 4.4 },
  { top: '4%', left: '82%', size: 30, delay: 0.15, duration: 3.8 },
  { top: '10%', left: '94%', size: 14, delay: 1.1, duration: 4.8 },
  // left edge
  { top: '22%', left: '2%', size: 22, delay: 0.55, duration: 3.4 },
  { top: '38%', left: '4%', size: 17, delay: 1.3, duration: 5.0 },
  { top: '55%', left: '1%', size: 26, delay: 0.65, duration: 3.9 },
  { top: '72%', left: '3%', size: 15, delay: 1.5, duration: 4.6 },
  // right edge
  { top: '24%', left: '96%', size: 24, delay: 0.3, duration: 5.2 },
  { top: '42%', left: '93%', size: 18, delay: 1.0, duration: 3.7 },
  { top: '58%', left: '97%', size: 32, delay: 0.75, duration: 4.3 },
  { top: '76%', left: '91%', size: 16, delay: 1.2, duration: 4.5 },
  // mid scatter (around content)
  { top: '28%', left: '28%', size: 12, delay: 1.7, duration: 4.9 },
  { top: '34%', left: '52%', size: 19, delay: 0.9, duration: 3.5 },
  { top: '48%', left: '18%', size: 14, delay: 1.4, duration: 4.2 },
  { top: '52%', left: '70%', size: 21, delay: 0.45, duration: 3.8 },
  { top: '64%', left: '40%', size: 13, delay: 1.6, duration: 5.1 },
  { top: '68%', left: '58%', size: 27, delay: 0.25, duration: 3.3 },
  // bottom edge
  { top: '86%', left: '8%', size: 22, delay: 0.85, duration: 4.0 },
  { top: '90%', left: '28%', size: 15, delay: 1.25, duration: 4.7 },
  { top: '88%', left: '48%', size: 29, delay: 0.5, duration: 3.6 },
  { top: '92%', left: '68%', size: 18, delay: 1.05, duration: 4.4 },
  { top: '87%', left: '86%', size: 24, delay: 0.35, duration: 3.9 },
  { top: '94%', left: '38%', size: 12, delay: 1.8, duration: 5.3 },
] as const

type InfoTab = 'how' | 'prizes' | 'dates'

export function DanceChallenge() {
  const [activeStep, setActiveStep] = useState(0)
  const [infoTab, setInfoTab] = useState<InfoTab>('how')
  const { setMusicTrack, ensureMusicPlaying, pauseMusic } = useSound()

  useEffect(() => {
    document.title = 'The MoneyTykes Dance Challenge | MoneyTykes'

    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', DANCE_CHALLENGE_META)

    return () => {
      document.title = 'MoneyTykes — Teaching Kids Smart Money Habits'
      meta?.setAttribute('content', previous)
    }
  }, [])

  useEffect(() => {
    setMusicTrack(danceChallengeSong, { loop: false })
    ensureMusicPlaying()
    return () => {
      setMusicTrack(themeSong, { loop: true })
    }
  }, [setMusicTrack, ensureMusicPlaying])

  const ActiveIcon = stepIcons[activeStep]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="dc-page min-h-screen flex flex-col"
    >
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <div className="relative flex-1 pt-32 sm:pt-40 md:pt-44 pb-10 md:pb-14 px-3 sm:px-5 md:px-8">
        {/* Playful stage backdrop */}
        <div className="dc-stage-bg" aria-hidden />
        <div className="dc-confetti" aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-5 lg:gap-7 items-start">
          {/* —— LEFT COLUMN: stage + video —— */}
          <div className="flex flex-col gap-4 sm:gap-5 min-w-0">
          {/* —— STAGE (kids) —— */}
          <section className="dc-stage-panel relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-7 md:p-8 text-white">
            {/* Coin constellation across the top */}
            <div className="dc-coin-sky" aria-hidden>
              {FLOATING_COINS.map((coin, i) => (
                <motion.span
                  key={i}
                  className="dc-star-coin"
                  style={{
                    top: coin.top,
                    left: coin.left,
                    width: coin.size,
                    height: coin.size,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.45, 1, 0.55],
                    rotate: [0, 12, -8, 0],
                    scale: [0.92, 1.08, 0.95],
                  }}
                  transition={{
                    duration: coin.duration,
                    delay: coin.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <CoinImage size={coin.size} alt="" />
                </motion.span>
              ))}
            </div>

            <div className="dc-tyker-wrap pointer-events-none select-none absolute -bottom-2 -right-4 sm:-right-3 md:-right-4 lg:-right-5 z-10">
              <div className="dc-thought-bubble" aria-hidden="true">
                Are You Ready?
              </div>
              <img
                src={TYKER_LOGO_SRC}
                alt="MoneyTykes tiger mascot giving a thumbs up"
                className="dc-tyker-img drop-shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="relative z-[1] max-w-xl lg:max-w-none lg:pr-44 xl:pr-52">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="dc-pill dc-pill-hot">WE&apos;RE BACK!</span>
                <span className="dc-pill dc-pill-soft">Learn. Earn. Level Up.</span>
              </div>

              <h1 className="text-[1.85rem] leading-[1.08] sm:text-4xl md:text-5xl font-black tracking-tight mb-2">
                <span className="text-[#ffd54a]">The MoneyTykes</span>
                <br />
                <span className="text-[#ff9f43]">Dance Challenge</span>
              </h1>
              <p className="text-lg sm:text-xl font-extrabold tracking-wide text-white/95 mb-5">
                IS OFFICIALLY OPEN!
              </p>

              {/* Tabbed info — replaces long scroll sections */}
              <div className="dc-info-shell" role="region" aria-label="Challenge details">
                <div className="dc-tabs" role="tablist" aria-label="Challenge info">
                  {(
                    [
                      { id: 'how', label: 'How it works' },
                      { id: 'prizes', label: 'Prizes' },
                      { id: 'dates', label: 'Dates & rules' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={infoTab === tab.id}
                      className={`dc-tab ${infoTab === tab.id ? 'is-active' : ''}`}
                      onClick={() => setInfoTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="dc-tab-panel" role="tabpanel">
                  <AnimatePresence mode="wait">
                    {infoTab === 'how' && (
                      <motion.div
                        key="how"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          {howItWorksSteps.map((step, index) => {
                            const Icon = stepIcons[index]
                            const selected = activeStep === index
                            return (
                              <button
                                key={step.id}
                                type="button"
                                onClick={() => setActiveStep(index)}
                                className={`dc-step-btn ${selected ? 'is-active' : ''}`}
                                aria-pressed={selected}
                                aria-label={`Step ${step.number}: ${step.title}`}
                              >
                                <Icon className="text-lg sm:text-xl" aria-hidden />
                                <span className="text-[10px] sm:text-xs font-black tracking-wide">
                                  {step.number}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                        <div className="dc-step-detail">
                          <div className="flex items-center gap-2 mb-1.5">
                            <ActiveIcon className="text-[#ff9f43]" aria-hidden />
                            <h2 className="text-base sm:text-lg font-black text-navy">
                              {howItWorksSteps[activeStep].title}
                            </h2>
                          </div>
                          <p className="text-sm sm:text-[0.95rem] text-navy/75 leading-relaxed">
                            {howItWorksSteps[activeStep].description}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {infoTab === 'prizes' && (
                      <motion.div
                        key="prizes"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2.5"
                      >
                        <h2 className="text-lg sm:text-xl font-black text-navy mb-3">
                          Amazing Cash Prizes!
                        </h2>
                        {prizeItems.map((prize) => (
                          <div key={prize.id} className="dc-prize-ticket" tabIndex={0}>
                            <span className="dc-prize-burst" aria-hidden>
                              {prize.burst === 'gift'
                                ? [0, 1, 2, 3, 4].map((n) => (
                                    <span key={n} className="dc-prize-burst-item dc-prize-gift">
                                      🎁
                                    </span>
                                  ))
                                : [0, 1, 2, 3, 4].map((n) => (
                                    <span key={n} className="dc-prize-burst-item">
                                      <CoinImage
                                        size={n % 2 === 0 ? 22 : 16}
                                        className={
                                          prize.burst === 'gold'
                                            ? 'dc-prize-coin--gold'
                                            : 'dc-prize-coin--silver'
                                        }
                                        alt=""
                                      />
                                    </span>
                                  ))}
                            </span>
                            <span className="relative z-[1] text-2xl sm:text-3xl" aria-hidden>
                              {prize.icon}
                            </span>
                            <div className="relative z-[1]">
                              <p className="font-extrabold text-navy text-base sm:text-lg leading-tight">
                                {prize.title}
                              </p>
                              {prize.detail ? (
                                <p className="text-sm sm:text-base font-bold text-[#e67e22]">{prize.detail}</p>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {infoTab === 'dates' && (
                      <motion.div
                        key="dates"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="dc-dates-fit"
                      >
                        <p className="dc-mark-date">📅 Mark the date</p>
                        <div className="dc-dates-stack">
                          {keyDates.map((item) => (
                            <div key={item.id} className="dc-date-chip">
                              <p className="dc-date-chip-label">{item.label}</p>
                              <p className="dc-date-chip-value">{item.date}</p>
                            </div>
                          ))}
                        </div>
                        <ul className="dc-rules-list">
                          {eligibilityItems.map((item) => (
                            <li key={item}>
                              <span className="dc-rules-check" aria-hidden>
                                <FiCheck />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <p className="mt-5 text-sm sm:text-base font-bold text-white/90 max-w-md">
                Start practicing today — Let&apos;s Dance. Learn. Earn. Level Up.
              </p>
            </div>
          </section>

          {/* —— MUSIC VIDEO (own container, left column under rules) —— */}
          <section
            className="dc-video-container"
            aria-labelledby="dc-video-heading"
          >
            <div className="dc-video-container-inner">
              <div className="dc-video-stage-head">
                <div>
                  <p className="dc-video-live">
                    <FiYoutube aria-hidden />
                    Official Music Video
                  </p>
                  <h2 id="dc-video-heading" className="dc-video-title">
                    Learn the MoneyTykes Dance
                  </h2>
                </div>
                <a
                  href={OFFICIAL_MUSIC_VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dc-video-open"
                >
                  Watch on YouTube
                </a>
              </div>
              <div
                className="dc-video-frame"
                onPointerDown={() => pauseMusic()}
              >
                <iframe
                  src={YOUTUBE_EMBED_URL}
                  title="MoneyTykes Theme Song — Official Music Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <p className="dc-video-caption">
                Learn the moves to this track — then record your entry!
              </p>
            </div>
          </section>
          </div>

          {/* —— PARENT PORTAL (signup) —— */}
          <aside
            id="signup"
            className="dc-portal lg:sticky lg:top-28 scroll-mt-28"
            aria-labelledby="dc-portal-heading"
          >
            <div className="dc-portal-inner">
              <p className="dc-portal-eyebrow">Parent portal</p>
              <h2 id="dc-portal-heading" className="text-xl sm:text-2xl font-black text-navy tracking-tight mb-1">
                Enter the Dance Challenge
              </h2>
              <p className="text-sm text-navy/65 mb-5 leading-relaxed">
                Guardians submit here. All fields required — takes about a minute.
              </p>
              <DanceChallengeSignupForm />
            </div>
          </aside>
        </div>
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
