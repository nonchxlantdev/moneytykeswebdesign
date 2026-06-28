import { motion } from 'framer-motion'

interface MascotImageProps {
  src: string
  alt: string
  className?: string
  float?: boolean
  /** Use on light backgrounds — removes black PNG backdrop */
  blendOnLight?: boolean
}

export function MascotImage({
  src,
  alt,
  className = '',
  float = true,
  blendOnLight = true,
}: MascotImageProps) {
  const blend = blendOnLight
    ? 'mix-blend-lighten dark:mix-blend-normal'
    : ''

  if (!float) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${blend} ${className}`}
        loading="lazy"
        decoding="async"
        aria-hidden={alt === '' ? true : undefined}
      />
    )
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${blend} ${className}`}
      loading="lazy"
      decoding="async"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
