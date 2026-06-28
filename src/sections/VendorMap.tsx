import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { vendors } from '@/data/vendors'
import { BELIZE_OUTLINE, BELIZE_VIEWBOX } from '@/data/belizeMap'
import { fadeInUp } from '@/animations/variants'

function mapPercent(value: number, max: number) {
  return `${(value / max) * 100}%`
}

export function VendorMap() {
  const [activeVendor, setActiveVendor] = useState<string | null>(null)
  const selected = vendors.find((v) => v.id === activeVendor)

  return (
    <AnimatedSection id="vendors" className="bg-surface-secondary dark:bg-navy-light/30">
      <SectionHeading
        badge="Vendor Partners"
        title="Belize's Partner Network"
        subtitle="Local businesses across Belize where kids can spend their hard-earned coins."
      />

      <motion.div
        className="relative max-w-lg mx-auto"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="relative rounded-3xl overflow-hidden premium-shadow-lg bg-gradient-to-b from-sky-100/80 to-primary/5 dark:from-sky-950/40 dark:to-primary/10 px-8 py-10 md:px-12 md:py-14">
          {/* Map canvas — smaller, centered */}
          <div
            className="relative mx-auto w-full max-w-[220px] md:max-w-[260px]"
            style={{ aspectRatio: `${BELIZE_VIEWBOX.width} / ${BELIZE_VIEWBOX.height}` }}
          >
            <svg
              viewBox={`0 0 ${BELIZE_VIEWBOX.width} ${BELIZE_VIEWBOX.height}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Map of Belize showing partner vendor locations"
            >
              <motion.path
                d={BELIZE_OUTLINE}
                fill="rgba(15, 175, 156, 0.12)"
                stroke="rgba(15, 175, 156, 0.5)"
                strokeWidth="0.55"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />

              {vendors.map((vendor) => {
                const isActive = activeVendor === vendor.id
                const isBelizeCity = vendor.city === 'Belize City'

                return (
                  <g
                    key={vendor.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveVendor(vendor.id)}
                    onMouseLeave={() => setActiveVendor(null)}
                    onFocus={() => setActiveVendor(vendor.id)}
                    onBlur={() => setActiveVendor(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${vendor.name}, ${vendor.city}`}
                  >
                    {isActive && (
                      <motion.circle
                        cx={vendor.x}
                        cy={vendor.y}
                        r={isBelizeCity ? 5 : 4}
                        fill="none"
                        stroke="#0FAF9C"
                        strokeWidth="0.35"
                        initial={{ scale: 0.6, opacity: 0.8 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                    )}
                    <circle
                      cx={vendor.x}
                      cy={vendor.y}
                      r={isActive ? (isBelizeCity ? 2.6 : 2.2) : isBelizeCity ? 2 : 1.5}
                      fill={isActive ? '#0FAF9C' : '#FFD54A'}
                      stroke={isActive ? '#fff' : 'rgba(7, 26, 45, 0.3)'}
                      strokeWidth={isBelizeCity ? 0.45 : 0.35}
                    />
                  </g>
                )
              })}
            </svg>

            {/* City labels aligned to the same coordinate space as the SVG */}
            <div className="absolute inset-0 pointer-events-none">
              <AnimatePresence>
                {vendors.map((vendor) => {
                  if (activeVendor !== vendor.id) return null

                  return (
                    <motion.div
                      key={`label-${vendor.id}`}
                      className="absolute z-10 -translate-x-1/2"
                      style={{
                        left: mapPercent(vendor.x, BELIZE_VIEWBOX.width),
                        top: mapPercent(vendor.y, BELIZE_VIEWBOX.height),
                      }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: -22 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap bg-white text-ink shadow-md border border-navy/10 dark:bg-navy dark:text-white dark:border-white/15">
                        {vendor.city}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                className="mt-6 p-4 rounded-2xl glass premium-shadow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
              >
                <p className="text-xs text-primary-text font-semibold uppercase">{selected.category}</p>
                <h4 className="font-bold text-ink dark:text-white text-base">{selected.name}</h4>
                <p className="text-sm text-ink-subtle dark:text-white/75">{selected.city}, Belize</p>
                <p className="text-sm text-ink-muted dark:text-white/85 mt-1">{selected.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {vendors.map((vendor) => (
            <button
              key={vendor.id}
              type="button"
              className={`p-3 rounded-xl text-left text-sm transition-all ${
                activeVendor === vendor.id
                  ? 'bg-primary/10 border border-primary/30'
                  : 'bg-white dark:bg-navy-light hover:bg-primary/5'
              }`}
              onMouseEnter={() => setActiveVendor(vendor.id)}
              onMouseLeave={() => setActiveVendor(null)}
            >
              <p className="font-semibold text-ink dark:text-white">{vendor.name}</p>
              <p className="text-xs text-ink-subtle dark:text-white/60">{vendor.city}</p>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
