export interface SponsorTier {
  id: string
  name: string
  amount: string
  benefits: string[]
  color: string
  icon: string
}

export const sponsorTiers: SponsorTier[] = [
  {
    id: 'gold',
    name: 'Gold',
    amount: '$5,000+',
    benefits: ['Logo on homepage', 'Featured in app', 'Quarterly reports', 'VIP events access'],
    color: 'from-yellow-400 via-accent to-amber-500',
    icon: '🥇',
  },
  {
    id: 'silver',
    name: 'Silver',
    amount: '$2,500+',
    benefits: ['Logo in sponsor section', 'App recognition', 'Bi-annual reports', 'Community events'],
    color: 'from-slate-500 via-slate-400 to-zinc-600',
    icon: '🥈',
  },
  {
    id: 'bronze',
    name: 'Bronze',
    amount: '$1,000+',
    benefits: ['Name listing', 'Newsletter mention', 'Annual report', 'Social media shoutout'],
    color: 'from-amber-600 via-orange-500 to-amber-700',
    icon: '🥉',
  },
]

export const sponsorLogos = [
  'Belize Bank', 'Heritage Bank', 'BTL', 'Belize Tourism', 'Smart Belize',
  'Atlantic Bank', 'Belize Energy', 'Citrus Products', 'Belize Agro', 'Caribbean Dev',
]
