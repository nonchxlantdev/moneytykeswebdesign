import { coinIcon } from '@/img'

interface CoinImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  size?: number | string
}

/** MoneyTykes logo coin — `.moneytykes-coin` clip-path removes the baked-in square PNG matte */
export function CoinImage({ className = '', size, style, alt = '', ...props }: CoinImageProps) {
  const sizeStyle = size != null ? { width: size, height: size } : undefined

  return (
    <img
      src={coinIcon}
      alt={alt}
      draggable={false}
      className={`moneytykes-coin object-contain select-none ${className}`.trim()}
      style={{ ...sizeStyle, ...style }}
      decoding="async"
      {...props}
    />
  )
}
