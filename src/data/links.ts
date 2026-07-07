export const OFFICIAL_MUSIC_VIDEO_URL = 'https://youtu.be/FcoHlbgjz5A'

export const DIGIWALLET_LOCATIONS_URL = 'https://www.digiwallet.bz/agents-merchants-location/'

export const PARENT_APP_URL = 'https://app.moneytykes.com/'

export const APP_STORE_URL = 'https://apps.apple.com/us/app/moneytykes/id6757242686'

export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.moneytykes.moneytykes'

export const SUPPORT_EMAIL = 'support@moneytykes.com'

export const SPONSOR_WHATSAPP_URL =
  'https://wa.me/5016139219?text=Hello%2C%20I%20would%20like%20to%20learn%20more%20about%20sponsoring%20with%20Money%20Tykes.'

export const FACEBOOK_URL = 'https://www.facebook.com/p/MoneyTykes-Belize-61584534702964/'

export const INSTAGRAM_URL = 'https://www.instagram.com/moneytykesbelize/'

export type AppPage = 'home' | 'terms' | 'privacy' | 'plans' | 'faq' | 'story'

function basePath(): string {
  return import.meta.env.BASE_URL.replace(/\/?$/, '/')
}

export const PLANS_NAV_HREF = '__plans__'
export const FAQ_NAV_HREF = '__faq__'
export const STORY_NAV_HREF = '__story__'

export function plansHref(): string {
  return `${basePath()}plans`
}

export function faqHref(): string {
  return `${basePath()}faq`
}

export function storyHref(): string {
  return `${basePath()}our-story`
}

export function termsHref(): string {
  return `${basePath()}terms`
}

export function privacyHref(): string {
  return `${basePath()}privacy`
}

export function homeSectionHref(sectionHash = '#home'): string {
  return `${basePath()}${sectionHash}`
}

export function getAppPage(pathname = window.location.pathname): AppPage {
  const normalized = pathname.replace(/\/$/, '')
  if (normalized.endsWith('/terms')) return 'terms'
  if (normalized.endsWith('/privacy')) return 'privacy'
  if (normalized.endsWith('/plans')) return 'plans'
  if (normalized.endsWith('/faq')) return 'faq'
  if (normalized.endsWith('/our-story')) return 'story'
  return 'home'
}

export function isTermsRoute(pathname = window.location.pathname): boolean {
  return getAppPage(pathname) === 'terms'
}
