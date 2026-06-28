import { useEffect, useState } from 'react'

/**
 * Returns the active nav href based on scroll position.
 * Walks sections in page order — at the top, the first link (Home) stays active.
 */
export function useActiveSection(orderedHrefs: string[]) {
  const [activeHref, setActiveHref] = useState<string | null>(orderedHrefs[0] ?? null)

  useEffect(() => {
    const sections = orderedHrefs
      .map((href) => {
        const id = href.replace('#', '')
        const el = document.getElementById(id)
        return el ? { href, el } : null
      })
      .filter((s): s is { href: string; el: HTMLElement } => s !== null)

    if (sections.length === 0) return

    const pickActive = () => {
      const trigger = window.innerHeight * 0.28
      let current = orderedHrefs[0] ?? null

      for (const { href, el } of sections) {
        const top = el.getBoundingClientRect().top
        if (top <= trigger) {
          current = href
        }
      }

      setActiveHref(current)
    }

    const onScroll = () => pickActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    pickActive()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [orderedHrefs.join('|')])

  return activeHref
}
