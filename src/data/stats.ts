export interface Stat {
  id: string
  label: string
  value?: number
  suffix?: string
  prefix?: string
  display?: string
}

export const stats: Stat[] = [
  { id: 'families', value: 200, suffix: '+', label: 'Families' },
  { id: 'kids', value: 200, suffix: '+', label: 'Kids Learning' },
  { id: 'vendors', value: 20, suffix: '+', label: 'Vendor Partners' },
  { id: 'coins', value: 2, suffix: 'K+', label: 'Coins Earned' },
  { id: 'rating', label: 'Rating', display: '4.9★' },
]

export const phoneScreens = [
  { id: 'dashboard', label: 'Dashboard', color: '#0FAF9C' },
  { id: 'wallet', label: 'Wallet', color: '#3B82F6' },
  { id: 'rewards', label: 'Rewards', color: '#8B5CF6' },
  { id: 'challenges', label: 'Challenges', color: '#FFD54A' },
  { id: 'approval', label: 'Parent Approval', color: '#F59E0B' },
  { id: 'transactions', label: 'Transactions', color: '#10B981' },
  { id: 'savings', label: 'Savings', color: '#EC4899' },
]

export const journeySteps = [
  { id: 'assign', label: 'Assign Chore', icon: '📋', description: 'Parent creates a task' },
  { id: 'complete', label: 'Kid Completes', icon: '✅', description: 'Child finishes the chore' },
  { id: 'earn', label: 'Coins Earned', icon: '🪙', description: 'Virtual coins are awarded' },
  { id: 'approve', label: 'Parent Approves', icon: '👍', description: 'Parent confirms completion' },
  { id: 'wallet', label: 'Wallet Updates', icon: '💳', description: 'Balance reflects earnings' },
  { id: 'purchase', label: 'Reward Approved', icon: '🛍️', description: 'Parent approves; parent wallet is deducted' },
]
