import { SUPPORT_EMAIL, homeSectionHref } from '@/data/links'

export const CLASSROOM_LOGIN_URL = 'https://teachers.moneytykes.com/'

export function isClassroomLoginConfigured(): boolean {
  return CLASSROOM_LOGIN_URL.trim().startsWith('https://')
}

export function goToClassroomLogin(): void {
  if (isClassroomLoginConfigured()) {
    window.open(CLASSROOM_LOGIN_URL, '_blank', 'noopener,noreferrer')
  }
}

export const classroomPageMeta =
  'MoneyTykes Classroom is where teachers get directly involved being able to run lessons, quizzes, add grades, administer reward points, and report cards in one place, built for real school days.'

export const classroomHeroTagline = {
  beforeTech: 'Empowering Schools Through ',
  tech: 'Technology',
  mid: '. Inspiring Students Through ',
  innovation: 'Innovation',
  end: '.',
}
export const classroomIntroTitle = 'The Money Tykes Connected Classroom Initiative'

export const classroomIntro = [
  'The Money Tykes Connected Classroom Initiative is a national education software designed to help schools embrace digital learning by providing modern classroom technology, intuitive teaching tools, curriculum-aligned resources, and engaging student experiences.',
  'We believe every classroom should be connected, every teacher should have the tools they need to succeed, and every child should have access to engaging, technology-driven learning.',
] as const

export interface ClassroomFeature {
  id: string
  title: string
  description: string
  badge?: 'New' | 'Soon'
  accent: { bg: string; fg: string }
}

export const classroomFeaturesSection = {
  eyebrow: 'Built for teachers',
  headlineBefore: 'Everything you need to run a ',
  headlineHighlight: 'connected classroom.',
  subtitle:
    'From planning lessons to report cards, Money Tykes simplifies the school day so teachers can focus on teaching.',
}

/** Surrounding feature cards around the Assessment & Grade Centre. */
export const classroomFeatures: ClassroomFeature[] = [
  {
    id: 'lessons',
    title: 'Interactive Lessons',
    description: 'Launch ready made money lessons straight from your browser and keep every class on track.',
    accent: { bg: '#dcfce7', fg: '#16a34a' },
  },
  {
    id: 'assessments',
    title: 'Assessments & Grades',
    description: 'Build quizzes, capture marks, and see grades fill in as students finish their work.',
    accent: { bg: '#fef9c3', fg: '#ca8a04' },
  },
  {
    id: 'parents',
    title: 'Parent Communication',
    description: 'Keep families in the loop from the same MoneyTykes app kids already use at home.',
    accent: { bg: '#dbeafe', fg: '#2563eb' },
  },
  {
    id: 'calendar',
    title: 'Calendar & Planning',
    description: 'Lessons, activities, and due dates live together in one shared classroom calendar.',
    accent: { bg: '#ede9fe', fg: '#7c3aed' },
  },
  {
    id: 'rewards',
    title: 'Rewards & Engagement',
    description: 'Turn good habits into a game with points, badges, and a class leaderboard.',
    accent: { bg: '#dcfce7', fg: '#15803d' },
  },
  {
    id: 'students',
    title: 'Students & Attendance',
    description: 'Keep your full roster and daily attendance organized in one place.',
    accent: { bg: '#ffedd5', fg: '#ea580c' },
  },
  {
    id: 'report-cards',
    title: 'Report Cards',
    description: 'Build report cards, then export or email them home in just a few clicks.',
    accent: { bg: '#fee2e2', fg: '#dc2626' },
  },
  {
    id: 'insights',
    title: 'Classroom Insights',
    description: 'See class progress, money habits, and standout moments at a glance.',
    accent: { bg: '#ede9fe', fg: '#7c3aed' },
  },
]

