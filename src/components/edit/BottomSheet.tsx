import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

/**
 * 화면 전체를 fixed 로 덮고,
 * translate-y 로 슬라이드-업/다운하는 Bottom Sheet 컴포넌트
 */
export default function BottomSheet({
  open,
  onClose,
  children,
  className = ''
}: BottomSheetProps) {
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (typeof window === 'undefined') return null
  return createPortal(
    <div
      aria-hidden={!open}
      className={`
        fixed inset-0 z-50 flex flex-col
        ${open ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
    >
      {/* 오버레이 */}
      <div
        onClick={onClose}
        className={`
          absolute inset-0 bg-black transition-opacity duration-300
          ${open ? 'opacity-50' : 'opacity-0'}
        `}
      />
      {/* 시트 */}
      <section
        className={`
          relative mt-auto w-full max-h-[80vh] overflow-y-auto
          bg-white dark:bg-neutral-800 rounded-t-2xl shadow-lg
          transition-transform duration-300
          ${open ? 'translate-y-0' : 'translate-y-full'}
          ${className}
        `}
      >
        {children}
      </section>
    </div>,
    document.body
  )
}
