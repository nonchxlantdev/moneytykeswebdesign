import { motion } from 'framer-motion'
import { FiPlay } from 'react-icons/fi'
import { danceChallengeHref } from '@/data/links'
import { useSound } from '@/hooks/useSound'

interface DanceChallengeCtaProps {
  className?: string
  fullWidth?: boolean
}

export function DanceChallengeCta({ className = '', fullWidth = false }: DanceChallengeCtaProps) {
  const { playClick } = useSound()

  return (
    <motion.a
      href={danceChallengeHref()}
      className={`dc-home-cta group relative inline-flex items-center justify-center overflow-hidden ${
        fullWidth ? 'w-full' : 'shrink-0'
      } ${className}`}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => playClick()}
      aria-label="Enter the MoneyTykes Dance Challenge — open now"
    >
      <span className="dc-home-cta-shine" aria-hidden />
      <span className="dc-home-cta-pulse" aria-hidden />

      <span className="relative z-10 flex flex-col items-start leading-tight text-left">
        <span className="dc-home-cta-eyebrow">Open now · Cash prizes</span>
        <span className="dc-home-cta-label">
          <FiPlay className="dc-home-cta-icon" aria-hidden />
          Dance Challenge!
        </span>
        <span className="dc-home-cta-sub">Tap to enter &amp; win</span>
      </span>
    </motion.a>
  )
}
