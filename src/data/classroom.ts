export const CLASSROOM_LOGIN_URL = ''

export function isClassroomLoginConfigured(): boolean {
  return CLASSROOM_LOGIN_URL.trim().startsWith('https://')
}

export function goToClassroomLogin(): void {
  if (isClassroomLoginConfigured()) {
    window.location.href = CLASSROOM_LOGIN_URL
  }
}

export const classroomPageMeta =
  'MoneyTykes Classroom is the teacher dashboard behind the MoneyTykes app. Run lessons, quizzes, rewards, and report cards in one place, built for real school days.'

export const classroomIntro =
  'MoneyTykes Classroom is a teacher dashboard built to sit right alongside the MoneyTykes app kids already use at home. Teachers get one screen to plan lessons, track attendance, grade work, and reward students, so financial literacy fits naturally into the school day instead of adding one more thing to juggle.'

export interface ClassroomFeature {
  id: string
  title: string
  description: string
  badge?: 'New' | 'Soon'
}

export const classroomFeatures: ClassroomFeature[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'See your whole class at a glance, with daily progress and money habits all in one view.',
  },
  {
    id: 'my-day',
    title: 'My Day',
    description: 'A simple daily task list so you always know what is next without digging through tabs.',
  },
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'Lessons, activities, and due dates live together in one shared calendar.',
  },
  {
    id: 'report-cards',
    title: 'Report Cards',
    description: 'Build report cards, then export or email them home in just a few clicks.',
    badge: 'New',
  },
  {
    id: 'students',
    title: 'Students',
    description: 'Keep your full roster and attendance in one organized place.',
  },
  {
    id: 'lessons',
    title: 'Lessons',
    description: 'A ready made library of money lessons you can launch straight from your browser.',
  },
  {
    id: 'quizzes',
    title: 'Quizzes and Tests',
    description: 'Build a quiz, launch it live, and watch grades fill in automatically.',
    badge: 'Soon',
  },
  {
    id: 'rewards',
    title: 'Rewards',
    description: 'Turn good habits into a game with points and a class leaderboard.',
  },
  {
    id: 'game',
    title: 'Games',
    description: 'Hands on money games students can play right in class.',
  },
]

export const classroomParentCallout = {
  badge: 'Soon',
  title: 'Parents get to see it too',
  body: 'Parents will follow along in the same MoneyTykes app, from grades to lesson progress, right alongside what happens in the classroom.',
}

export const classroomLoginPanel = {
  title: 'Ready when your school is',
  body: 'Sign in with the account your school sets up for you.',
  notConfiguredNote: 'Login is not connected yet. Reach out to your MoneyTykes contact to get your school set up.',
}

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
