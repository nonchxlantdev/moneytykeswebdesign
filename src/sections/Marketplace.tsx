import { motion } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { Button } from '@/components/ui/Button'
import { marketplaceItems } from '@/data/marketplace'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export function Marketplace() {
  return (
    <AnimatedSection id="marketplace">
      <SectionHeading
        badge="Rewards Marketplace"
        title="Spend Coins on Real Rewards"
        subtitle="Kids redeem earned coins for treats, toys, entertainment, and more."
      />

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {marketplaceItems.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <GlowCard className="overflow-hidden group">
              <div className={`h-32 bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                <motion.span
                  className="text-6xl"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {item.emoji}
                </motion.span>
                <motion.div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 text-sm font-bold text-ink flex items-center gap-1 shadow-sm"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🪙 {item.price}
                </motion.div>
              </div>
              <div className="p-5">
                <p className="text-xs text-primary-text font-semibold uppercase tracking-wider mb-1">{item.category}</p>
                <h3 className="text-lg font-bold text-ink dark:text-white mb-3">{item.name}</h3>
                <Button size="sm" variant="secondary" className="w-full group-hover:glow-accent">
                  Purchase
                </Button>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  )
}
