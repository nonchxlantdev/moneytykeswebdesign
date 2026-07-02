import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from 'react-icons/fi'
import { useTheme } from '@/hooks/useTheme'
import { useActiveSection } from '@/hooks/useActiveSection'
import { DownloadAppButton } from '@/components/ui/DownloadAppButton'
import { AudioControl } from '@/components/layout/AudioControl'
import { getAppPage, homeSectionHref, PLANS_NAV_HREF, plansHref } from '@/data/links'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#journey' },
  { label: 'Features', href: '#features' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Levels', href: '#levels' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Vendors', href: '#vendors' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Plans', href: PLANS_NAV_HREF },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const page = getAppPage()
  const activeHref = useActiveSection(navLinks.map((l) => l.href).filter((h) => h !== PLANS_NAV_HREF))
  const resolveHref = (href: string) => {
    if (href === PLANS_NAV_HREF) return plansHref()
    return page === 'home' ? href : homeSectionHref(href)
  }

  const isNavActive = (href: string) => {
    if (href === PLANS_NAV_HREF) return page === 'plans'
    return activeHref === href
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-[env(safe-area-inset-top)] ${
        scrolled ? 'py-3' : 'py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <nav
        className="mx-3 sm:mx-4 md:mx-auto md:max-w-7xl rounded-2xl px-3 sm:px-5 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-8 transition-all duration-500 glass premium-shadow"
        aria-label="Main navigation"
      >
        <a href={resolveHref('#home')} className="flex items-center gap-2 group shrink-0 lg:mr-2" data-magnetic>
          <motion.div
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold text-sm"
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            MT
          </motion.div>
          <span className="text-lg sm:text-xl font-bold text-ink">
            Money<span className="text-primary-text">Tykes</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center justify-evenly w-full min-w-0 px-2 xl:px-6">
          {navLinks.map((link) => {
            const isActive = isNavActive(link.href)
            return (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className={`relative px-2 xl:px-3 py-2 text-[13px] xl:text-sm font-semibold whitespace-nowrap transition-colors rounded-lg shrink-0 ${
                  isActive ? 'text-primary-text' : 'text-ink-muted hover:text-primary-text'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg bg-primary/12 border border-primary/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-line"
                    className="absolute bottom-0 left-2 right-2 xl:left-3 xl:right-3 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            )
          })}
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
            {navLinks.map((link) => {
              const isActive = isNavActive(link.href)
              return (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  className={`block py-3 font-medium border-b border-navy/5 dark:border-white/10 last:border-0 transition-colors ${
                    isActive ? 'text-primary-text' : 'text-ink'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              )
            })}
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
