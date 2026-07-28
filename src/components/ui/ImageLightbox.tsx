import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'

const MIN_SCALE = 1
const MAX_SCALE = 4
const DOUBLE_TAP_MS = 280
const TAP_MOVE_PX = 10

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function midpoint(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}

function LightboxOverlay({
  src,
  alt,
  layoutId,
  onClose,
}: {
  src: string
  alt: string
  layoutId: string
  onClose: () => void
}) {
  const reduceMotion = useReducedMotion()
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const scaleRef = useRef(1)
  const offsetRef = useRef({ x: 0, y: 0 })
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinchStart = useRef<{
    distance: number
    scale: number
    mid: { x: number; y: number }
    offset: { x: number; y: number }
  } | null>(null)
  const panStart = useRef<{ x: number; y: number; offset: { x: number; y: number } } | null>(null)
  const lastTap = useRef<{ t: number; x: number; y: number } | null>(null)
  const moved = useRef(false)
  const closing = useRef(false)
  const pendingTapClose = useRef<number | null>(null)

  const syncTransform = useCallback((nextScale: number, nextOffset: { x: number; y: number }) => {
    const s = clamp(nextScale, MIN_SCALE, MAX_SCALE)
    const o = s <= 1.01 ? { x: 0, y: 0 } : nextOffset
    scaleRef.current = s
    offsetRef.current = o
    setScale(s)
    setOffset(o)
  }, [])

  const requestClose = useCallback(() => {
    if (closing.current) return
    closing.current = true
    if (pendingTapClose.current != null) {
      window.clearTimeout(pendingTapClose.current)
      pendingTapClose.current = null
    }
    // Snap zoom back so shared-layout exit lands on the thumbnail cleanly
    syncTransform(1, { x: 0, y: 0 })
    requestAnimationFrame(() => onClose())
  }, [onClose, syncTransform])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      if (pendingTapClose.current != null) window.clearTimeout(pendingTapClose.current)
    }
  }, [requestClose])

  const onPointerDown = (e: ReactPointerEvent) => {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    moved.current = false

    if (pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values())
      const a = pts[0]!
      const b = pts[1]!
      pinchStart.current = {
        distance: distance(a, b),
        scale: scaleRef.current,
        mid: midpoint(a, b),
        offset: { ...offsetRef.current },
      }
      panStart.current = null
      return
    }

    if (scaleRef.current > 1.01) {
      panStart.current = {
        x: e.clientX,
        y: e.clientY,
        offset: { ...offsetRef.current },
      }
    } else {
      panStart.current = null
    }
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2 && pinchStart.current) {
      const pts = Array.from(pointers.current.values())
      const a = pts[0]!
      const b = pts[1]!
      const d = distance(a, b)
      const ratio = d / Math.max(1, pinchStart.current.distance)
      const nextScale = pinchStart.current.scale * ratio
      const mid = midpoint(a, b)
      syncTransform(nextScale, {
        x: pinchStart.current.offset.x + (mid.x - pinchStart.current.mid.x),
        y: pinchStart.current.offset.y + (mid.y - pinchStart.current.mid.y),
      })
      moved.current = true
      return
    }

    if (panStart.current && pointers.current.size === 1) {
      const dx = e.clientX - panStart.current.x
      const dy = e.clientY - panStart.current.y
      if (Math.hypot(dx, dy) > TAP_MOVE_PX) moved.current = true
      syncTransform(scaleRef.current, {
        x: panStart.current.offset.x + dx,
        y: panStart.current.offset.y + dy,
      })
    }
  }

  const endPointer = (e: ReactPointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinchStart.current = null
    if (pointers.current.size === 0) panStart.current = null

    if (e.type !== 'pointerup' || pointers.current.size !== 0 || moved.current) return

    const now = performance.now()
    const prev = lastTap.current
    const isDouble =
      !!prev &&
      now - prev.t < DOUBLE_TAP_MS &&
      Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 28

    if (isDouble) {
      lastTap.current = null
      if (pendingTapClose.current != null) {
        window.clearTimeout(pendingTapClose.current)
        pendingTapClose.current = null
      }
      if (scaleRef.current > 1.05) syncTransform(1, { x: 0, y: 0 })
      else syncTransform(2.2, { x: 0, y: 0 })
      return
    }

    lastTap.current = { t: now, x: e.clientX, y: e.clientY }

    if (scaleRef.current <= 1.05) {
      pendingTapClose.current = window.setTimeout(() => {
        pendingTapClose.current = null
        if (lastTap.current && lastTap.current.t === now) {
          lastTap.current = null
          requestClose()
        }
      }, DOUBLE_TAP_MS)
    }
  }

  const onWheel = (e: ReactWheelEvent) => {
    e.preventDefault()
    const factor = e.deltaY > 0 ? 0.9 : 1.1
    syncTransform(scaleRef.current * factor, offsetRef.current)
  }

  return (
    <motion.div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Enlarged image'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
    >
      <button
        type="button"
        className="image-lightbox__backdrop"
        aria-label="Close enlarged image"
        onClick={requestClose}
      />

      <button type="button" className="image-lightbox__close" aria-label="Close" onClick={requestClose}>
        <FiX aria-hidden />
      </button>

      <div
        className="image-lightbox__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onWheel={onWheel}
      >
        <motion.div
          className="image-lightbox__pan"
          animate={{ x: offset.x, y: offset.y, scale }}
          transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.7 }}
        >
          <motion.img
            layoutId={layoutId}
            src={src}
            alt={alt}
            className="image-lightbox__img"
            draggable={false}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : { type: 'spring', stiffness: 280, damping: 28, mass: 0.85 }
            }
          />
        </motion.div>
      </div>

      <p className="image-lightbox__hint" aria-hidden>
        Pinch or scroll to zoom · Tap or ✕ to close
      </p>
    </motion.div>
  )
}

/** Clickable image that opens a zoomable fullscreen lightbox. */
export function LightboxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  children,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Optional overlay content rendered inside the trigger (e.g. tape). */
  children?: ReactNode
}) {
  const layoutId = useId()
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <>
      <button
        type="button"
        className={`lightbox-trigger ${className}`.trim()}
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
      >
        {children}
        <motion.img
          layoutId={layoutId}
          src={src}
          alt=""
          aria-hidden
          className={imgClassName}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ opacity: open ? 0 : 1 }}
          transition={reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 280, damping: 28 }}
        />
      </button>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <LightboxOverlay
                src={src}
                alt={alt}
                layoutId={layoutId}
                onClose={() => setOpen(false)}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
