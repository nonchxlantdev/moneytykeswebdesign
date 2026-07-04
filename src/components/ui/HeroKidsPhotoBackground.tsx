import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionTemplate, type MotionValue } from 'framer-motion'
import { kidsLearningTogether } from '@/img'
import { CoinImage } from '@/components/ui/CoinImage'

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

/** In-flow kids photo for phone — quote + framed photo below Dance Challenge */
export function HeroKidsPhotoMobile() {
  return (
    <div className="hero-photo-mobile-block sm:hidden mt-4 w-full">
      <figure className="hero-photo-mobile-quote mb-4">
        <blockquote className="text-[0.875rem] leading-snug text-ink font-medium text-center whitespace-nowrap">
          &ldquo;Learning about money starts at home.&rdquo;{' '}
          <cite className="text-xs font-semibold text-ink-muted not-italic tracking-wide">
            — S. Young
          </cite>
        </blockquote>
      </figure>

      <div className="hero-photo-mobile relative" aria-hidden>
        <HeroPhotoImage className="hero-photo-img hero-photo-mobile-img" />
        <CoinImage
          className="hero-photo-mobile-coin absolute bottom-2.5 right-2.5 z-10 w-10 h-10 pointer-events-none"
          loading="lazy"
        />
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
