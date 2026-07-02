export const whoWeAreCopy =
  "Money Tykes is more than an app. We are Belize's first integrated youth financial literacy ecosystem, designed to help children ages 5–17 develop lifelong financial habits while giving parents, educators, businesses, and financial institutions the tools to support them.\n\nThrough interactive lessons, challenges, rewards, parent engagement, and future financial partnerships, Money Tykes transforms financial education into real-life experiences that prepare young people for adulthood."

export const missionCopy =
  'To empower every child in Belize with the financial knowledge, confidence, and practical skills needed to make informed financial decisions throughout life.'

export const visionCopy =
  "To become Belize's leading youth financial literacy ecosystem by connecting families, schools, businesses, merchants, and financial institutions through innovative educational technology and responsible financial experiences."

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
  comingSoon?: boolean
}

export const ecosystemMembers: EcosystemMember[] = [
  {
    id: 'families',
    emoji: '👨‍👩‍👧',
    title: 'Families',
    description:
      "Empowering parents to teach, guide, reward, and monitor their children's financial development through meaningful everyday experiences.",
  },
  {
    id: 'children',
    emoji: '🧒',
    title: 'Children & Teens (Ages 5–17)',
    description:
      'Building confidence through interactive lessons, financial challenges, savings goals, entrepreneurship, and parent-guided financial decision-making.',
  },
  {
    id: 'schools',
    emoji: '🏫',
    title: 'Schools',
    description:
      'Supporting teachers with engaging classroom lessons, digital learning tools, competitions, progress tracking, and parent connectivity through the Money Tykes platform.',
    comingSoon: true,
  },
  {
    id: 'businesses',
    emoji: '🏢',
    title: 'Businesses & Community Partners',
    description:
      "Creating meaningful educational campaigns, supporting youth financial literacy initiatives, and investing in Belize's future workforce.",
  },
  {
    id: 'merchants',
    emoji: '🛍️',
    title: 'Merchants',
    description:
      'Connecting families with parent-approved educational promotions and future youth-focused reward experiences. When spending is approved, the deduction is made from the parent wallet.',
  },
  {
    id: 'financial',
    emoji: '🏦',
    title: 'Financial Institutions',
    description:
      'Partnering with regulated financial institutions to expand responsible financial learning experiences while maintaining secure banking infrastructure and parental oversight.',
  },
]
