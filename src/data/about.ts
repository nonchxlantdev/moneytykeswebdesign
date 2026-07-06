export {
  homeAboutTeaser as whoWeAreCopy,
  missionCopy,
  visionCopy,
} from './story'

export const differentiatorIntro =
  'Instead of teaching children about money, we help them experience it.'

export const differentiatorItems = [
  'Completing financial literacy lessons',
  'Setting savings goals',
  'Earning rewards',
  'Participating in family activities',
  'Building healthy financial habits',
  'Applying knowledge in everyday situations',
]

export const differentiatorClosing =
  'Every experience is designed to strengthen financial confidence while keeping parents actively involved.'

export interface EcosystemMember {
  id: string
  emoji: string
  title: string
  description: string
  shortDescription: string
  comingSoon?: boolean
}

export const ecosystemMembers: EcosystemMember[] = [
  {
    id: 'families',
    emoji: '👨‍👩‍👧',
    title: 'Families',
    shortDescription: 'Parents teach, guide, and reward everyday money habits at home.',
    description:
      "Empowering parents to teach, guide, reward, and monitor their children's financial development through meaningful everyday experiences.",
  },
  {
    id: 'children',
    emoji: '🧒',
    title: 'Children & Teens (Ages 5–17)',
    shortDescription: 'Interactive lessons, challenges, and parent-guided decisions.',
    description:
      'Building confidence through interactive lessons, financial challenges, savings goals, entrepreneurship, and parent-guided financial decision-making.',
  },
  {
    id: 'schools',
    emoji: '🏫',
    title: 'Schools',
    shortDescription: 'Classroom tools, progress tracking, and parent connectivity.',
    description:
      'Supporting teachers with engaging classroom lessons, digital learning tools, competitions, progress tracking, and parent connectivity through the Money Tykes platform.',
    comingSoon: true,
  },
  {
    id: 'businesses',
    emoji: '🏢',
    title: 'Businesses & Community Partners',
    shortDescription: 'Campaigns and initiatives that invest in Belize’s youth.',
    description:
      "Creating meaningful educational campaigns, supporting youth financial literacy initiatives, and investing in Belize's future workforce.",
  },
  {
    id: 'merchants',
    emoji: '🛍️',
    title: 'Merchants',
    shortDescription: 'Parent-approved promotions and reward experiences.',
    description:
      'Connecting families with parent-approved educational promotions and future youth-focused reward experiences. When spending is approved, the deduction is made from the parent wallet.',
  },
  {
    id: 'financial',
    emoji: '🏦',
    title: 'Financial Institutions',
    shortDescription: 'Secure, regulated learning with parental oversight.',
    description:
      'Partnering with regulated financial institutions to expand responsible financial learning experiences while maintaining secure banking infrastructure and parental oversight.',
  },
]
