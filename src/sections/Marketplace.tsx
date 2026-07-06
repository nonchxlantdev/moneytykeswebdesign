import { motion } from 'framer-motion'
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { Button } from '@/components/ui/Button'
import { DIGIWALLET_LOCATIONS_URL } from '@/data/links'
import { digiWalletLogo } from '@/img'
import { staggerContainer, fadeInUp } from '@/animations/variants'

const spendingExperiences = [
  {
    id: 'digiwallet',
    title: 'DigiWallet Integration',
    badge: 'Parent Approved',
    badgeClass:
      'bg-accent/25 text-accent-text border border-accent/50 dark:bg-accent/20 dark:text-accent dark:border-accent/40',
    description:
      'Parents remain in complete control. Children may request eligible rewards or purchases, and every request requires parental approval. Once approved, payment is securely processed from the parent’s DigiWallet account to participating merchants.',
    logo: digiWalletLogo,
    logoAlt: 'DigiWallet',
    cta: {
      label: 'Find DigiWallet Locations →',
      href: DIGIWALLET_LOCATIONS_URL,
    },
  },
  {
    id: 'in-app-vendor',
    title: 'In-App Vendor',
    badge: 'Coming Soon',
    badgeClass:
      'bg-transparent text-ink-subtle border border-navy/15 dark:border-white/20 opacity-90',
    description:
      'With parent approval, children will be able to browse and pre-order from youth-focused vendors directly inside the app, building safe, guided spending habits in their virtual wallet. When a purchase is approved, the amount is deducted from the parent wallet.',
    icon: FiShoppingBag,
    gradient: 'from-teal-500 to-primary',
  },
] as const

export function Marketplace() {
  return (
    <AnimatedSection id="digiwallet">
      <SectionHeading
        badge="DigiWallet"
        title="Parent-Guided Financial Experiences"
        subtitle="Parent-approved ways for kids to practice earning, saving, and using their virtual wallet. Approved spending is deducted from the parent wallet."
      />

      <motion.div
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {spendingExperiences.map((item) => {
          const Icon = 'icon' in item ? item.icon : null
          const hasLogo = 'logo' in item && item.logo

          return (
            <motion.div key={item.id} variants={fadeInUp}>
              <GlowCard className="p-6 md:p-8 h-full flex flex-col group">
                {hasLogo ? (
                  <>
                    <span
                      className={`inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit ${item.badgeClass}`}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-xl font-bold text-ink group-hover:text-primary-text transition-colors mb-5">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-center py-4 mb-5 rounded-xl bg-surface-secondary/80 dark:bg-white/[0.04] border border-navy/6 dark:border-white/8">
                      <img
                        src={item.logo}
                        alt={item.logoAlt}
                        className="h-12 sm:h-14 md:h-16 w-auto max-w-[92%] object-contain object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-wrap items-start gap-3 mb-4">
                    {Icon && 'gradient' in item ? (
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="text-white text-xl" />
                      </motion.div>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <span
                        className={`inline-block mb-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.badgeClass}`}
                      >
                        {item.badge}
                      </span>
                      <h3 className="text-xl font-bold text-ink group-hover:text-primary-text transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                )}

                <p className="text-ink-muted text-sm md:text-base leading-relaxed flex-1 mb-6">
                  {item.description}
                </p>

                {'cta' in item && item.cta ? (
                  <Button
                    href={item.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="md"
                    className="w-full sm:w-auto self-start"
                  >
                    {item.cta.label}
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : null}
              </GlowCard>
            </motion.div>
          )
        })}
      </motion.div>
    </AnimatedSection>
  )
}
