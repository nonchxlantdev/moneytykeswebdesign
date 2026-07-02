import type { PlanFeature } from '@/data/plans'

interface PlanFeatureRowProps {
  feature: PlanFeature
  striped?: boolean
}

function FeatureValue({ value }: { value: PlanFeature['value'] }) {
  if (value.type === 'yes') {
    return (
      <span className="text-primary font-bold text-base" aria-label="Included">
        ✔
      </span>
    )
  }

  if (value.type === 'no') {
    return (
      <span className="text-ink-subtle text-sm" aria-label="Not included">
        —
      </span>
    )
  }

  return (
    <span className="text-accent-text dark:text-accent font-medium text-sm text-right sm:text-right">
      {value.value}
    </span>
  )
}

export function PlanFeatureRow({ feature, striped }: PlanFeatureRowProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 px-4 py-3 border-b border-navy/[0.08] dark:border-white/10 last:border-b-0 ${
        striped ? 'bg-surface-secondary/70 dark:bg-white/[0.03]' : ''
      }`}
    >
      <span className="text-sm text-ink font-medium">{feature.label}</span>
      <div className="sm:shrink-0 sm:text-right">
        <FeatureValue value={feature.value} />
      </div>
    </div>
  )
}
