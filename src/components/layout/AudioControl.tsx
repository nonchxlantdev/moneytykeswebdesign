import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiVolume2, FiVolumeX, FiVolume1, FiPlay, FiPause } from 'react-icons/fi'
import { useSound } from '@/hooks/useSound'
import { isTouchDevice } from '@/hooks/useDevice'

function VolumePanel({
  sliderValue,
  muted,
  musicPlaying,
  toggleMute,
  ensureMusicPlaying,
  pauseMusic,
  touchUi,
  className,
  onClose,
  onVolumeChange,
}: {
  sliderValue: number
  muted: boolean
  musicPlaying: boolean
  toggleMute: () => void
  ensureMusicPlaying: () => void
  pauseMusic: () => void
  touchUi: boolean
  className?: string
  onClose?: () => void
  onVolumeChange: (next: number) => void
}) {
  const handlePlayPause = () => {
    if (musicPlaying) {
      pauseMusic()
      return
    }
    ensureMusicPlaying()
  }

  const audible = musicPlaying && !muted

  return (
    <motion.div
      role="dialog"
      aria-label="Volume controls"
      className={`p-4 rounded-2xl glass premium-shadow z-[60] ${className ?? ''}`}
      initial={{ opacity: 0, y: -6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-subtle">Theme Song</p>
        <span className="text-xs font-semibold text-primary-text tabular-nums">
          {Math.round(sliderValue * 100)}%
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
        value={Math.round(sliderValue * 100)}
        onInput={(e) => onVolumeChange(Number(e.currentTarget.value) / 100)}
        onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
        style={{ '--fill': `${Math.round(sliderValue * 100)}%` } as React.CSSProperties}
        className="audio-slider w-full mb-3 touch-manipulation py-4"
        aria-label="Theme song volume"
      />

      <button
        type="button"
        onClick={() => {
          if (touchUi && muted && !musicPlaying) ensureMusicPlaying()
          toggleMute()
          if (!touchUi) onClose?.()
        }}
        className="w-full min-h-[44px] py-2.5 rounded-xl text-sm font-semibold transition-colors bg-navy/5 dark:bg-white/10 text-ink hover:bg-primary/10 hover:text-primary-text touch-manipulation"
      >
        {muted && !audible ? 'Unmute' : 'Mute'}
      </button>

      {touchUi ? (
        <p className="text-xs text-center text-ink-subtle leading-relaxed mt-3">
          Drag the slider to adjust volume. Music starts when you tap play.
        </p>
      ) : null}
    </motion.div>
  )
}

export function AudioControl() {
  const { muted, volume, musicPlaying, setVolume, toggleMute, ensureMusicPlaying, pauseMusic } = useSound()
  const [open, setOpen] = useState(false)
  const [touchUi, setTouchUi] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTouchUi(isTouchDevice())
  }, [])

  useEffect(() => {
    if (!open || !touchUi) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return
      setOpen(false)
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

  const handleVolumeChange = useCallback(
    (next: number) => {
      setVolume(next)
      if (touchUi && next > 0 && musicPlaying) {
        ensureMusicPlaying()
      }
    },
    [setVolume, touchUi, musicPlaying, ensureMusicPlaying],
  )

  const sliderValue = touchUi || musicPlaying ? volume : muted ? 0 : volume
  const iconLevel = musicPlaying ? volume : muted ? 0 : volume

  const VolumeIcon =
    musicPlaying && volume > 0
      ? volume < 0.35
        ? FiVolume1
        : FiVolume2
      : iconLevel === 0
        ? FiVolumeX
        : iconLevel < 0.35
          ? FiVolume1
          : FiVolume2

  const panelProps = {
    sliderValue,
    muted,
    musicPlaying,
    toggleMute,
    ensureMusicPlaying,
    pauseMusic,
    onVolumeChange: handleVolumeChange,
  }

  const mobilePanel =
    touchUi && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {open ? (
              <div ref={panelRef}>
                <VolumePanel
                  {...panelProps}
                  touchUi
                  onClose={() => setOpen(false)}
                  className="fixed left-4 right-4 top-[calc(4.5rem+env(safe-area-inset-top))] max-w-sm mx-auto"
                />
              </div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null

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
        className={`w-9 h-9 min-w-9 min-h-9 flex items-center justify-center rounded-full transition-colors touch-manipulation ${
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

      {mobilePanel}

      <AnimatePresence>
        {open && !touchUi ? (
          <VolumePanel
            {...panelProps}
            touchUi={false}
            onClose={() => setOpen(false)}
            className="absolute top-full right-0 mt-2 w-56"
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
