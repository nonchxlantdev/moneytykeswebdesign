import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  bindWalletFillGlobals,
  createWalletFill,
  unbindWalletFillGlobals,
  type WalletFillController,
} from '@/components/easterEgg/walletFill'
import { isTouchDevice } from '@/hooks/useDevice'

interface WalletFillSceneProps {
  children: ReactNode
}

export function WalletFillScene({ children }: WalletFillSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<WalletFillController | null>(null)
  const tapLockRef = useRef(false)
  const [showTapHint, setShowTapHint] = useState(true)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const touch = isTouchDevice()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const controller = createWalletFill(scene, { touch, reducedMotion })
    controllerRef.current = controller
    bindWalletFillGlobals(controller)

    const resetBtn = scene.querySelector('#mt-reset-btn')
    const onReset = () => setShowTapHint(true)
    resetBtn?.addEventListener('click', onReset)

    return () => {
      resetBtn?.removeEventListener('click', onReset)
      controller.destroy()
      controllerRef.current = null
      unbindWalletFillGlobals()
    }
  }, [])

  const handleTap = () => {
    if (tapLockRef.current) return
    tapLockRef.current = true
    setShowTapHint(false)
    controllerRef.current?.burst()
    window.setTimeout(() => {
      tapLockRef.current = false
    }, 160)
  }

  return (
    <div
      id="mt-scene"
      ref={sceneRef}
      className="relative overflow-hidden w-full h-full flex flex-col items-center justify-center gap-4 px-4 sm:px-8 pt-10 sm:pt-16 pb-6 sm:pb-10 text-center touch-manipulation [-webkit-overflow-scrolling:touch]"
      style={{ contain: 'layout paint', WebkitTapHighlightColor: 'transparent' }}
    >
      <div
        id="mt-clayer"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1, transform: 'translateZ(0)' }}
      />
      <div
        id="mt-fill-bg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 0,
          background:
            'linear-gradient(to top,#E8A800 0%,#F7C400 35%,#ffe066 70%,#fff4a8 100%)',
          boxShadow: 'inset 0 8px 24px rgba(255,255,255,0.35)',
          zIndex: 2,
          transition: 'height .35s ease, opacity .35s ease',
          opacity: 0.35,
          pointerEvents: 'none',
          transform: 'translateZ(0)',
        }}
      />

      <div className="relative z-[3] flex items-center justify-center select-none pointer-events-none">
        {children}
      </div>

      <div className="relative z-[12] mt-auto shrink-0">
        <button
          id="mt-tap-btn"
          type="button"
          onClick={handleTap}
          className="relative px-6 py-2.5 rounded-full bg-accent text-ink font-bold text-sm shadow-[0_4px_16px_rgba(255,213,74,0.45)] hover:bg-accent-dark active:scale-[0.97] transition-transform transition-colors touch-manipulation min-h-[44px] min-w-[44px]"
        >
          {showTapHint ? (
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 pointer-events-none z-10"
              aria-hidden="true"
            >
              <span className="mt-tap-hint relative block text-2xl sm:text-3xl leading-none drop-shadow-[0_2px_6px_rgba(46,31,122,0.3)]">
                👆
                <span className="mt-tap-ring absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-2 border-primary/55" />
              </span>
            </span>
          ) : null}
          <span className="relative z-[1]">Charge Wallet</span>
        </button>
      </div>

      {/* Hidden progress tracking — fill only, no visible wallet bar */}
      <div id="mt-progress-wrap" style={{ display: 'none' }} aria-hidden="true">
        <span id="mt-pct">0%</span>
        <div id="mt-bar" style={{ width: '0%' }} />
      </div>

      <div
        id="mt-win"
        style={{
          display: 'none',
          position: 'absolute',
          inset: 0,
          zIndex: 30,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          pointerEvents: 'none',
        }}
      >
        <div
          id="mt-win-card"
          style={{
            background: '#2E1F7A',
            borderRadius: 20,
            padding: '28px 40px',
            textAlign: 'center',
            transform: 'scale(.6)',
            opacity: 0,
            transition: 'transform .5s cubic-bezier(.34,1.56,.64,1),opacity .4s ease',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ fontSize: 42, marginBottom: 8 }}>🏆</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#fff',
              fontFamily: 'Arial,sans-serif',
              lineHeight: 1.35,
              maxWidth: 260,
            }}
          >
            Great job, your wallet is full!
          </div>
          <button
            id="mt-reset-btn"
            type="button"
            style={{
              marginTop: 20,
              background: '#F7C400',
              color: '#2E1F7A',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 800,
              fontFamily: 'Arial,sans-serif',
              cursor: 'pointer',
              minHeight: 44,
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Start over
          </button>
        </div>
      </div>
    </div>
  )
}
