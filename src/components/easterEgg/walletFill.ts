import coinIcon from '@/img/coinicon.png'

const MT_WIN_TARGET = 60

function createCoinElement(size: number, className: string, zIndex: number): HTMLImageElement {
  const img = document.createElement('img')
  img.src = coinIcon
  img.alt = ''
  img.draggable = false
  img.className = `moneytykes-coin ${className}`.trim()
  img.style.cssText = [
    'position:absolute',
    `width:${size}px`,
    `height:${size}px`,
    'object-fit:contain',
    'pointer-events:none',
    `z-index:${zIndex}`,
    'will-change:transform',
    'display:block',
  ].join(';')
  return img
}

export interface WalletFillOptions {
  touch?: boolean
  reducedMotion?: boolean
}

export interface WalletFillController {
  burst: () => void
  reset: () => void
  destroy: () => void
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function createWalletFill(
  scene: HTMLElement,
  options: WalletFillOptions = {},
): WalletFillController {
  const isTouch = options.touch ?? false
  const reducedMotion = options.reducedMotion ?? prefersReducedMotion()
  const maxBurst = isTouch ? 14 : 22
  const burstStagger = isTouch ? 36 : 28
  const maxSettledNodes = isTouch ? 72 : 110
  const winEmojiCount = isTouch ? 14 : 30
  const burstCooldownMs = isTouch ? 180 : 80

  let taps = 0
  let settled = 0
  let total = 0
  let done = false
  let lastBurstAt = 0

  const logo = scene.querySelector('#mt-logo') as HTMLElement | null
  const clayer = scene.querySelector('#mt-clayer') as HTMLElement | null
  const fillBg = scene.querySelector('#mt-fill-bg') as HTMLElement | null
  const bar = scene.querySelector('#mt-bar') as HTMLElement | null
  const pct = scene.querySelector('#mt-pct') as HTMLElement | null
  const tapBtn = scene.querySelector('#mt-tap-btn') as HTMLButtonElement | null
  const win = scene.querySelector('#mt-win') as HTMLElement | null
  const winCard = scene.querySelector('#mt-win-card') as HTMLElement | null
  const resetBtn = scene.querySelector('#mt-reset-btn') as HTMLButtonElement | null

  if (!logo || !clayer || !fillBg || !win || !winCard || !resetBtn || !tapBtn) {
    return { burst: () => {}, reset: () => {}, destroy: () => {} }
  }

  const logoEl = logo
  const clayerEl = clayer
  const fillBgEl = fillBg
  const barEl = bar
  const pctEl = pct
  const tapBtnEl = tapBtn
  const winEl = win
  const winCardEl = winCard
  const resetBtnEl = resetBtn

  const onReset = () => reset()
  resetBtnEl.addEventListener('click', onReset)

  function pruneSettledNodes() {
    const nodes = scene.querySelectorAll('.mt-settled')
    const overflow = nodes.length - maxSettledNodes
    if (overflow <= 0) return
    for (let i = 0; i < overflow; i++) {
      nodes[i]?.remove()
    }
  }

  function placeSettled(
    settledEl: HTMLElement,
    fx: number,
    fy: number,
    rot?: number,
  ) {
    settledEl.style.left = `${fx}px`
    settledEl.style.top = `${fy}px`
    if (rot !== undefined) settledEl.style.transform = `rotate(${rot}deg)`
    settledEl.style.opacity = '1'
    scene.appendChild(settledEl)
    settled++
    total++
    pruneSettledNodes()
    updateProgress()
  }

  function updateProgress() {
    const percent = Math.min(100, (settled / MT_WIN_TARGET) * 100)
    const visualFill = Math.min(100, percent * 1.12)
    if (barEl) barEl.style.width = `${percent}%`
    if (pctEl) pctEl.textContent = `${Math.round(percent)}%`
    fillBgEl.style.height = `${visualFill}%`
    fillBgEl.style.opacity = String(0.38 + (percent / 100) * 0.52)
    if (settled >= MT_WIN_TARGET && !done) {
      triggerWin()
    }
  }

  function triggerWin() {
    done = true
    tapBtnEl.disabled = true
    tapBtnEl.style.opacity = '0'
    tapBtnEl.style.pointerEvents = 'none'
    fillBgEl.style.height = '100%'
    fillBgEl.style.opacity = '0.92'
    winEl.style.display = 'flex'
    requestAnimationFrame(() => {
      winCardEl.style.transform = 'scale(1)'
      winCardEl.style.opacity = '1'
    })

    const emojis = ['💰', '💵', '✨', '🎉']
    for (let i = 0; i < winEmojiCount; i++) {
      const useCoin = Math.random() < 0.28
      const left = `${8 + Math.random() * 84}%`
      const top = `${10 + Math.random() * 70}%`

      if (useCoin) {
        const img = createCoinElement(22, '', 25)
        img.style.left = left
        img.style.top = top
        img.style.animation = 'mt-float-up 1.2s ease forwards'
        clayerEl.appendChild(img)
        setTimeout(() => img.remove(), 1300)
        continue
      }

      const el = document.createElement('div')
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      el.style.cssText = [
        'position:absolute',
        'pointer-events:none',
        'font-size:22px',
        'z-index:25',
        `left:${left}`,
        `top:${top}`,
        'animation:mt-float-up 1.2s ease forwards',
      ].join(';')
      clayerEl.appendChild(el)
      setTimeout(() => el.remove(), 1300)
    }
  }

  function reset() {
    taps = 0
    settled = 0
    total = 0
    done = false
    tapBtnEl.disabled = false
    tapBtnEl.style.opacity = '1'
    tapBtnEl.style.pointerEvents = ''
    clayerEl.innerHTML = ''
    scene.querySelectorAll('.mt-settled').forEach((el) => el.remove())
    winEl.style.display = 'none'
    winCardEl.style.transform = 'scale(.6)'
    winCardEl.style.opacity = '0'
    if (barEl) barEl.style.width = '0%'
    if (pctEl) pctEl.textContent = '0%'
    fillBgEl.style.height = '0%'
    fillBgEl.style.opacity = '0.35'
  }

  function spawnCoin(sceneRect: DOMRect, cx: number, cy: number) {
    const size = isTouch ? 22 + Math.random() * 14 : 24 + Math.random() * 18

    const settledEl = createCoinElement(size, 'mt-settled', 6)

    const dy = 50 + Math.random() * Math.max(80, sceneRect.height * 0.72)
    const dx = (Math.random() - 0.5) * Math.max(120, sceneRect.width * 0.85)
    const fx = Math.max(4, Math.min(sceneRect.width - size - 4, cx + dx - size / 2))
    const fy = Math.max(4, Math.min(sceneRect.height - size - 4, cy + dy - size / 2))
    settledEl.style.setProperty('--sr', `${(Math.random() - 0.5) * 40}deg`)

    if (reducedMotion) {
      placeSettled(settledEl, fx, fy)
      return
    }

    const el = createCoinElement(size, 'mt-falling', 5)

    const spin = (Math.random() - 0.5) * 540
    const duration = 0.7 + Math.random() * 0.4
    el.style.left = `${cx - size / 2}px`
    el.style.top = `${cy - size / 2}px`
    el.style.setProperty('--dy', `${dy}px`)
    el.style.setProperty('--dx', `${dx}px`)
    el.style.setProperty('--spin', `${spin}deg`)
    el.style.animation = `mt-coin-drop ${duration}s ease-in forwards`

    let finished = false
    const onDone = () => {
      if (finished) return
      finished = true
      el.remove()
      settledEl.style.animation = 'mt-settle .35s ease forwards'
      placeSettled(settledEl, fx, fy)
    }

    el.addEventListener('animationend', onDone, { once: true })
    setTimeout(onDone, duration * 1000 + 120)

    clayerEl.appendChild(el)
  }

  function spawnBill(sceneRect: DOMRect, cx: number, cy: number) {
    const w = isTouch ? 58 + Math.random() * 16 : 64 + Math.random() * 20
    const h = isTouch ? 26 : 28
    const labels = ['$1', '$5', '$10', '$20']
    const label = labels[Math.floor(Math.random() * labels.length)]

    const settledEl = document.createElement('div')
    settledEl.className = 'mt-settled'
    settledEl.textContent = label
    settledEl.style.cssText = [
      'position:absolute',
      `width:${w}px`,
      `height:${h}px`,
      'border-radius:4px',
      'background:#85bb65',
      'border:2px solid #5a8f3c',
      'color:#1a4a0a',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'font-weight:800',
      'font-size:11px',
      'font-family:Arial,sans-serif',
      'pointer-events:none',
      'z-index:6',
      'will-change:transform',
    ].join(';')

    const dy = 40 + Math.random() * Math.max(70, sceneRect.height * 0.75)
    const dx = (Math.random() - 0.5) * Math.max(100, sceneRect.width * 0.8)
    const rot0 = (Math.random() - 0.5) * 30
    const rotf = rot0 + (Math.random() - 0.5) * 120
    const fx = Math.max(4, Math.min(sceneRect.width - w - 4, cx + dx - w / 2))
    const fy = Math.max(4, Math.min(sceneRect.height - h - 4, cy + dy - h / 2))

    if (reducedMotion) {
      placeSettled(settledEl, fx, fy, rotf)
      return
    }

    const el = document.createElement('div')
    el.className = 'mt-falling'
    el.textContent = label
    el.style.cssText = settledEl.style.cssText.replace('mt-settled', 'mt-falling').replace('z-index:6', 'z-index:5')

    const flip = Math.random() < 0.5 ? 1 : -1
    const duration = 0.75 + Math.random() * 0.35
    el.style.left = `${cx - w / 2}px`
    el.style.top = `${cy - h / 2}px`
    el.style.setProperty('--dy', `${dy}px`)
    el.style.setProperty('--dx', `${dx}px`)
    el.style.setProperty('--rot0', `${rot0}deg`)
    el.style.setProperty('--rotf', `${rotf}deg`)
    el.style.setProperty('--flip', String(flip))
    el.style.animation = `mt-bill-drop ${duration}s ease-in forwards`

    let finished = false
    const onDone = () => {
      if (finished) return
      finished = true
      el.remove()
      placeSettled(settledEl, fx, fy, rotf)
    }

    el.addEventListener('animationend', onDone, { once: true })
    setTimeout(onDone, duration * 1000 + 120)

    clayerEl.appendChild(el)
  }

  function burst() {
    if (done) return

    const now = performance.now()
    if (now - lastBurstAt < burstCooldownMs) return
    lastBurstAt = now

    taps++
    if (!reducedMotion) {
      logoEl.classList.remove('mt-shake')
      void logoEl.offsetWidth
      logoEl.classList.add('mt-shake')
      setTimeout(() => logoEl.classList.remove('mt-shake'), 500)
    }

    const sceneRect = scene.getBoundingClientRect()
    const count = Math.min(8 + Math.floor(taps * (isTouch ? 1.6 : 2.2)), maxBurst)
    const billChance = taps < 3 ? 0.28 : 0.5

    for (let i = 0; i < count; i++) {
      const isBill = Math.random() < billChance
      const cx = sceneRect.width * (0.12 + Math.random() * 0.76)
      const cy = sceneRect.height * (0.1 + Math.random() * 0.42)
      setTimeout(() => {
        if (isBill) spawnBill(sceneRect, cx, cy)
        else spawnCoin(sceneRect, cx, cy)
      }, i * burstStagger)
    }
  }

  function destroy() {
    resetBtnEl.removeEventListener('click', onReset)
    reset()
  }

  return { burst, reset, destroy }
}

// Global hooks for spec compatibility
declare global {
  interface Window {
    mtBurst?: () => void
    mtReset?: () => void
  }
}

export function bindWalletFillGlobals(controller: WalletFillController) {
  window.mtBurst = () => controller.burst()
  window.mtReset = () => controller.reset()
}

export function unbindWalletFillGlobals() {
  delete window.mtBurst
  delete window.mtReset
}
