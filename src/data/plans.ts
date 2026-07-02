export type PlanFeatureValue =
  | { type: 'yes' }
  | { type: 'no' }
  | { type: 'text'; value: string }

export interface PlanFeature {
  label: string
  value: PlanFeatureValue
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  cadence?: string
  sublabel: string
  ctaLabel: string
  featured?: boolean
  features: PlanFeature[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'easy-start',
    name: 'Easy Start',
    price: 'Free',
    sublabel: '1 child · No credit card needed',
    ctaLabel: 'Get Started Free',
    features: [
      { label: 'Parent & Child Accounts', value: { type: 'yes' } },
      { label: 'Assign & Track Chores', value: { type: 'text', value: 'Limited — 5 per month' } },
      { label: 'Educational Videos', value: { type: 'no' } },
      { label: 'Coins & Points', value: { type: 'yes' } },
      { label: 'Vendor Browsing', value: { type: 'yes' } },
      { label: 'DigiWallet', value: { type: 'text', value: 'Read-only' } },
      { label: 'Purchase Approvals', value: { type: 'no' } },
      { label: 'Savings Tracker', value: { type: 'no' } },
      { label: 'Financial Games', value: { type: 'no' } },
      { label: 'Parent Dashboard', value: { type: 'text', value: 'Basic' } },
      { label: 'Local Rewards', value: { type: 'no' } },
      { label: 'Multi-Child Profiles', value: { type: 'no' } },
      { label: 'Custom Avatar', value: { type: 'no' } },
      { label: 'Sponsored Challenges', value: { type: 'no' } },
      { label: 'Early Feature Access', value: { type: 'no' } },
      { label: 'Customer Support', value: { type: 'text', value: 'Standard' } },
    ],
  },
  {
    id: 'family-control',
    name: 'Family Control Plan',
    price: '$12 BZD',
    cadence: '/ month',
    sublabel: 'Unlimited kids · Cancel anytime',
    ctaLabel: 'Start Family Plan',
    featured: true,
    features: [
      { label: 'Parent & Child Accounts', value: { type: 'yes' } },
      { label: 'Assign & Track Chores', value: { type: 'text', value: 'Unlimited' } },
      { label: 'Educational Videos', value: { type: 'text', value: 'Unlimited' } },
      { label: 'Coins & Points', value: { type: 'yes' } },
      { label: 'Vendor Browsing', value: { type: 'yes' } },
      { label: 'DigiWallet', value: { type: 'text', value: 'Full integration' } },
      { label: 'Purchase Approvals', value: { type: 'text', value: 'QR + parental approval' } },
      { label: 'Savings Tracker', value: { type: 'yes' } },
      { label: 'Financial Games', value: { type: 'text', value: 'Unlimited' } },
      { label: 'Parent Dashboard', value: { type: 'text', value: 'Progress reports' } },
      { label: 'Local Rewards', value: { type: 'text', value: 'Vendor offers' } },
      { label: 'Multi-Child Profiles', value: { type: 'yes' } },
      { label: 'Custom Avatar', value: { type: 'yes' } },
      { label: 'Sponsored Challenges', value: { type: 'yes' } },
      { label: 'Early Feature Access', value: { type: 'yes' } },
      { label: 'Customer Support', value: { type: 'text', value: 'Priority' } },
    ],
  },
]

export interface PlansFaqItem {
  id: string
  question: string
  answer: string
}

export const plansFaqItems: PlansFaqItem[] = [
  {
    id: 'switch-plans',
    question: 'Can I switch plans later?',
    answer:
      'Yes, you can upgrade or cancel anytime from your parent dashboard. No long-term contracts.',
  },
  {
    id: 'child-data',
    question: "Is my child's data safe?",
    answer:
      'Absolutely. MoneyTykes is built with family safety first. Children never access real funds directly, and all activity requires parental oversight.',
  },
  {
    id: 'digiwallet',
    question: 'How does DigiWallet work with the app?',
    answer:
      'The Easy Start plan gives read-only access so kids can see how digital wallets work. The Family Control Plan unlocks full integration with parent-approved transactions. When spending is approved, the deduction is made from the parent wallet.',
  },
  {
    id: 'payment-methods',
    question: 'What payment methods do you accept?',
    answer:
      'Payments are processed through our approved local banking and digital wallet partners. No card info is stored by MoneyTykes directly.',
  },
  {
    id: 'free-trial',
    question: 'Is there a free trial for the Family Plan?',
    answer:
      "We're working on it! For now, the Easy Start plan is always free so you can explore before upgrading.",
  },
]

export const plansTrustItems = [
  {
    icon: '🔒',
    title: 'Parent Controlled',
    description: 'Every action needs your approval',
  },
  {
    icon: '🇧🇿',
    title: 'Made in Belize',
    description: 'Built for Belizean families',
  },
  {
    icon: '📵',
    title: 'No Ads. Ever.',
    description: 'Kids stay focused on learning',
  },
] as const
