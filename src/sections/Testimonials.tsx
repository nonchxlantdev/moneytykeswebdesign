import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { motion } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'
import { fadeInUp } from '@/animations/variants'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

export function Testimonials() {
  return (
    <AnimatedSection className="bg-surface-secondary dark:bg-navy-light/30 overflow-hidden">
      <SectionHeading
        badge="Testimonials"
        title="Loved by Belizean Families"
        subtitle="Hear from parents, teachers, vendors, and sponsors who trust MoneyTykes."
      />

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="!pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="!w-[340px] md:!w-[400px]">
              <div className="p-8 rounded-2xl glass premium-shadow h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </AnimatedSection>
  )
}
