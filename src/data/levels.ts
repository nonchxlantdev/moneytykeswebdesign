export interface LearningLevel {
  id: string
  name: string
  ageRange: string
  description: string
  skills: string[]
  color: string
  icon: string
}

export const learningLevels: LearningLevel[] = [
  {
    id: 'tykers',
    name: 'Tykers',
    ageRange: '5–7',
    description: 'Introduction to coins, simple chores, and saving for small rewards.',
    skills: ['Coin recognition', 'Basic chores', 'First savings jar'],
    color: 'from-primary to-teal-400',
    icon: '🌱',
  },
  {
    id: 'questers',
    name: 'Questers',
    ageRange: '8–10',
    description: 'Budgeting basics, goal setting, and responsible spending decisions.',
    skills: ['Budgeting', 'Goal tracking', 'Smart spending'],
    color: 'from-blue-500 to-cyan-400',
    icon: '🧭',
  },
  {
    id: 'pathfinders',
    name: 'Pathfinders',
    ageRange: '11–13',
    description: 'Advanced savings, parent-approved vendor rewards, and financial challenges.',
    skills: ['Vendor rewards', 'Challenges', 'Interest concepts'],
    color: 'from-purple-500 to-violet-400',
    icon: '🗺️',
  },
  {
    id: 'master-tykes',
    name: 'Master Tykes',
    ageRange: '14–17',
    description: 'Practical financial literacy, entrepreneurship, and long-term planning.',
    skills: ['Entrepreneurship', 'Investing basics', 'Financial planning'],
    color: 'from-accent to-amber-500',
    icon: '👑',
  },
]
