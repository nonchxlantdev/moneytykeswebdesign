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

  const setVolume = useCallback((v: number) => {
    const next = Math.min(1, Math.max(0, v))
    setVolumeState(next)
    try {
      localStorage.setItem(STORAGE_VOLUME, String(next))
    } catch {
      /* ignore */
    }
    if (next > 0) {
      setMutedState(false)
      try {
        localStorage.setItem(STORAGE_MUTED, 'false')
      } catch {
        /* ignore */
      }
    }
  }, [])

  const setMuted = useCallback((m: boolean) => {
    setMutedState(m)
    try {
      localStorage.setItem(STORAGE_MUTED, String(m))
    } catch {
      /* ignore */
    }
  }, [])

  const toggleMute = useCallback(() => {
    setMutedState((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_MUTED, String(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    if (startedRef.current && !audio.paused) {
      setMusicPlaying(true)
      return
    }
    try {
      await audio.play()
      startedRef.current = true
      setMusicPlaying(true)
    } catch {
      setMusicPlaying(false)
    }
  }, [])

  const ensureMusicPlaying = useCallback(() => {
    void tryPlay()
  }, [tryPlay])

  useEffect(() => {
    if (!ready) return

    const audio = new Audio(themeSong)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = muted ? 0 : volume
    ;(audio as HTMLAudioElement & { playsInline?: boolean }).playsInline = true
    audio.setAttribute('playsinline', '')
    audio.setAttribute('webkit-playsinline', '')
    audioRef.current = audio

    const onInteract = () => {
      void tryPlay()
    }
    const onReady = () => {
      void tryPlay()
    }

    void tryPlay()

    document.addEventListener('pointerdown', onInteract, { passive: true })
    document.addEventListener('touchstart', onInteract, { passive: true })
    document.addEventListener('keydown', onInteract)
    audio.addEventListener('canplaythrough', onReady)
    audio.addEventListener('loadeddata', onReady)

    return () => {
      document.removeEventListener('pointerdown', onInteract)
      document.removeEventListener('touchstart', onInteract)
      document.removeEventListener('keydown', onInteract)
      audio.removeEventListener('canplaythrough', onReady)
      audio.removeEventListener('loadeddata', onReady)
      audio.pause()
      audio.src = ''
      audioRef.current = null
      startedRef.current = false
    }
  }, [ready, tryPlay])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = muted ? 0 : volume
    if (!muted && volume > 0) {
      void tryPlay()
    }
  }, [volume, muted, tryPlay])

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
      value={{ muted, volume, musicPlaying, setVolume, setMuted, toggleMute, playClick, ensureMusicPlaying }}
    >
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  return useContext(SoundContext)
}
