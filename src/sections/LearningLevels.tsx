import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection, SectionHeading } from '@/components/ui/SectionHeading'
import { learningLevels } from '@/data/levels'
import { staggerContainer, fadeInUp } from '@/animations/variants'

export function LearningLevels() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <AnimatedSection id="levels" className="bg-surface-secondary dark:bg-navy-light/30">
      <SectionHeading
        badge="Learning Levels"
        title="Age-Perfect Financial Education"
        subtitle="Four progressive levels that grow with your child, from first coins to real-world finance."
      />

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {learningLevels.map((level) => {
          const isExpanded = expanded === level.id
          return (
          <motion.div
            key={level.id}
            variants={fadeInUp}
            className="relative self-start w-full"
            onMouseEnter={() => setExpanded(level.id)}
            onMouseLeave={() => setExpanded(null)}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden premium-shadow cursor-pointer"
              animate={{ y: isExpanded ? -8 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className={`bg-gradient-to-br ${level.color} p-6 pb-16 relative`}>
                <motion.span
                  className="text-5xl block mb-3"
                  animate={isExpanded ? { scale: [1, 1.3, 1], rotate: [0, 10, 0] } : { scale: 1, rotate: 0 }}
                >
                  {level.icon}
                </motion.span>
                <h3 className="text-xl font-bold text-white">{level.name}</h3>
                <p className="text-white/80 text-sm">Ages {level.ageRange}</p>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
                >
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: '0%' }}
                    animate={{ width: isExpanded ? '100%' : '30%' }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>
              </div>

              <div className="p-5 bg-surface-elevated">
                <p className="text-sm text-ink-muted mb-3">{level.description}</p>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-2 pt-2">
                        {level.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-primary/12 text-primary-text"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )})}
      </motion.div>
    </AnimatedSection>
  )
}
