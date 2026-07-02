import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from '@/hooks/useLenis'
import { SoundProvider } from '@/hooks/useSound'
import { isTouchDevice } from '@/hooks/useDevice'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { MouseTrail } from '@/components/layout/MouseTrail'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { Home } from '@/pages/Home'
import { Terms } from '@/pages/Terms'
import { Privacy } from '@/pages/Privacy'
import { Plans } from '@/pages/Plans'
import { getAppPage, type AppPage } from '@/data/links'

export default function App() {
  const [page, setPage] = useState<AppPage>(() => getAppPage())
  const [loaded, setLoaded] = useState(page !== 'home')
  const [desktopFx, setDesktopFx] = useState(false)
  useLenis(loaded && page === 'home')

  useEffect(() => {
    setDesktopFx(!isTouchDevice())
  }, [])

  useEffect(() => {
    const syncPage = () => {
      const nextPage = getAppPage()
      setPage(nextPage)
      if (nextPage !== 'home') {
        setLoaded(true)
      }
    }
    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  const handleLoadComplete = useCallback(() => setLoaded(true), [])

  return (
    <SoundProvider ready={loaded}>
      <AnimatePresence mode="wait">
        {!loaded ? (
          <LoadingScreen key="loading" onComplete={handleLoadComplete} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {desktopFx && (
              <>
                <CustomCursor />
                <MouseTrail />
              </>
            )}
            <ErrorBoundary>
              {page === 'terms' ? (
                <Terms />
              ) : page === 'privacy' ? (
                <Privacy />
              ) : page === 'plans' ? (
                <Plans />
              ) : (
                <Home />
              )}
            </ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
    </SoundProvider>
  )
}
