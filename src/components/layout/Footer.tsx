import { motion } from 'framer-motion'
import { FiMail, FiMapPin } from 'react-icons/fi'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  TIKTOK_URL,
  YOUTUBE_URL,
  SUPPORT_EMAIL,
  danceChallengeHref,
  faqHref,
  getAppPage,
  homeSectionHref,
  privacyHref,
  storyHref,
  termsHref,
} from '@/data/links'
import { BrandLogo } from '@/components/ui/BrandLogo'

const quickLinks = [
  { label: 'Our Story', href: '__story_page__' },
  { label: 'Dance Challenge', href: '__dance_challenge_page__' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#journey' },
  { label: 'FAQ', href: '__faq_page__' },
]

const partnerLinks = [{ label: 'Be A Sponsor', href: '#sponsors' }]

const socials = [
  { icon: FaFacebook, href: FACEBOOK_URL, label: 'Facebook' },
  { icon: FaInstagram, href: INSTAGRAM_URL, label: 'Instagram' },
  { icon: FaTiktok, href: TIKTOK_URL, label: 'TikTok' },
  { icon: FaYoutube, href: YOUTUBE_URL, label: 'YouTube' },
]

export function Footer() {
  const page = getAppPage()
  const resolveHref = (href: string) => {
    if (href === '__faq_page__') return faqHref()
    if (href === '__story_page__') return storyHref()
    if (href === '__dance_challenge_page__') return danceChallengeHref()
    return page === 'home' ? href : homeSectionHref(href)
  }

  return (
    <footer className="relative bg-surface-secondary text-ink border-t border-navy/10 dark:bg-navy dark:text-white dark:border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-16 opacity-[0.06] dark:opacity-10 text-ink dark:text-white pointer-events-none">
        <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,80 L60,60 L120,70 L180,40 L240,55 L300,30 L360,50 L420,25 L480,45 L540,20 L600,40 L660,35 L720,50 L780,30 L840,45 L900,25 L960,40 L1020,30 L1080,50 L1140,35 L1200,45 L1260,30 L1320,50 L1380,40 L1440,55 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="mb-2">
              <BrandLogo variant="web" />
            </div>
            <p className="text-ink-muted dark:text-white/80 text-sm leading-relaxed mb-6">
              Belize&apos;s premier family fintech platform teaching kids smart money habits through chores, rewards, and savings goals.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-navy/5 dark:bg-white/10 flex items-center justify-center hover:bg-primary/15 dark:hover:bg-primary/20 transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                >
                  <Icon className="text-ink-muted dark:text-white/90" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-ink dark:text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={resolveHref(link.href)}
                    className="text-ink-muted dark:text-white/85 hover:text-primary-text dark:hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink dark:text-white mb-3">Partners</h4>
            <ul className="space-y-2">
              {partnerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={resolveHref(link.href)}
                    className="text-ink-muted dark:text-white/85 hover:text-primary-text dark:hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* Newsletter — hidden for now; remove `hidden` to restore */}
            <div className="hidden">
              <h4 className="font-semibold text-ink dark:text-white mb-3">Newsletter</h4>
              <p className="text-ink-muted dark:text-white/80 text-sm mb-3">
                Get tips on teaching kids about money.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-navy/12 dark:border-white/10 text-sm text-ink dark:text-white placeholder:text-ink-subtle dark:placeholder:text-white/30 focus:outline-none focus:border-primary"
                />
                <motion.button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMail />
                </motion.button>
              </form>
            </div>

            <h4 className="font-semibold text-ink dark:text-white mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-ink-muted dark:text-white/75">
              <p className="flex items-center gap-2">
                <FiMapPin className="text-primary-text dark:text-primary shrink-0" /> Belize City, Belize
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="text-primary-text dark:text-primary shrink-0" />
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="hover:text-primary-text dark:hover:text-primary transition-colors"
                >
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-navy/10 dark:border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink-subtle dark:text-white/75">
          <p>&copy; {new Date().getFullYear()} MoneyTykes Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href={privacyHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink dark:hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href={termsHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink dark:hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
