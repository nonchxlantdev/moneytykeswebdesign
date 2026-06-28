import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useSound } from '@/hooks/useSound'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
  children: ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark glow-primary',
  secondary: 'bg-accent text-ink hover:bg-accent-dark glow-accent',
  outline: 'border-2 border-primary-text text-primary-text hover:bg-primary/10',
  ghost: 'text-ink dark:text-white hover:bg-navy/5 dark:hover:bg-white/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  children,
  className = '',
  onClick,
  disabled,
  type = 'button',
  href,
  target,
  rel,
}: ButtonProps) {
  const magneticRef = useMagnetic<HTMLButtonElement>(0.25)
  const { playClick } = useSound()
  const classes = `relative overflow-hidden rounded-full font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ borderRadius: '50%' }}
      />
    </>
  )

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    playClick()
    onClick?.(e)
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target ?? '_blank'}
        rel={rel ?? 'noopener noreferrer'}
        className={`inline-flex ${classes}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={magnetic ? magneticRef : undefined}
      type={type}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={handleClick}
    >
      {content}
    </motion.button>
  )
}
