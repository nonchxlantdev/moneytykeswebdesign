import { motion } from 'framer-motion'
import { logo } from '@/img'

interface BrandLogoProps {
  variant?: 'nav' | 'hero' | 'footer' | 'loading'
  className?: string
}

const sizes = {
  nav: 'h-10 md:h-11 w-auto',
  hero: 'h-28 md:h-36 w-auto',
  footer: 'h-14 w-auto',
  loading: 'h-36 md:h-44 w-auto',
}

export function BrandLogo({ variant = 'nav', className = '' }: BrandLogoProps) {
  const img = (
    <img
      src={logo}
      alt="MoneyTykes — Learn. Earn. Level Up."
      className={`${sizes[variant]} object-contain ${className}`}
      loading={variant === 'loading' ? 'eager' : 'lazy'}
      decoding="async"
    />
  )

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
