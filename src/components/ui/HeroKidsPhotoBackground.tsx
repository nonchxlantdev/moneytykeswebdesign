import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { kidsLearningTogether } from '@/img'

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
/** Tablet portrait: pan photo toward viewer's left on scroll to reveal red-shirt kid */
const TABLET_PORTRAIT_PAN_END = '-18%'

function isTabletPortrait(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(min-width: 640px) and (max-width: 1023px) and (orientation: portrait)').matches
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

function PhotoFrame() {
  return (
    <div className="w-full h-full overflow-hidden" style={photoMaskStyle}>
      <HeroPhotoImage className="hero-photo-img absolute inset-0 w-full h-full object-cover" />
    </div>
  )
}

/** In-flow kids photo for phone — edge to edge below Dance Challenge */
export function HeroKidsPhotoMobile() {
  return (
    <div className="hero-photo-mobile sm:hidden relative mt-4" aria-hidden>
      <div className="hero-photo-mobile-blur">
        <HeroPhotoImage enhanced={false} className="hero-photo-mobile-blur-img" />
      </div>
      <div className="hero-photo-mobile-focus">
        <HeroPhotoImage className="hero-photo-img hero-photo-mobile-focus-img" />
      </div>
    </div>
  )
}

export function HeroKidsPhotoBackground({ sectionRef }: HeroKidsPhotoBackgroundProps) {
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const layerOpacity = useTransform(scrollYProgress, [0, 0.45, 0.82, 1], [1, 0.9, 0.35, 0])
  const photoParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', PHOTO_Y_SCROLL_END])
  const photoPanX = useTransform(scrollYProgress, (progress) => {
    if (!isTabletPortrait()) return '0%'
    const eased = smoothScrollProgress(progress)
    const end = parseFloat(TABLET_PORTRAIT_PAN_END)
    return `${eased * end}%`
  })

  const photoPanel = (
    <div className="hero-photo-panel">
      {reducedMotion ? (
        <PhotoFrame />
      ) : (
        <motion.div className="w-full h-full" style={{ x: photoPanX, y: photoParallaxY }}>
          <PhotoFrame />
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
