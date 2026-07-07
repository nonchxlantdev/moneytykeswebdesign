import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '@/animations/variants'
import { Hero } from '@/sections/Hero'
import { Statistics } from '@/sections/Statistics'
import { AboutCluster } from '@/sections/AboutCluster'
import { Ecosystem } from '@/sections/Ecosystem'
import { FamilyJourney } from '@/sections/FamilyJourney'
import { Features } from '@/sections/Features'
import { Marketplace } from '@/sections/Marketplace'
import { LearningLevels } from '@/sections/LearningLevels'
import { Sponsors } from '@/sections/Sponsors'
import { Testimonials } from '@/sections/Testimonials'
import { FinalCTA } from '@/sections/FinalCTA'

const Navbar = lazy(() => import('@/components/layout/Navbar').then((m) => ({ default: m.Navbar })))
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

export function Home() {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
    >
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <Hero />
      <Statistics />
      <AboutCluster />
      <Ecosystem />
      <FamilyJourney />
      <Features />
      <Marketplace />
      <LearningLevels />
      <Sponsors />
      <Testimonials />
      <FinalCTA />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
