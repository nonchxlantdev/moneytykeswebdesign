import type { IconType } from 'react-icons'
import { FiBookOpen, FiCreditCard, FiShield, FiStar, FiMonitor, FiUsers, FiAward, FiBarChart2 } from 'react-icons/fi'
import { sponsorFamily, sponsorClassroom } from '@/img'

export interface SponsorProgramBenefit {
  icon: IconType
  label: string
}

export interface SponsorProgram {
  id: string
  tag: string
  tagIcon: string
  title: string
  description: string
  image: string
  imageAlt: string
  accent: 'family' | 'classroom'
  benefits: SponsorProgramBenefit[]
}

export const sponsorPrograms: SponsorProgram[] = [
  {
    id: 'family',
    tag: 'Sponsor a Family',
    tagIcon: '💛',
    title: 'Empower a Family',
    description:
      'Give a Belizean family access to Money Tykes and help children learn, earn, save, and grow with confidence — at home.',
    image: sponsorFamily,
    imageAlt: 'Belizean family learning together at home',
    accent: 'family',
    benefits: [
      { icon: FiBookOpen, label: 'Access to financial literacy lessons' },
      { icon: FiCreditCard, label: 'Virtual wallet & rewards' },
      { icon: FiShield, label: 'Parent controls & approvals' },
      { icon: FiStar, label: 'Fun challenges & activities' },
    ],
  },
  {
    id: 'classroom',
    tag: 'Sponsor a Classroom',
    tagIcon: '🏫',
    title: 'Transform a Classroom',
    description:
      'Equip a Belizean classroom with technology that connects teachers, students and parents while delivering engaging financial literacy and digital learning experience all school year.',
    image: sponsorClassroom,
    imageAlt: 'Belizean classroom with students learning with Money Tykes',
    accent: 'classroom',
    benefits: [
      { icon: FiMonitor, label: 'Digital classroom access' },
      { icon: FiUsers, label: 'Teacher training & dashboard' },
      { icon: FiAward, label: 'Student activities & challenges' },
      { icon: FiBarChart2, label: 'Real-time insights & reporting' },
    ],
  },
]
