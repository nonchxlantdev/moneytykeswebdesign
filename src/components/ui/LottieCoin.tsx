import { CoinImage } from '@/components/ui/CoinImage'

export function LottieCoin({ className = 'w-12 h-12' }: { className?: string }) {
  return <CoinImage className={`moneytykes-coin--spin ${className}`} />
}
