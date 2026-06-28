import Lottie from 'lottie-react'

const coinAnimation = {
  v: '5.7.4',
  fr: 60,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: 'Coin',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [360] }] },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [80, 80, 100] }, { t: 30, s: [100, 100, 100] }, { t: 60, s: [80, 80, 100] }] },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [40, 40] } },
            { ty: 'fl', c: { a: 0, k: [1, 0.835, 0.29, 1] } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
}

export function LottieCoin({ className = 'w-12 h-12' }: { className?: string }) {
  return <Lottie animationData={coinAnimation} loop className={className} />
}
