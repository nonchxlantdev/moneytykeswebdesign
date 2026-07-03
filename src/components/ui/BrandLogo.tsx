import { motion } from 'framer-motion'
import { logo, webLogo } from '@/img'

interface BrandLogoProps {
  variant?: 'nav' | 'hero' | 'footer' | 'loading' | 'web' | 'web-nav'
  className?: string
}

const sizes = {
  nav: 'h-10 md:h-11 w-auto',
  web: 'h-16 sm:h-[4.75rem] md:h-[5.5rem] w-auto',
  'web-nav': 'h-8 sm:h-10 md:h-11 lg:h-[3.25rem] w-auto max-w-[7.5rem] sm:max-w-none',
  hero: 'h-28 md:h-36 w-auto',
  footer: 'h-14 w-auto',
  loading: 'h-36 md:h-44 w-auto',
}

export function BrandLogo({ variant = 'nav', className = '' }: BrandLogoProps) {
  const isWebLogo = variant === 'web' || variant === 'web-nav'
  const src = isWebLogo ? webLogo : logo
  const alt = isWebLogo ? 'MoneyTykes' : 'MoneyTykes — Learn. Earn. Level Up.'

  const img = (
    <img
      src={src}
      alt={alt}
      className={`${sizes[variant]} object-contain ${className}`}
      loading={variant === 'loading' ? 'eager' : 'lazy'}
      decoding="async"
    />
  )

  if (variant === 'web') {
    return img
  }

  if (variant === 'web-nav') {
    return (
      <div className="rounded-lg sm:rounded-xl bg-white px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 shadow-sm ring-1 ring-navy/8">
        {img}
      </div>
    )
  }

  if (variant === 'nav') {
    return (
      <div className="rounded-xl bg-navy px-2.5 py-1.5 shadow-md ring-1 ring-white/10">
        {img}
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className="rounded-2xl bg-navy-light/80 px-3 py-2 inline-block ring-1 ring-white/10">
        {img}
      </div>
    )
  }

  return img
}

export function BrandLogoAnimated({ variant = 'loading' }: { variant?: 'loading' | 'hero' }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BrandLogo variant={variant} />
      </motion.div>
    </motion.div>
  )
}