export const classroomAssessmentCentre = {
  id: 'assessment-centre',
  title: 'Assessment & Grade Centre',
  description:
    'Record marks, weight categories, and calculate grades instantly. Generate report cards with just a few clicks.',
  accent: { bg: '#dbeafe', fg: '#2563eb' },
  quizLabel: 'Quiz 2, Financial Decisions',
  quizMarks: '/ 20 marks',
  average: 91,
  rows: [
    { name: 'Logan Young', mark: '18', pct: '90%', grade: 'A' },
    { name: 'Aysia Spain', mark: '19', pct: '95%', grade: 'A' },
    { name: 'Shamyra Acevedo', mark: '20', pct: '100%', grade: 'A+' },
    { name: 'Omari Guild', mark: '16', pct: '80%', grade: 'B+' },
  ],
}

export const classroomParentCallout = {
  badge: 'Soon',
  title: 'Parents get to see it too',
  body: 'Parents will follow along in the MoneyTykes app, from grades to lesson progress, right alongside what happens in the classroom.',
}

export const classroomLoginPanel = {
  title: 'Ready when your school is',
  body: 'Sign in with the account your school sets up for you.',
  notConfiguredNote: 'Login is not connected yet. Reach out to your MoneyTykes contact to get your school set up.',
}

export const classroomDemoSection = {
  id: 'classroom-demo',
  title: 'Try the Teacher Dashboard',
  body: 'Login is required. Request the demo password from MoneyTykes, then open the live Teacher Dashboard in a new tab to sign in and explore.',
  requestLabel: 'Request demo access',
  requestSub: 'We will send you the demo password',
  openLabel: 'Open Teacher Dashboard',
  openSub: 'Sign in and explore the live demo',
  launchEyebrow: 'Live demo',
  launchTitle: 'Teacher Dashboard',
  launchBody: 'Opens the real Classroom app in a new tab so login and data connections work reliably.',
  launchCta: 'Launch demo',
}

export const classroomClosingHeadline = {
  line1: 'Help Build a',
  highlight: 'Connected Classroom',
  line3: 'in Your Community',
  subtitle:
    'Sponsor a classroom and empower students, support teachers, and invest in the future of Belize.',
}

export interface ClosingBenefit {
  id: string
  title: string
  body: string
  iconFill: string
}

export const classroomClosingBenefits: ClosingBenefit[] = [
  {
    id: 'impact',
    title: 'Make a Real Impact',
    body: 'Your sponsorship provides schools with the technology, tools, and resources they need to thrive.',
    iconFill: '#16a34a',
  },
  {
    id: 'teachers',
    title: 'Support Teachers',
    body: 'Give educators time back with digital tools that simplify planning, grading, and classroom management.',
    iconFill: '#d97706',
  },
  {
    id: 'students',
    title: 'Empower Students',
    body: 'Students gain digital skills, financial literacy, and engaging learning experiences that prepare them for tomorrow.',
    iconFill: '#2563eb',
  },
  {
    id: 'progress',
    title: 'Partner for Progress',
    body: "Align your brand with education and be part of a national movement to transform Belize's classrooms.",
    iconFill: '#7c3aed',
  },
]

export const classroomCtaReadyLabel = 'Ready to get started?'

export const classroomSponsorHref = homeSectionHref('#sponsors')

export const classroomDemoRequestUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('MoneyTykes Classroom demo request')}`

export const classroomDemoAccessUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('MoneyTykes Classroom demo password request')}&body=${encodeURIComponent('Hi MoneyTykes,\n\nI would like the demo password to try the Teacher Dashboard.\n\nName:\nSchool:\nRole:\n\nThank you!')}`

export const classroomImagePlaceholders = {
  login: {
    heading: 'Classroom login preview',
    alt: 'The MoneyTykes Classroom login screen',
  },
  dashboard: {
    heading: 'Dashboard preview',
    alt: 'The MoneyTykes Classroom dashboard',
  },
}

export const classroomChalkWords = [
  'Quizzes',
  'Lessons',
  'Calendar',
  'Grades',
  'Games',
  'Rewards',
  'Students',
]
