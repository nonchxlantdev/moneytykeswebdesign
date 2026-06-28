import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2.5, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView) setStarted(true)
  }, [isInView])

  return (
    <span ref={ref} className={className}>
      {started ? (
        <CountUp end={end} duration={duration} suffix={suffix} prefix={prefix} separator="," />
      ) : (
        `0${suffix}`
      )}
    </span>
  )
}
