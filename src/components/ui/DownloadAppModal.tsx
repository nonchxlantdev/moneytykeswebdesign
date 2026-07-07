import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiArrowLeft, FiUsers, FiSmile } from 'react-icons/fi'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { createPortal } from 'react-dom'
import { APP_STORE_URL, GOOGLE_PLAY_URL, PARENT_APP_URL } from '@/data/links'

interface DownloadAppModalProps {
  open: boolean
  onClose: () => void
}

type Step = 'role' | 'parent-signup' | 'platform'

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

const stepMotion = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
}

function ChoiceButton({
  onClick,
  icon: Icon,
  title,
  description,
}: {
  onClick: () => void
  icon: typeof FiUsers
  title: string
  description: string
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-2xl border border-navy/10 dark:border-white/10 bg-surface-base hover:border-primary/35 hover:bg-primary/5 text-left transition-colors"
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
    >
      <span className="w-11 h-11 rounded-xl bg-primary/12 text-primary-text flex items-center justify-center shrink-0">
        <Icon className="text-xl" aria-hidden />
      </span>
      <span>
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-sm text-ink-muted mt-0.5">{description}</span>
      </span>
    </motion.button>
  )
}

export function DownloadAppModal({ open, onClose }: DownloadAppModalProps) {
  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<'parent' | 'child' | null>(null)

  useEffect(() => {
    if (!open) {
      setStep('role')
      setRole(null)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const goBack = () => {
    if (step === 'platform') {
      setStep(role === 'parent' ? 'parent-signup' : 'role')
      return
    }
    if (step === 'parent-signup') {
      setStep('role')
      setRole(null)
    }
  }

  const handleParentSignup = (signedUp: boolean) => {
    if (!signedUp) {
      window.open(PARENT_APP_URL, '_blank', 'noopener,noreferrer')
      onClose()
      return
    }
    setStep('platform')
  }

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
          aria-label="Download Money Tykes app"
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
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              {step !== 'role' ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-navy/5 dark:hover:bg-white/10 transition-colors"
                  aria-label="Go back"
                >
                  <FiArrowLeft className="text-lg text-ink-subtle" />
                </button>
              ) : (
                <span aria-hidden className="w-9" />
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-navy/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <FiX className="text-lg text-ink-subtle" />
              </button>
            </div>

            <div className="pt-8">
              <p className="section-badge mb-3">Download App</p>

              <AnimatePresence mode="wait">
                {step === 'role' && (
                  <motion.div key="role" {...stepMotion}>
                    <h2 className="text-2xl font-bold text-ink mb-2">Who is downloading?</h2>
                    <p className="text-sm text-ink-muted mb-6">
                      We&apos;ll guide you to the right next step for parents and children.
                    </p>
                    <div className="space-y-3">
                      <ChoiceButton
                        icon={FiUsers}
                        title="I'm a Parent"
                        description="Set up or access your parent account first."
                        onClick={() => {
                          setRole('parent')
                          setStep('parent-signup')
                        }}
                      />
                      <ChoiceButton
                        icon={FiSmile}
                        title="I'm a Child"
                        description="Go straight to your app download."
                        onClick={() => {
                          setRole('child')
                          setStep('platform')
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 'parent-signup' && (
                  <motion.div key="parent-signup" {...stepMotion}>
                    <h2 className="text-2xl font-bold text-ink mb-2">Have you signed up?</h2>
                    <p className="text-sm text-ink-muted mb-6">
                      Parents need an account before children can join Money Tykes.
                    </p>
                    <div className="space-y-3">
                      <ChoiceButton
                        icon={FiUsers}
                        title="No, not yet"
                        description="Create your parent account to get started."
                        onClick={() => handleParentSignup(false)}
                      />
                      <ChoiceButton
                        icon={FiUsers}
                        title="Yes, I'm signed up"
                        description="Choose your platform and download the app."
                        onClick={() => handleParentSignup(true)}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 'platform' && (
                  <motion.div key="platform" {...stepMotion}>
                    <h2 className="text-2xl font-bold text-ink mb-2">Choose your platform</h2>
                    <p className="text-sm text-ink-muted mb-6">
                      {role === 'child'
                        ? 'Download Money Tykes on your device.'
                        : 'Get Money Tykes on the device your family uses most.'}
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
                            onClick={onClose}
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
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return modal
  return createPortal(modal, document.body)
}
