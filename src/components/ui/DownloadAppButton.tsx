import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { DownloadAppModal } from '@/components/ui/DownloadAppModal'

interface DownloadAppButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  magnetic?: boolean
  onOpen?: () => void
}

export function DownloadAppButton({
  children,
  variant = 'secondary',
  size = 'lg',
  className = '',
  magnetic = true,
  onOpen,
}: DownloadAppButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        magnetic={magnetic}
        onClick={() => {
          onOpen?.()
          setOpen(true)
        }}
      >
        {children}
      </Button>
      <DownloadAppModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
