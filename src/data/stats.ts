export interface Stat {
  id: string
  value: number
  suffix: string
  label: string
  prefix?: string
}

export const stats: Stat[] = [
  { id: 'kids', value: 10000, suffix: '+', label: 'Kids Learning' },
  { id: 'vendors', value: 500, suffix: '+', label: 'Vendor Partners' },
  { id: 'sponsors', value: 100, suffix: '+', label: 'Sponsors' },
  { id: 'coins', value: 5, suffix: 'M+', label: 'Coins Earned', prefix: '' },
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
  { id: 'purchase', label: 'Purchase Approved', icon: '🛍️', description: 'Spending at partner vendors' },
]
