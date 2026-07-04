import { useState, useEffect, useId, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiPlay, FiExternalLink } from 'react-icons/fi'
import { isTouchDevice } from '@/hooks/useDevice'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { fadeInUp } from '@/animations/variants'
import { OFFICIAL_MUSIC_VIDEO_URL } from '@/data/links'

const mockData = {
  balance: 1250,
  chores: 8,
  streak: 14,
  level: 7,
  xp: 72,
  badges: ['🏆', '⭐', '🔥', '💎', '🎯'],
}

const weeklyActivity = [
  { day: 'Mon', earned: 45, spent: 20, balance: 980 },
  { day: 'Tue', earned: 60, spent: 15, balance: 1025 },
  { day: 'Wed', earned: 30, spent: 40, balance: 1015 },
  { day: 'Thu', earned: 80, spent: 25, balance: 1070 },
  { day: 'Fri', earned: 55, spent: 30, balance: 1095 },
  { day: 'Sat', earned: 90, spent: 50, balance: 1135 },
  { day: 'Sun', earned: 40, spent: 10, balance: 1165 },
]

const CHART = { w: 320, h: 120, pad: { t: 12, r: 12, b: 28, l: 36 } }

function useChartVisible() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const skipAnimation = isTouchDevice()
  return { ref, visible: skipAnimation || isInView, animate: !skipAnimation }
}

function BalanceLineChart() {
  const { ref, visible, animate } = useChartVisible()
  const gradientId = useId()
  const { w, h, pad } = CHART
  const chartW = w - pad.l - pad.r
  const chartH = h - pad.t - pad.b

  const balances = weeklyActivity.map((d) => d.balance)
  const minY = Math.min(...balances) - 30
  const maxY = Math.max(...balances) + 30

  const points = weeklyActivity.map((d, i) => {
    const x = pad.l + (i / (weeklyActivity.length - 1)) * chartW
    const y = pad.t + chartH - ((d.balance - minY) / (maxY - minY)) * chartH
    return { x, y, ...d }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${pad.t + chartH} L ${points[0].x.toFixed(1)} ${pad.t + chartH} Z`

  const gridSteps = 4
  const yLabels = Array.from({ length: gridSteps + 1 }, (_, i) => {
    const value = minY + ((maxY - minY) / gridSteps) * (gridSteps - i)
    const y = pad.t + (i / gridSteps) * chartH
    return { value: Math.round(value), y }
  })

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-ink">Balance Trend</p>
        <p className="text-xs text-ink-subtle">This week</p>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32" role="img" aria-label="Weekly coin balance line chart">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0FAF9C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0FAF9C" stopOpacity="0" />
          </linearGradient>
        </defs>

        {yLabels.map(({ value, y }) => (
          <g key={value}>
            <line
              x1={pad.l}
              y1={y}
              x2={w - pad.r}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeDasharray="4 4"
            />
            <text x={pad.l - 6} y={y + 3} textAnchor="end" className="fill-ink-subtle text-[9px]">
              {value}
            </text>
          </g>
        ))}

        {animate ? (
          <>
            <motion.path
              d={areaPath}
              fill={`url(#${gradientId})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke="#0FAF9C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: visible ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            {points.map((p, i) => (
              <motion.g
                key={p.day}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <circle cx={p.x} cy={p.y} r="4" fill="#0FAF9C" stroke="white" strokeWidth="1.5" className="dark:stroke-navy" />
                <text x={p.x} y={h - 8} textAnchor="middle" className="fill-ink-subtle text-[9px] font-medium">
                  {p.day}
                </text>
              </motion.g>
            ))}
          </>
        ) : (
          <>
            <path d={areaPath} fill={`url(#${gradientId})`} />
            <path d={linePath} fill="none" stroke="#0FAF9C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {points.map((p) => (
              <g key={p.day}>
                <circle cx={p.x} cy={p.y} r="4" fill="#0FAF9C" stroke="white" strokeWidth="1.5" className="dark:stroke-navy" />
                <text x={p.x} y={h - 8} textAnchor="middle" className="fill-ink-subtle text-[9px] font-medium">
                  {p.day}
                </text>
              </g>
            ))}
          </>
        )}
      </svg>
    </div>
  )
}

