import { motion } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp } from '@/animations/variants'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeading({ badge, title, subtitle, align = 'center', dark }: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-8 md:mb-10 lg:mb-6 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {badge && <span className="section-badge">{badge}</span>}
      <h2
        className={`text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight mb-2 md:mb-3 lg:mb-2 ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg lg:text-base leading-relaxed ${
            dark ? 'text-white/90' : 'text-ink-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  dark?: boolean
  compact?: boolean
}

export function AnimatedSection({
  children,
  className = '',
  id,
  dark,
  compact = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const padding = compact
    ? 'py-10 md:py-12 lg:py-8'
    : 'py-14 md:py-16 lg:py-10 xl:py-12'

  return (
    <section
      ref={ref}
      id={id}
      className={`relative px-4 md:px-8 ${padding} ${dark ? 'bg-navy text-white' : ''} ${className}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  )
}
