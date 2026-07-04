import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionTemplate, type MotionValue } from 'framer-motion'
import { kidsLearningTogether, coinIcon } from '@/img'

interface HeroKidsPhotoBackgroundProps {
  sectionRef: React.RefObject<HTMLElement | null>
}

/** Feather left edge only — right side stays fully visible */
const photoMaskHorizontal =
  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 4%, rgba(0,0,0,0.92) 9%, black 14%, black 100%)'

/** Very subtle bottom edge — enough for scroll blend, not a heavy wash */
const photoMaskVertical =
  'linear-gradient(to bottom, black 0%, black 93%, rgba(0,0,0,0.35) 98%, transparent 100%)'

const photoMaskStyle = {
  maskImage: `${photoMaskHorizontal}, ${photoMaskVertical}`,
  WebkitMaskImage: `${photoMaskHorizontal}, ${photoMaskVertical}`,
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
} as const

/** Lift faces without washing them out; mild sharpen helps the soft left kid */
const photoImgStyle = {
  filter: 'brightness(1.2) contrast(1.12) saturate(1.12) url(#hero-photo-sharpen)',
} as const

/** Parallax drift — kept subtle so CSS fluid scale/position stays primary */
const PHOTO_Y_SCROLL_END = '6%'
/** Tablet portrait: pan object-position on scroll to reveal red-shirt kid (photo stays filled) */
const TABLET_PORTRAIT_OBJECT_X_START = 14
const TABLET_PORTRAIT_OBJECT_X_END = 40

function useTabletPortrait() {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px) and (max-width: 1023px) and (orientation: portrait)')
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return matches
}

function smoothScrollProgress(progress: number): number {
  return progress * progress * (3 - 2 * progress)
}

function HeroPhotoSharpenFilter() {
  return (
    <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden>
      <defs>
        <filter id="hero-photo-sharpen" colorInterpolationFilters="sRGB">
          <feConvolveMatrix order="3" kernelMatrix="0 -0.4 0 -0.4 2.6 -0.4 0 -0.4 0" />
        </filter>
      </defs>
    </svg>
  )
}

function HeroPhotoImage({ className, enhanced = true }: { className: string; enhanced?: boolean }) {
  return (
    <>
      {enhanced ? <HeroPhotoSharpenFilter /> : null}
      <img
        src={kidsLearningTogether}
        alt=""
        draggable={false}
        className={className}
        style={enhanced ? photoImgStyle : undefined}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </>
  )
}

function PhotoScrim() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none hero-scrim-text" />
      <div className="absolute inset-0 pointer-events-none opacity-85 dark:opacity-80 hero-scrim-radial" />
      <div className="absolute inset-0 pointer-events-none hidden md:block hero-scrim-desc" />
      <div className="absolute inset-0 pointer-events-none hero-scrim-bottom" />
    </>
  )
}

function StaticPhotoFrame() {
  return (
    <div className="w-full h-full overflow-hidden" style={photoMaskStyle}>
      <HeroPhotoImage className="hero-photo-img absolute inset-0 w-full h-full object-cover" />
    </div>
  )
}

function ScrollPanPhotoFrame({ scrollObjectX }: { scrollObjectX: MotionValue<number> }) {
  const objectPosition = useMotionTemplate`${scrollObjectX}% 50%`

  return (
    <div className="w-full h-full overflow-hidden" style={photoMaskStyle}>
      <HeroPhotoSharpenFilter />
      <motion.img
        src={kidsLearningTogether}
        alt=""
        draggable={false}
        className="hero-photo-img absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition, ...photoImgStyle }}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  )
}

function PhotoFrame({ scrollObjectX }: { scrollObjectX?: MotionValue<number> }) {
  if (scrollObjectX) {
    return <ScrollPanPhotoFrame scrollObjectX={scrollObjectX} />
  }

  return <StaticPhotoFrame />
}

/** In-flow kids photo for phone — quote + edge-to-edge cover below Dance Challenge */
export function HeroKidsPhotoMobile() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="sm:hidden mt-4">
      <figure className="hero-photo-mobile-quote px-1 mb-3.5">
        <blockquote className="text-[0.82rem] leading-snug text-ink font-medium text-center whitespace-nowrap">
          &ldquo;Learning about money starts at home.&rdquo;{' '}
          <cite className="text-xs font-semibold text-ink-muted not-italic tracking-wide">
            — S. Young
          </cite>
        </blockquote>
      </figure>

      <div className="[perspective:1000px]">
        <motion.div
          className="hero-photo-mobile relative"
          aria-hidden
          style={{ transformOrigin: 'center bottom' }}
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  rotateX: 16,
                  y: 32,
                  scale: 0.92,
                  boxShadow: '0 6px 18px rgba(7, 26, 45, 0.12)',
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  scale: 1,
                  boxShadow: '0 24px 52px rgba(7, 26, 45, 0.24)',
                }
          }
          viewport={{ once: true, amount: 0.35 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        >
          <HeroPhotoImage className="hero-photo-img hero-photo-mobile-img" />
          <div className="hero-photo-mobile-edges pointer-events-none" aria-hidden />
          <img
            src={coinIcon}
            alt=""
            draggable={false}
            className="hero-photo-mobile-coin absolute bottom-3 right-3 z-10 w-12 h-12 object-contain select-none pointer-events-none"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </div>
  )
}

export function HeroKidsPhotoBackground({ sectionRef }: HeroKidsPhotoBackgroundProps) {
  const reducedMotion = useReducedMotion()
  const tabletPortrait = useTabletPortrait()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const layerOpacity = useTransform(scrollYProgress, [0, 0.45, 0.82, 1], [1, 0.9, 0.35, 0])
  const photoParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', PHOTO_Y_SCROLL_END])
  const photoObjectX = useTransform(scrollYProgress, (progress) => {
    const eased = smoothScrollProgress(progress)
    const span = TABLET_PORTRAIT_OBJECT_X_END - TABLET_PORTRAIT_OBJECT_X_START
    return TABLET_PORTRAIT_OBJECT_X_START + eased * span
  })

  const photoPanel = (
    <div className="hero-photo-panel">
      {reducedMotion ? (
        <PhotoFrame />
      ) : (
        <motion.div className="w-full h-full" style={{ y: photoParallaxY }}>
          <PhotoFrame scrollObjectX={tabletPortrait ? photoObjectX : undefined} />
        </motion.div>
      )}
    </div>
  )

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block" aria-hidden>
        {photoPanel}
        <PhotoScrim />
      </div>
    )
  }

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block"
      style={{ opacity: layerOpacity }}
      aria-hidden
    >
      {photoPanel}
      <PhotoScrim />
    </motion.div>
  )
}