function EarnedSpentBarChart() {
  const { ref, visible, animate } = useChartVisible()
  const { w, h, pad } = CHART
  const chartW = w - pad.l - pad.r
  const chartH = h - pad.t - pad.b
  const maxVal = Math.max(...weeklyActivity.flatMap((d) => [d.earned, d.spent]))
  const barGroupW = chartW / weeklyActivity.length
  const barW = barGroupW * 0.28

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-ink">Earned vs Spent</p>
        <div className="flex items-center gap-3 text-xs text-ink-subtle">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-primary" /> Earned
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-accent/80" /> Spent
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32" role="img" aria-label="Weekly earned versus spent bar chart">
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = pad.t + chartH - (tick / 100) * chartH
          return (
            <g key={tick}>
              <line x1={pad.l} y1={y} x2={w - pad.r} y2={y} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
              <text x={pad.l - 6} y={y + 3} textAnchor="end" className="fill-ink-subtle text-[9px]">
                {tick}
              </text>
            </g>
          )
        })}

        {weeklyActivity.map((d, i) => {
          const groupX = pad.l + i * barGroupW + barGroupW / 2
          const earnedH = (d.earned / maxVal) * chartH
          const spentH = (d.spent / maxVal) * chartH
          const baseY = pad.t + chartH

          return (
            <g key={d.day}>
              {animate ? (
                <>
                  <motion.rect
                    x={groupX - barW - 1}
                    width={barW}
                    rx={3}
                    fill="#0FAF9C"
                    initial={{ height: 0, y: baseY }}
                    animate={{ height: visible ? earnedH : 0, y: visible ? baseY - earnedH : baseY }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.rect
                    x={groupX + 1}
                    width={barW}
                    rx={3}
                    fill="#FFD54A"
                    fillOpacity={0.85}
                    initial={{ height: 0, y: baseY }}
                    animate={{ height: visible ? spentH : 0, y: visible ? baseY - spentH : baseY }}
                    transition={{ duration: 0.6, delay: i * 0.06 + 0.03, ease: [0.22, 1, 0.36, 1] }}
                  />
                </>
              ) : (
                <>
                  <rect x={groupX - barW - 1} y={baseY - earnedH} width={barW} height={earnedH} rx={3} fill="#0FAF9C" />
                  <rect x={groupX + 1} y={baseY - spentH} width={barW} height={spentH} rx={3} fill="#FFD54A" fillOpacity={0.85} />
                </>
              )}
              <text x={groupX} y={h - 8} textAnchor="middle" className="fill-ink-subtle text-[9px] font-medium">
                {d.day.slice(0, 1)}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function KidsDashboard() {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((b) => (b < mockData.balance ? b + 25 : mockData.balance))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatedSection id="dashboard" className="bg-surface-secondary dark:bg-navy-light/30">
      <SectionHeading
        badge="Kids Dashboard"
        title="Where Learning Meets Fun"
        subtitle="A gamified dashboard that keeps kids engaged while building practical financial skills."
      />

      <motion.a
        href={OFFICIAL_MUSIC_VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-5 md:p-6 rounded-2xl bg-gradient-to-r from-primary via-[#0d9a8a] to-blue-600 text-white premium-shadow-lg glow-primary"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 shrink-0 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30 group-hover:bg-white/30 transition-colors">
            <FiPlay className="text-xl ml-0.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/75">Official release</p>
            <p className="text-lg md:text-xl font-bold leading-tight">
              Watch MoneyTykes Official Music Video
            </p>
            <p className="text-sm text-white/85 mt-0.5 hidden sm:block">
              Stream on YouTube
            </p>
          </div>
        </div>
        <span className="inline-flex items-center justify-center gap-2 shrink-0 px-5 py-2.5 rounded-full bg-white text-primary font-semibold text-sm group-hover:bg-accent group-hover:text-ink transition-colors">
          Watch now
          <FiExternalLink className="text-base" />
        </span>
      </motion.a>

      <motion.div
        className="grid lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <GlowCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-ink-subtle">Coin Balance</p>
                <p className="text-4xl font-bold text-ink">
                  🪙 {balance.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {mockData.badges.map((badge, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-2 border-t border-navy/8 dark:border-white/10">
              <BalanceLineChart />
              <EarnedSpentBarChart />
            </div>
          </GlowCard>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-4">
          <GlowCard className="p-5">
            <p className="text-sm text-ink-subtle mb-1">Completed Chores</p>
            <p className="text-3xl font-bold text-primary-text">{mockData.chores}</p>
            <p className="text-xs text-ink-subtle mt-1">This week</p>
          </GlowCard>

          <GlowCard className="p-5">
            <p className="text-sm text-ink-subtle mb-1">Daily Streak</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-accent-text">{mockData.streak}</p>
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                🔥
              </motion.span>
            </div>
          </GlowCard>

          <GlowCard className="p-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ProgressRing progress={mockData.xp} size={64} strokeWidth={5} />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary-text">
                  {mockData.level}
                </span>
              </div>
              <div>
                <p className="text-sm text-ink-subtle">Level {mockData.level}</p>
                <p className="text-xs text-ink-subtle">{mockData.xp}% to Level {mockData.level + 1}</p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
