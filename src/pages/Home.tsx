import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '@/animations/variants'
import { Hero } from '@/sections/Hero'
import { Statistics } from '@/sections/Statistics'
import { AboutCluster } from '@/sections/AboutCluster'
import { Ecosystem } from '@/sections/Ecosystem'
import { FamilyJourney } from '@/sections/FamilyJourney'
import { Features } from '@/sections/Features'
import { DashboardPreview } from '@/sections/DashboardPreview'
import { LearningLevels } from '@/sections/LearningLevels'
import { Marketplace } from '@/sections/Marketplace'
import { VendorMap } from '@/sections/VendorMap'
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
      <DashboardPreview />
      <LearningLevels />
      <Marketplace />
      <VendorMap />
      <Sponsors />
      <Testimonials />
      <FinalCTA />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </motion.main>
  )
}
