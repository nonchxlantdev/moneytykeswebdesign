import { motion } from 'framer-motion'
import { GlowCard } from '@/components/ui/GlowCard'
import { FiBell, FiCheck, FiClock, FiTrendingUp } from 'react-icons/fi'
import { staggerContainer, fadeInUp } from '@/animations/variants'
import { CoinImage } from '@/components/ui/CoinImage'
import { isTouchDevice } from '@/hooks/useDevice'

const approvals = [
  { child: 'Sofia', action: 'Completed "Clean Room"', coins: 50, time: '2m ago' },
  { child: 'Marcus', action: 'Wants to buy Ice Cream', coins: -25, time: '15m ago' },
  { child: 'Sofia', action: 'Completed "Math Homework"', coins: 75, time: '1h ago' },
]

const pendingChores = [
  { task: 'Take out trash', child: 'Marcus', reward: 30 },
  { task: 'Feed the dog', child: 'Sofia', reward: 20 },
  { task: 'Wash dishes', child: 'Marcus', reward: 40 },
]

export function ParentDashboardPanel() {
  const touch = isTouchDevice()
  const pieSegments = [
    { percent: 40, color: '#0FAF9C', label: 'Savings' },
    { percent: 30, color: '#3B82F6', label: 'Spending' },
    { percent: 20, color: '#FFD54A', label: 'Rewards' },
    { percent: 10, color: '#8B5CF6', label: 'Goals' },
  ]

  let cumulative = 0
  const piePaths = pieSegments.map((seg) => {
    const start = cumulative
    cumulative += seg.percent
    const startAngle = (start / 100) * 360 - 90
    const endAngle = (cumulative / 100) * 360 - 90
    const largeArc = seg.percent > 50 ? 1 : 0
    const r = 60
    const x1 = 80 + r * Math.cos((startAngle * Math.PI) / 180)
    const y1 = 80 + r * Math.sin((startAngle * Math.PI) / 180)
    const x2 = 80 + r * Math.cos((endAngle * Math.PI) / 180)
    const y2 = 80 + r * Math.sin((endAngle * Math.PI) / 180)
    return { ...seg, d: `M 80 80 L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z` }
  })

  return (
    <motion.div
      className="grid lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
        <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: FiTrendingUp, label: 'Total Balance', value: '$2,450', color: 'text-primary' },
              { icon: FiClock, label: 'Pending', value: '3', color: 'text-accent' },
              { icon: FiBell, label: 'Notifications', value: '7', color: 'text-blue-500' },
            ].map((stat) => (
              <GlowCard key={stat.label} className="p-5">
                <stat.icon className={`${stat.color} mb-2`} />
                <p className="text-2xl font-bold text-ink dark:text-white">{stat.value}</p>
                <p className="text-xs text-ink-subtle dark:text-white/75">{stat.label}</p>
              </GlowCard>
            ))}
          </div>

          <GlowCard className="p-6">
            <h3 className="font-semibold text-ink dark:text-white mb-4">Recent Approvals</h3>
            <div className="space-y-3">
              {approvals.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-navy/[0.03] dark:bg-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div>
                    <p className="font-medium text-ink dark:text-white text-sm">{item.child}</p>
                    <p className="text-xs text-ink-subtle dark:text-white/75">{item.action}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm flex items-center justify-end gap-1 ${item.coins > 0 ? 'text-primary' : 'text-red-400'}`}>
                      {item.coins > 0 ? '+' : ''}{item.coins}
                      <CoinImage size={16} className="shrink-0" />
                    </p>
                    <p className="text-xs text-ink-subtle">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlowCard>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-4">
          <GlowCard className="p-6">
            <h3 className="font-semibold text-ink dark:text-white mb-4">Spending Breakdown</h3>
            <svg viewBox="0 0 160 160" className="w-full max-w-[200px] mx-auto">
              {touch
                ? piePaths.map((seg) => (
                    <path key={seg.label} d={seg.d} fill={seg.color} />
                  ))
                : piePaths.map((seg, i) => (
                    <motion.path
                      key={seg.label}
                      d={seg.d}
                      fill={seg.color}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      style={{ transformOrigin: '80px 80px' }}
                    />
                  ))}
              <circle cx="80" cy="80" r="35" className="fill-white dark:fill-navy" />
            </svg>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieSegments.map((seg) => (
                <div key={seg.label} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ background: seg.color }} />
                  <span className="text-ink-muted dark:text-white/85">{seg.label}</span>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="p-6">
            <h3 className="font-semibold text-ink dark:text-white mb-4">Pending Chores</h3>
            {pendingChores.map((chore, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-navy/5 dark:border-white/5 last:border-0">
                <div>
                  <p className="text-sm font-medium text-ink dark:text-white">{chore.task}</p>
                  <p className="text-xs text-ink-subtle">{chore.child}</p>
                </div>
                <span className="text-sm font-bold text-primary flex items-center gap-1">
                  <FiCheck className="text-xs" /> {chore.reward}
                  <CoinImage size={16} className="shrink-0" />
                </span>
              </div>
            ))}
          </GlowCard>
        </motion.div>
      </motion.div>
  )
}
