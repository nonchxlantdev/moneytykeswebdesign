import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { PlanFeatureRow } from '@/components/plans/PlanFeatureRow'
import type { PricingPlan } from '@/data/plans'
import { PARENT_APP_URL } from '@/data/links'
import { fadeInUp } from '@/animations/variants'

interface PricingCardProps {
  plan: PricingPlan
  index: number
}

export function PricingCard({ plan, index }: PricingCardProps) {
  const featured = Boolean(plan.featured)

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08 }}
      className="relative h-full flex flex-col"
    >
      <div className="h-8 sm:h-9 flex items-center justify-center shrink-0 mb-2">
        {featured ? (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-accent text-ink shadow-[0_4px_14px_rgba(255,213,74,0.35)] whitespace-nowrap">
            Most Popular 🌟
          </span>
        ) : null}
      </div>

      <div
        className={`card-light flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          featured
            ? 'border-2 border-accent premium-shadow-lg'
            : 'border-2 border-transparent hover:-translate-y-1'
        }`}
      >
        <div className="p-5 sm:p-6 md:p-8 border-b border-navy/[0.08] dark:border-white/10 text-center min-h-[220px] sm:min-h-[232px] flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-bold text-ink mb-3">{plan.name}</h3>
          <div className="flex items-end justify-center gap-1 mb-2">
            <span className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {plan.price}
            </span>
            {plan.cadence ? (
              <span className="text-ink-muted text-sm font-medium pb-1">{plan.cadence}</span>
            ) : null}
          </div>
          <p className="text-sm text-ink-muted mb-5 sm:mb-6 min-h-[40px] flex items-center justify-center">
            {plan.sublabel}
          </p>
          <Button
            href={PARENT_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant={featured ? 'secondary' : 'outline'}
            size="md"
            className="w-full"
            magnetic={false}
          >
            {plan.ctaLabel}
          </Button>
        </div>

        <div className="flex-1 py-2">
          {plan.features.map((feature, i) => (
            <PlanFeatureRow key={feature.label} feature={feature} striped={i % 2 === 1} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
