import { motion } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { testimonials, type Testimonial } from '@/data/testimonials'
import { fadeInUp } from '@/animations/variants'

function TestimonialCard({ testimonial, featured = false }: { testimonial: Testimonial; featured?: boolean }) {
  const t = testimonial

  if (featured) {
    return (
      <div className="relative p-8 md:p-10 rounded-2xl border-2 border-accent/60 bg-gradient-to-br from-accent/25 via-accent/10 to-amber-50/80 dark:from-accent/20 dark:via-accent/8 dark:to-navy-light/80 shadow-[0_8px_32px_rgba(255,213,74,0.25)] h-full">
        <span className="absolute top-4 right-4 md:top-5 md:right-5 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-accent text-ink shadow-[0_2px_10px_rgba(255,213,74,0.4)]">
          Featured
        </span>
        <div className="flex gap-1 mb-4">
          {Array.from({ length: t.rating }).map((_, i) => (
            <span key={i} className="text-amber-600 dark:text-accent text-lg">
              ★
            </span>
          ))}
        </div>
        <p className="text-ink dark:text-white/90 leading-relaxed mb-6 text-sm md:text-base font-medium">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center text-ink font-bold shadow-[0_2px_12px_rgba(255,213,74,0.45)]">
            {t.avatar}
          </div>
          <div>
            <p className="font-bold text-ink dark:text-white text-sm md:text-base">{t.name}</p>
            <p className="text-xs text-ink-muted dark:text-white/75">{t.role}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 rounded-2xl glass premium-shadow h-full">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <span key={i} className="text-accent text-lg">
            ★
          </span>
        ))}
      </div>
      <p className="text-ink-muted dark:text-white/85 leading-relaxed mb-6 text-sm">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold">
          {t.avatar}
        </div>
        <div>
          <p className="font-semibold text-ink dark:text-white text-sm">{t.name}</p>
          <p className="text-xs text-ink-subtle dark:text-white/75">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

function TestimonialMarquee({ items }: { items: Testimonial[] }) {
  const loop = [...items, ...items]

  return (
    <div
      className="group/testimonials relative overflow-hidden pb-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-label="Testimonials carousel"
    >
      <div className="flex w-max animate-testimonial-marquee group-hover/testimonials:[animation-play-state:paused]">
        {loop.map((t, i) => (
          <div key={`${t.id}-${i}`} className="w-[min(340px,85vw)] md:w-[400px] shrink-0 px-3">
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  const featuredTestimonials = testimonials.filter((t) => t.featured)
  const carouselTestimonials = testimonials.filter((t) => !t.featured)

  return (
    <AnimatedSection className="bg-surface-secondary dark:bg-navy-light/30 overflow-hidden">
      <SectionHeading
        badge="Testimonials"
        title="Loved by Belizean Families"
        subtitle="Hear from parents, teachers, vendors, and sponsors who trust MoneyTykes."
      />

      {featuredTestimonials.length > 0 && (
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-8 mb-10 md:mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredTestimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} featured />
          ))}
        </motion.div>
      )}

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <TestimonialMarquee items={carouselTestimonials} />
      </motion.div>
    </AnimatedSection>
  )
}
