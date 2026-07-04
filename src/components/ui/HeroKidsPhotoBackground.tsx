import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'
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

function HeroPhotoImage({ className }: { className: string }) {
  return (
    <>
      <HeroPhotoSharpenFilter />
      <img
        src={kidsLearningTogether}
        alt=""
        draggable={false}
        className={className}
        style={photoImgStyle}
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

function PhotoFrame({ parallaxY }: { parallaxY?: MotionValue<string> }) {
  const inner = (
    <div className="w-full h-full overflow-hidden" style={photoMaskStyle}>
      <HeroPhotoImage className="hero-photo-img absolute inset-0 w-full h-full object-cover" />
    </div>
  )

  if (parallaxY !== undefined) {
    return (
      <motion.div className="w-full h-full" style={{ y: parallaxY }}>
        {inner}
      </motion.div>
    )
  }

  return inner
}

/** In-flow kids photo for phone — sits below Dance Challenge */
export function HeroKidsPhotoMobile() {
  return (
    <div className="hero-photo-mobile sm:hidden relative w-full overflow-hidden rounded-xl mt-3" aria-hidden>
      <HeroPhotoImage className="hero-photo-img w-full h-full object-cover" />
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

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block" aria-hidden>
        <div className="hero-photo-panel">
          <PhotoFrame />
        </div>
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
      <div className="hero-photo-panel">
        <PhotoFrame parallaxY={photoParallaxY} />
      </div>
      <PhotoScrim />
    </motion.div>
  )
}
