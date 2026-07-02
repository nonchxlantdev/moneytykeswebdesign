import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiVolume2, FiVolumeX, FiVolume1, FiPlay, FiPause } from 'react-icons/fi'
import { useSound } from '@/hooks/useSound'
import { isTouchDevice } from '@/hooks/useDevice'

function VolumePanel({
  displayVolume,
  muted,
  musicPlaying,
  setVolume,
  toggleMute,
  ensureMusicPlaying,
  pauseMusic,
  touchUi,
  className,
  onClose,
}: {
  displayVolume: number
  muted: boolean
  musicPlaying: boolean
  setVolume: (v: number) => void
  toggleMute: () => void
  ensureMusicPlaying: () => void
  pauseMusic: () => void
  touchUi: boolean
  className?: string
  onClose?: () => void
}) {
  const handlePlayPause = () => {
    if (musicPlaying) {
      pauseMusic()
      return
    }
    if (muted) toggleMute()
    ensureMusicPlaying()
  }

  return (
    <motion.div
      role="dialog"
      aria-label="Volume controls"
      className={`p-4 rounded-2xl glass premium-shadow z-[60] ${className ?? ''}`}
      initial={{ opacity: 0, y: -6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-subtle">Theme Song</p>
        <span className="text-xs font-semibold text-primary-text tabular-nums">
          {Math.round(displayVolume * 100)}%
        </span>
      </div>

      {touchUi ? (
        <button
          type="button"
          onClick={handlePlayPause}
          className="w-full min-h-[44px] py-2.5 mb-3 rounded-xl text-sm font-semibold transition-colors bg-primary text-white hover:bg-primary-dark touch-manipulation flex items-center justify-center gap-2"
        >
          {musicPlaying ? (
            <>
              <FiPause className="text-base" />
              Pause Theme Song
            </>
          ) : (
            <>
              <FiPlay className="text-base ml-0.5" />
              Play Theme Song
            </>
          )}
        </button>
      ) : null}

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(displayVolume * 100)}
        onChange={(e) => {
          const next = Number(e.target.value) / 100
          if (!touchUi) ensureMusicPlaying()
          setVolume(next)
        }}
        style={{ '--fill': `${Math.round(displayVolume * 100)}%` } as React.CSSProperties}
        className="audio-slider w-full mb-3 touch-manipulation min-h-[44px]"
        aria-label="Theme song volume"
      />

      {!touchUi ? (
        <button
          type="button"
          onClick={() => {
            ensureMusicPlaying()
            toggleMute()
            onClose?.()
          }}
          className="w-full min-h-[44px] py-2.5 rounded-xl text-sm font-semibold transition-colors bg-navy/5 dark:bg-white/10 text-ink hover:bg-primary/10 hover:text-primary-text touch-manipulation"
        >
          {muted ? 'Unmute' : 'Mute'}
        </button>
      ) : (
        <p className="text-xs text-center text-ink-subtle leading-relaxed">
          Music won&apos;t start until you tap play. Use the slider to lower or raise volume.
        </p>
      )}
    </motion.div>
  )
}

export function AudioControl() {
  const { muted, volume, musicPlaying, setVolume, toggleMute, ensureMusicPlaying, pauseMusic } = useSound()
  const [open, setOpen] = useState(false)
  const [touchUi, setTouchUi] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTouchUi(isTouchDevice())
  }, [])

  useEffect(() => {
    if (!open || !touchUi) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, touchUi])

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    if (touchUi) return
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setOpen(false), 280)
  }, [clearCloseTimer, touchUi])

  const handleOpen = useCallback(() => {
    if (touchUi) return
    clearCloseTimer()
    setOpen(true)
  }, [clearCloseTimer, touchUi])

  const handleToggle = useCallback(() => {
    if (touchUi) {
      setOpen((o) => !o)
      return
    }
    ensureMusicPlaying()
    toggleMute()
  }, [touchUi, toggleMute, ensureMusicPlaying])

  const displayVolume = muted ? 0 : volume
  const VolumeIcon =
    displayVolume === 0 && !musicPlaying
      ? FiVolumeX
      : displayVolume === 0
        ? FiVolumeX
        : displayVolume < 0.35
          ? FiVolume1
          : FiVolume2

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={`w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors touch-manipulation ${
          open || musicPlaying || !muted
            ? 'bg-primary/10 text-primary-text'
            : 'hover:bg-navy/5 dark:hover:bg-white/10 text-ink-subtle'
        }`}
        aria-label={touchUi ? 'Theme song controls' : muted ? 'Unmute theme song' : 'Mute theme song'}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <VolumeIcon className="text-lg" />
      </button>

      <AnimatePresence>
        {open && (
          touchUi ? (
            <VolumePanel
              displayVolume={displayVolume}
              muted={muted}
              musicPlaying={musicPlaying}
              setVolume={setVolume}
              toggleMute={toggleMute}
              ensureMusicPlaying={ensureMusicPlaying}
              pauseMusic={pauseMusic}
              touchUi
              onClose={() => setOpen(false)}
              className="fixed left-4 right-4 top-[calc(4.5rem+env(safe-area-inset-top))] max-w-sm mx-auto"
            />
          ) : (
            <VolumePanel
              displayVolume={displayVolume}
              muted={muted}
              musicPlaying={musicPlaying}
              setVolume={setVolume}
              toggleMute={toggleMute}
              ensureMusicPlaying={ensureMusicPlaying}
              pauseMusic={pauseMusic}
              touchUi={false}
              className="absolute top-full right-0 mt-2 w-56"
            />
          )
        )}
      </AnimatePresence>
    </div>
  )
}
