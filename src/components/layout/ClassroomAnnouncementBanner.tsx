import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { classroomHref } from '@/data/links'

const STORAGE_KEY = 'mt-classroom-banner-dismissed'

export function ClassroomAnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      /* ignore */
    }
    setVisible(true)
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  if (!visible) return null

  return (
    <div className="relative w-full bg-gradient-to-r from-[#c8f06a] via-[#b8e84a] to-[#d4f57a] text-navy border-b border-navy/10">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8 py-2.5 flex items-center justify-center gap-2 sm:gap-3 pr-10 sm:pr-12">
        <p className="text-center text-[13px] sm:text-sm font-semibold leading-snug">
          Introducing MoneyTykes Classroom: Teacher&apos;s Needs All In One Place.
        </p>
        <a
          href={classroomHref()}
          className="shrink-0 inline-flex items-center justify-center rounded-lg bg-[#0b2b26] px-3 py-1.5 text-xs sm:text-sm font-bold text-white hover:bg-[#123e35] transition-colors"
        >
          Learn More
        </a>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-navy/10 transition-colors touch-manipulation"
        aria-label="Dismiss announcement"
      >
        <FiX className="text-navy text-lg" />
      </button>
    </div>
  )
}
