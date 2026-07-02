import type { IconType } from 'react-icons'
import {
  FiShield,
  FiCreditCard,
  FiBookOpen,
  FiTarget,
  FiAward,
  FiGift,
  FiStar,
  FiCheckCircle,
} from 'react-icons/fi'

export interface Feature {
  id: string
  title: string
  description: string
  icon: IconType
  gradient: string
}

export const features: Feature[] = [
  {
    id: 'parent-control',
    title: 'Parent Control',
    description: 'Full oversight of chores, spending limits, and approvals — you stay in charge.',
    icon: FiShield,
    gradient: 'from-primary to-blue-500',
  },
  {
    id: 'virtual-wallet',
    title: 'Virtual Wallet',
    description: 'Kids manage virtual coins in a parent-supervised digital wallet. When spending is approved, the deduction comes from the parent wallet.',
    icon: FiCreditCard,
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    id: 'financial-education',
    title: 'Financial Education',
    description: 'Age-appropriate lessons and games that build lifelong money habits.',
    icon: FiBookOpen,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'savings-goals',
    title: 'Savings Goals',
    description: 'Set targets, track progress, and celebrate milestones together.',
    icon: FiTarget,
    gradient: 'from-primary to-teal-400',
  },
  {
    id: 'challenges',
    title: 'Challenges',
    description: 'Gamified tasks that motivate kids to earn, save, and learn.',
    icon: FiAward,
    gradient: 'from-accent to-orange-400',
  },
  {
    id: 'rewards',
    title: 'Rewards',
    description: 'Custom reward systems tailored to your family values.',
    icon: FiGift,
    gradient: 'from-pink-500 to-rose-400',
  },
  {
    id: 'sponsor-programs',
    title: 'Sponsor Programs',
    description: 'Community sponsors fund rewards and educational initiatives.',
    icon: FiStar,
    gradient: 'from-yellow-400 to-accent',
  },
  {
    id: 'approval-system',
    title: 'Approval System',
    description: 'Every reward request and in-app transaction requires parent approval. Approved spending is deducted from the parent wallet.',
    icon: FiCheckCircle,
    gradient: 'from-green-500 to-primary',
  },
]
