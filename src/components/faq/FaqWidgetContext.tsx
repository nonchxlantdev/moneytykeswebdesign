import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface FaqWidgetContextValue {
  open: boolean
  openFaq: () => void
  closeFaq: () => void
  toggleFaq: () => void
}

const FaqWidgetContext = createContext<FaqWidgetContextValue | null>(null)

export function FaqWidgetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openFaq = useCallback(() => setOpen(true), [])
  const closeFaq = useCallback(() => setOpen(false), [])
  const toggleFaq = useCallback(() => setOpen((v) => !v), [])

  const value = useMemo(
    () => ({ open, openFaq, closeFaq, toggleFaq }),
    [open, openFaq, closeFaq, toggleFaq],
  )

  return <FaqWidgetContext.Provider value={value}>{children}</FaqWidgetContext.Provider>
}

export function useFaqWidget() {
  const ctx = useContext(FaqWidgetContext)
  if (!ctx) {
    throw new Error('useFaqWidget must be used within FaqWidgetProvider')
  }
  return ctx
}
