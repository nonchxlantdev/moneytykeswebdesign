import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '@/animations/variants'
import { Hero } from '@/sections/Hero'
import { Statistics } from '@/sections/Statistics'
import { WhoWeAre } from '@/sections/WhoWeAre'
import { WhatMakesDifferent } from '@/sections/WhatMakesDifferent'
import { Ecosystem } from '@/sections/Ecosystem'
import { FamilyJourney } from '@/sections/FamilyJourney'
import { Features } from '@/sections/Features'
import { KidsDashboard } from '@/sections/KidsDashboard'
import { ParentDashboard } from '@/sections/ParentDashboard'
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
      <WhoWeAre />
      <WhatMakesDifferent />
      <Ecosystem />
      <FamilyJourney />
      <Features />
      <KidsDashboard />
      <ParentDashboard />
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
