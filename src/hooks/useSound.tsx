import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { themeSong } from '@/audio'
import { isTouchDevice } from '@/hooks/useDevice'

const STORAGE_VOLUME = 'moneytykes-volume'
const STORAGE_MUTED = 'moneytykes-muted'
const DEFAULT_VOLUME = 0.18

interface SoundContextValue {
  muted: boolean
  volume: number
  musicPlaying: boolean
  setVolume: (v: number) => void
  setMuted: (v: boolean) => void
  toggleMute: () => void
  playClick: () => void
  ensureMusicPlaying: () => void
  pauseMusic: () => void
}

const SoundContext = createContext<SoundContextValue>({
  muted: false,
  volume: DEFAULT_VOLUME,
  musicPlaying: false,
  setVolume: () => {},
  setMuted: () => {},
  toggleMute: () => {},
  playClick: () => {},
  ensureMusicPlaying: () => {},
  pauseMusic: () => {},
})

function readVolume(): number {
  try {
    const stored = localStorage.getItem(STORAGE_VOLUME)
    if (stored !== null) {
      const v = parseFloat(stored)
      if (!Number.isNaN(v)) return Math.min(1, Math.max(0, v))
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_VOLUME
}

function readMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_MUTED) === 'true'
  } catch {
    return false
  }
}

export function SoundProvider({
  children,
  ready = true,
}: {
  children: ReactNode
  ready?: boolean
}) {
  const [volume, setVolumeState] = useState(readVolume)
  const [muted, setMutedState] = useState(readMuted)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startedRef = useRef(false)
  const volumeRef = useRef(volume)
  const mutedRef = useRef(muted)

  volumeRef.current = volume
  mutedRef.current = muted

  const applyAudioVolume = useCallback((nextVolume = volumeRef.current, nextMuted = mutedRef.current) => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = nextMuted ? 0 : nextVolume
  }, [])

  const setVolume = useCallback((v: number) => {
    const next = Math.min(1, Math.max(0, v))
    const shouldUnmute = next > 0
    setVolumeState(next)
    volumeRef.current = next
    try {
      localStorage.setItem(STORAGE_VOLUME, String(next))
    } catch {
      /* ignore */
    }
    if (shouldUnmute) {
      setMutedState(false)
      mutedRef.current = false
      try {
        localStorage.setItem(STORAGE_MUTED, 'false')
      } catch {
        /* ignore */
      }
      applyAudioVolume(next, false)
    } else {
      applyAudioVolume(next, mutedRef.current)
    }
  }, [applyAudioVolume])

  const setMuted = useCallback((m: boolean) => {
    setMutedState(m)
    mutedRef.current = m
    try {
      localStorage.setItem(STORAGE_MUTED, String(m))
    } catch {
      /* ignore */
    }
    applyAudioVolume(volumeRef.current, m)
  }, [applyAudioVolume])

  const toggleMute = useCallback(() => {
    setMutedState((prev) => {
      const next = !prev
      mutedRef.current = next
      try {
        localStorage.setItem(STORAGE_MUTED, String(next))
      } catch {
        /* ignore */
      }
      applyAudioVolume(volumeRef.current, next)
      return next
    })
  }, [applyAudioVolume])

  const syncMusicPlaying = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setMusicPlaying(!audio.paused && !audio.ended)
  }, [])

  const tryPlay = useCallback(async (options?: { unmute?: boolean }) => {
    const audio = audioRef.current
    if (!audio) return

    let effectiveMuted = mutedRef.current
    if (options?.unmute && volumeRef.current > 0) {
      effectiveMuted = false
      mutedRef.current = false
      setMutedState(false)
      try {
        localStorage.setItem(STORAGE_MUTED, 'false')
      } catch {
        /* ignore */
      }
    }

    applyAudioVolume(volumeRef.current, effectiveMuted)

    if (startedRef.current && !audio.paused) {
      syncMusicPlaying()
      return
    }

    try {
      await audio.play()
      startedRef.current = true
      syncMusicPlaying()
    } catch {
      setMusicPlaying(false)
    }
  }, [applyAudioVolume, syncMusicPlaying])

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setMusicPlaying(false)
  }, [])

  const ensureMusicPlaying = useCallback(() => {
    void tryPlay({ unmute: true })
  }, [tryPlay])

  useEffect(() => {
    if (!ready) return

    const touch = isTouchDevice()
    const audio = new Audio(themeSong)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = muted ? 0 : volume
    ;(audio as HTMLAudioElement & { playsInline?: boolean }).playsInline = true
    audio.setAttribute('playsinline', '')
    audio.setAttribute('webkit-playsinline', '')
    audioRef.current = audio

    const onPlay = () => syncMusicPlaying()
    const onPause = () => syncMusicPlaying()
    const onPlaying = () => syncMusicPlaying()
    const onEnded = () => syncMusicPlaying()
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('ended', onEnded)

    const onInteract = () => {
      void tryPlay()
    }
    const onReady = () => {
      void tryPlay()
    }

    if (!touch) {
      void tryPlay()
      document.addEventListener('pointerdown', onInteract, { passive: true })
      document.addEventListener('keydown', onInteract)
      audio.addEventListener('canplaythrough', onReady)
      audio.addEventListener('loadeddata', onReady)
    }

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('ended', onEnded)
      if (!touch) {
        document.removeEventListener('pointerdown', onInteract)
        document.removeEventListener('keydown', onInteract)
        audio.removeEventListener('canplaythrough', onReady)
        audio.removeEventListener('loadeddata', onReady)
      }
      audio.pause()
      audio.src = ''
      audioRef.current = null
      startedRef.current = false
    }
  }, [ready, tryPlay, syncMusicPlaying])

  useEffect(() => {
    applyAudioVolume()
    if (!isTouchDevice() && !mutedRef.current && volumeRef.current > 0) {
      void tryPlay()
    }
  }, [volume, muted, tryPlay, applyAudioVolume])

  const playClick = useCallback(() => {
    if (muted) return
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 800
      gain.gain.value = 0.05
      osc.start()
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
      osc.stop(ctx.currentTime + 0.1)
    } catch {
      /* Audio not available */
    }
  }, [muted])

  return (
    <SoundContext.Provider
      value={{ muted, volume, musicPlaying, setVolume, setMuted, toggleMute, playClick, ensureMusicPlaying, pauseMusic }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  return useContext(SoundContext)
}
