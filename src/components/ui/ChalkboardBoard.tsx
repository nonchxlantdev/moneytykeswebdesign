import type { ReactNode } from 'react'
import { classroomChalkWords } from '@/data/classroom'

interface ChalkboardBoardProps {
  children: ReactNode
}

export function ChalkboardBoard({ children }: ChalkboardBoardProps) {
  return (
    <div className="chalkboard-board relative overflow-hidden">
      <div className="chalkboard-ghosts" aria-hidden="true">
        {classroomChalkWords.map((word, i) => (
          <span key={word} className={`chalk-ghost chalk-ghost-${i % 7}`}>
            {word}
          </span>
        ))}
      </div>
      <div className="relative z-10 pt-36 sm:pt-40 px-4 sm:px-5 md:px-8">
        <div className="max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto">{children}</div>
      </div>
      <div className="wood-tray" aria-hidden="true">
        <div className="chalk-bits">
          <span className="chalk-bit chalk-bit-a" />
          <span className="chalk-bit chalk-bit-b" />
          <span className="chalk-bit chalk-bit-c" />
        </div>
      </div>
    </div>
  )
}
