import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { FiMusic, FiPlay, FiX } from 'react-icons/fi'
import { useSound } from '@/hooks/useSound'
import { isTouchDevice } from '@/hooks/useDevice'

const PROMPT_KEY = 'moneytykes-music-prompt-answered'

function hasAnsweredPrompt(): boolean {
  try {
    return localStorage.getItem(PROMPT_KEY) === 'true'
  } catch {
    return false
  }
}

function markPromptAnswered() {
  try {
    localStorage.setItem(PROMPT_KEY, 'true')
  } catch {
    /* ignore */
  }
}

export function ThemeSongPrompt() {
  const { ensureMusicPlaying, setMuted } = useSound()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isTouchDevice() || hasAnsweredPrompt()) return
    const timer = window.setTimeout(() => setOpen(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  const close = () => {
    setOpen(false)
    markPromptAnswered()
  }

  const handlePlay = () => {
    setMuted(false)
    ensureMusicPlaying()
    close()
  }

  const handleDecline = () => {
    close()
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDecline()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-song-prompt-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/40 dark:bg-black/55 backdrop-blur-sm"
            aria-label="Close theme song prompt"
            onClick={handleDecline}
          />

          <motion.div
            className="relative w-full max-w-sm rounded-2xl glass premium-shadow p-6 text-center"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={handleDecline}
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-ink-subtle hover:bg-navy/5 dark:hover:bg-white/10 touch-manipulation"
              aria-label="Close"
            >
              <FiX />
            </button>

            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white shadow-[0_8px_24px_rgba(15,175,156,0.35)]">
              <FiMusic className="text-2xl" />
            </div>

            <p className="section-badge mb-3">Theme Song</p>
            <h2 id="theme-song-prompt-title" className="text-xl font-bold text-ink mb-2">
              Play the MoneyTykes theme song?
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              Tap play to enjoy our theme song while you browse. You can pause or adjust volume
              anytime from the speaker icon in the menu.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handlePlay}
                className="w-full min-h-[48px] px-5 py-3 rounded-full bg-primary text-white font-semibold text-sm shadow-[0_4px_16px_rgba(15,175,156,0.35)] hover:bg-primary-dark transition-colors touch-manipulation flex items-center justify-center gap-2"
              >
                <FiPlay className="text-base ml-0.5" />
                Yes, play music
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="w-full min-h-[44px] px-5 py-2.5 rounded-full border border-navy/12 dark:border-white/15 text-ink-muted font-semibold text-sm hover:bg-navy/5 dark:hover:bg-white/10 transition-colors touch-manipulation"
              >
                Not now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
