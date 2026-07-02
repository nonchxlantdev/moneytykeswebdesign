import type { FaqItem } from '@/data/faq'

export function FaqAnswer({ item }: { item: FaqItem }) {
  return (
    <div className="space-y-3 text-ink-muted dark:text-white/85 text-sm leading-relaxed">
      {item.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {item.listIntro ? <p>{item.listIntro}</p> : null}
      {item.bullets?.length ? (
        <ul className="list-disc pl-5 space-y-1.5">
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {item.listOutro?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}
