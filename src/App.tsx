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

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [desktopFx, setDesktopFx] = useState(false)
  useLenis(loaded)

  useEffect(() => {
    setDesktopFx(!isTouchDevice())
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
              <Home />
            </ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
    </SoundProvider>
  )
}
