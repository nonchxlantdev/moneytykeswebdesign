import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from 'react-icons/fi'
import { useTheme } from '@/hooks/useTheme'
import { useActiveSection } from '@/hooks/useActiveSection'
import { DownloadAppButton } from '@/components/ui/DownloadAppButton'
import { AudioControl } from '@/components/layout/AudioControl'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { getAppPage, homeSectionHref, PLANS_NAV_HREF, FAQ_NAV_HREF, plansHref, faqHref } from '@/data/links'

type NavLinkType = 'section' | 'page' | 'plans'

interface NavLink {
  label: string
  href: string
  type: NavLinkType
}

const sectionNavLinks: NavLink[] = [
  { label: 'Home', href: '#home', type: 'section' },
  { label: 'About Us', href: '#who-we-are', type: 'section' },
  { label: 'Features', href: '#features', type: 'section' },
  { label: 'Dashboard', href: '#dashboard', type: 'section' },
  { label: 'Marketplace', href: '#marketplace', type: 'section' },
]

const pageNavLinks: NavLink[] = [
  { label: 'FAQ', href: FAQ_NAV_HREF, type: 'page' },
  { label: 'Plans & Subscription', href: PLANS_NAV_HREF, type: 'plans' },
]

function NavItem({
  link,
  isActive,
  resolveHref,
  onNavigate,
  className = '',
}: {
  link: NavLink
  isActive: boolean
  resolveHref: (href: string) => string
  onNavigate?: () => void
  className?: string
}) {
  const isPlans = link.type === 'plans'
  const isPage = link.type === 'page'

  const textClass = isPlans
    ? isActive
      ? 'text-ink'
      : 'text-accent-text'
    : isPage
      ? isActive
        ? 'text-violet-700 dark:text-violet-300'
        : 'text-ink-muted hover:text-violet-600 dark:hover:text-violet-300'
      : isActive
        ? 'text-primary-text'
        : 'text-ink-muted hover:text-primary-text'

  const shellClass = isPlans
    ? isActive
      ? 'bg-accent border border-accent shadow-[0_2px_14px_rgba(255,213,74,0.45)]'
      : 'bg-accent/15 border border-accent/40 hover:bg-accent/25 hover:border-accent/55'
    : isPage && isActive
      ? 'bg-violet-500/12 border border-violet-500/25 dark:bg-violet-400/15 dark:border-violet-400/30'
      : isActive
        ? 'bg-primary/12 border border-primary/20'
        : 'border border-transparent'

  return (
    <a
      href={resolveHref(link.href)}
      onClick={onNavigate}
      className={`relative px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-semibold whitespace-nowrap rounded-lg shrink-0 transition-[color,background-color,border-color,box-shadow] duration-200 ${textClass} ${shellClass} ${className}`}
    >
      <span className="relative z-10">{link.label}</span>
      {isActive && link.type === 'section' && (
        <span className="absolute bottom-1 left-2.5 right-2.5 xl:left-3 xl:right-3 h-0.5 bg-primary rounded-full" />
      )}
      {isActive && isPage && (
        <span className="absolute bottom-1 left-2.5 right-2.5 xl:left-3 xl:right-3 h-0.5 bg-violet-500 dark:bg-violet-400 rounded-full" />
      )}
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolledRef = useRef(false)
  const { theme, toggle } = useTheme()
  const page = getAppPage()
  const activeHref = useActiveSection(sectionNavLinks.map((l) => l.href))
  const resolveHref = (href: string) => {
    if (href === PLANS_NAV_HREF) return plansHref()
    if (href === FAQ_NAV_HREF) return faqHref()
    return page === 'home' ? href : homeSectionHref(href)
  }

  const isNavActive = (link: NavLink) => {
    if (link.href === PLANS_NAV_HREF) return page === 'plans'
    if (link.href === FAQ_NAV_HREF) return page === 'faq'
    return activeHref === link.href
  }

  useEffect(() => {
    let frame = 0

    const updateScrolled = () => {
      const y = window.scrollY
      const next = scrolledRef.current ? y > 20 : y > 72

      if (next !== scrolledRef.current) {
        scrolledRef.current = next
        setScrolled(next)
      }

      frame = 0
    }

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(updateScrolled)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScrolled()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <nav
        className={`mx-3 sm:mx-4 md:mx-auto md:max-w-7xl rounded-2xl px-3 sm:px-5 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6 xl:gap-8 glass premium-shadow transition-[box-shadow,background-color] duration-300 ${
          scrolled
            ? 'shadow-[0_4px_20px_rgba(7,26,45,0.14)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.45)]'
            : ''
        }`}
        aria-label="Main navigation"
      >
        <a href={resolveHref('#home')} className="flex items-center shrink-0 lg:mr-2 group" data-magnetic>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          >
            <BrandLogo variant="web-nav" />
          </motion.div>
        </a>

        <div className="hidden lg:flex items-center justify-center w-full min-w-0">
          <div className="flex items-center gap-1 xl:gap-1.5">
            {sectionNavLinks.map((link) => (
              <NavItem key={link.href} link={link} isActive={isNavActive(link)} resolveHref={resolveHref} />
            ))}

            <div
              className="w-px h-5 mx-1.5 xl:mx-2 bg-navy/12 dark:bg-white/12 shrink-0"
              aria-hidden="true"
            />

            {pageNavLinks.map((link) => (
              <NavItem key={link.href} link={link} isActive={isNavActive(link)} resolveHref={resolveHref} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 xl:gap-3 shrink-0 lg:justify-self-end">
          <AudioControl />
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-navy/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <FiMoon className="text-ink" /> : <FiSun className="text-accent" />}
          </button>
          <DownloadAppButton size="sm" variant="secondary" className="hidden md:flex shrink-0">
            <FiDownload className="text-sm" />
            Download App
          </DownloadAppButton>
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="text-ink dark:text-white text-xl" /> : <FiMenu className="text-ink dark:text-white text-xl" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden mx-4 mt-2 rounded-2xl glass premium-shadow p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {sectionNavLinks.map((link) => {
              const isActive = isNavActive(link)
              return (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  className={`block py-3 font-medium border-b border-navy/5 dark:border-white/10 transition-colors ${
                    isActive ? 'text-primary-text' : 'text-ink'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              )
            })}

            <div className="my-3 border-t border-navy/8 dark:border-white/10 pt-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle mb-2 px-1">Pages</p>
              {pageNavLinks.map((link) => (
                <NavItem
                  key={link.href}
                  link={link}
                  isActive={isNavActive(link)}
                  resolveHref={resolveHref}
                  onNavigate={() => setMobileOpen(false)}
                  className="block w-full text-left mb-1 last:mb-0"
                />
              ))}
            </div>

            <div className="mt-4">
              <DownloadAppButton
                size="md"
                variant="secondary"
                className="w-full"
                onOpen={() => setMobileOpen(false)}
              >
                <FiDownload />
                Download App
              </DownloadAppButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
