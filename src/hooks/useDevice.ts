/** True on phones/tablets and other coarse-pointer devices. */
export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return (
    isCoarsePointer() ||
    window.matchMedia('(hover: none)').matches ||
    'ontouchstart' in window
  )
}
