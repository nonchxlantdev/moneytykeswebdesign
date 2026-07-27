import { useSyncExternalStore } from 'react'

export type PointerPosition = { x: number; y: number; active: boolean }

const initial: PointerPosition = { x: 0, y: 0, active: false }

let snapshot: PointerPosition = initial
const listeners = new Set<() => void>()
let attached = false
let rafId = 0
let pending: { x: number; y: number } | null = null

function emit() {
  listeners.forEach((listener) => listener())
}

function onMove(e: MouseEvent) {
  pending = { x: e.clientX, y: e.clientY }
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    if (!pending) return
    snapshot = { x: pending.x, y: pending.y, active: true }
    pending = null
    emit()
  })
}

function attach() {
  if (attached || typeof window === 'undefined') return
  attached = true
  window.addEventListener('mousemove', onMove, { passive: true })
}

function detach() {
  if (!attached || listeners.size > 0) return
  attached = false
  window.removeEventListener('mousemove', onMove)
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  pending = null
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  attach()
  return () => {
    listeners.delete(listener)
    detach()
  }
}

function getSnapshot() {
  return snapshot
}

function getServerSnapshot() {
  return initial
}

/** Single shared mousemove listener, rAF-throttled. */
export function usePointerPosition(enabled = true): PointerPosition {
  const current = useSyncExternalStore(
    enabled ? subscribe : () => () => {},
    getSnapshot,
    getServerSnapshot,
  )
  return enabled ? current : initial
}
