export const DANCE_CHALLENGE_META =
  'Enter the MoneyTykes Dance Challenge — learn the theme song, record your routine, and win cash prizes. Open to active MoneyTykes users ages 5–17. Submit by August 7th, 2026.'

export const SUBMIT_URL =
  'https://script.google.com/macros/s/AKfycbwDDB7qmIc-v3Ek6pWFTJOAsZIPEkoMUy1j3lVCqe1iDodrjfFwsObxn9co28dH455l/exec'

export function isSubmitUrlConfigured(): boolean {
  return (
    Boolean(SUBMIT_URL) &&
    SUBMIT_URL.startsWith('https://') &&
    !SUBMIT_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT')
  )
}

export const howItWorksSteps = [
  {
    id: 'learn',
    number: 1,
    title: 'LEARN',
    description: 'Watch the official MoneyTykes Theme Song on YouTube.',
  },
  {
    id: 'dance',
    number: 2,
    title: 'DANCE',
    description: 'Learn a move or create your own routine!',
  },
  {
    id: 'record',
    number: 3,
    title: 'RECORD',
    description: 'Record a 30–60 second video.',
  },
  {
    id: 'submit',
    number: 4,
    title: 'SUBMIT',
    description: 'Parents upload the video through the official portal — it goes straight to our Google Drive.',
  },
] as const

export const prizeItems = [
  {
    id: 'first',
    icon: '🏆',
    title: '1st Place Team',
    detail: '$1,000 Cash Prize!',
    burst: 'gold' as const,
  },
  {
    id: 'second',
    icon: '🥈',
    title: '2nd Place Team',
    detail: '$500 Cash Prize!',
    burst: 'silver' as const,
  },
  {
    id: 'special',
    icon: '🎁',
    title: 'Special Prizes & Surprises!',
    detail: '',
    burst: 'gift' as const,
  },
] as const

/** Max dance-video upload size (Google Apps Script / browser-friendly) */
export const MAX_VIDEO_BYTES = 40 * 1024 * 1024

export const ACCEPTED_VIDEO_TYPES = 'video/mp4,video/quicktime,video/webm,video/x-msvideo,.mp4,.mov,.webm,.avi'

export const keyDates = [
  {
    id: 'submit',
    label: 'Submit your video by',
    date: 'August 7th, 2026',
  },
  {
    id: 'announce',
    label: 'Winners announced at the MoneyTykes Grand Launch',
    date: 'August 29th, 2026',
  },
] as const

export const eligibilityItems = [
  'Active MoneyTykes users only',
  'Ages 5–17',
  'Only engagement on official MoneyTykes pages will count',
] as const
