import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '@/animations/variants'
import { Hero } from '@/sections/Hero'
import { FamilyJourney } from '@/sections/FamilyJourney'
import { Features } from '@/sections/Features'
import { KidsDashboard } from '@/sections/KidsDashboard'
import { ParentDashboard } from '@/sections/ParentDashboard'
import { LearningLevels } from '@/sections/LearningLevels'
import { Marketplace } from '@/sections/Marketplace'
import { VendorMap } from '@/sections/VendorMap'
import { Sponsors } from '@/sections/Sponsors'
import { Statistics } from '@/sections/Statistics'
import { Testimonials } from '@/sections/Testimonials'
import { FAQ } from '@/sections/FAQ'
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
      <FamilyJourney />
      <Features />
      <KidsDashboard />
      <ParentDashboard />
      <LearningLevels />
      <Marketplace />
      <VendorMap />
      <Sponsors />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
