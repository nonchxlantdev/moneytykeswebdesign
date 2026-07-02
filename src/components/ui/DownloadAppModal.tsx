import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { createPortal } from 'react-dom'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/data/links'

interface DownloadAppModalProps {
  open: boolean
  onClose: () => void
}

const storeOptions = [
  {
    label: 'Download on the App Store',
    href: APP_STORE_URL,
    icon: FaApple,
    gradient: 'from-navy to-navy-light',
  },
  {
    label: 'Get it on Google Play',
    href: GOOGLE_PLAY_URL,
    icon: FaGooglePlay,
    gradient: 'from-primary to-blue-600',
  },
]

export function DownloadAppModal({ open, onClose }: DownloadAppModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-label="Choose your app store"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close download options"
          />

          <motion.div
            className="relative w-full max-w-md rounded-2xl card-light premium-shadow-lg p-6 md:p-8"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center hover:bg-navy/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <FiX className="text-lg text-ink-subtle" />
            </button>

            <p className="section-badge mb-3">Download App</p>
            <h2 className="text-2xl font-bold text-ink mb-2 pr-8">Choose your platform</h2>
            <p className="text-sm text-ink-muted mb-6">
              Get MoneyTykes on the device your family uses most.
            </p>

            <div className="space-y-3">
              {storeOptions.map((store) => {
                const Icon = store.icon
                return (
                  <motion.a
                    key={store.label}
                    href={store.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${store.gradient} text-white premium-shadow transition-transform`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Icon className="text-2xl" />
                    </span>
                    <span className="font-semibold text-sm md:text-base">{store.label}</span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return modal
  return createPortal(modal, document.body)
}
