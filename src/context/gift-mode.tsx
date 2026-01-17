'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface GiftModeContextType {
  isGiftMode: boolean
  toggleGiftMode: () => void
  enableGiftMode: () => void
  disableGiftMode: () => void
  showGiftSplash: boolean
  setShowGiftSplash: (show: boolean) => void
}

const GiftModeContext = createContext<GiftModeContextType | undefined>(undefined)

export function GiftModeProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isGiftMode, setIsGiftMode] = useState(false)
  const [showGiftSplash, setShowGiftSplash] = useState(false)

  // Sync with URL
  useEffect(() => {
    const isGift = searchParams.get('mode') === 'gift' ||
      searchParams.get('gift') === 'true' ||
      document.body.classList.contains('gift-mode')

    if (isGift && !isGiftMode) {
      setIsGiftMode(true)
      document.body.classList.add('gift-mode')
    } else if (!isGift && isGiftMode) {
      setIsGiftMode(false)
      document.body.classList.remove('gift-mode')
    }
  }, [searchParams, isGiftMode])

  const enableGiftMode = () => {
    setShowGiftSplash(true)
    // Actual mode switch happens after splash in the component handler usually,
    // but here we can prime it.
    // For now, let's just let the splash handler do the switch or do it here.
  }

  const disableGiftMode = () => {
    setIsGiftMode(false)
    document.body.classList.remove('gift-mode')
    // Remove query param if present
    const params = new URLSearchParams(window.location.search)
    params.delete('mode')
    params.delete('gift')
    const query = params.toString()
    const path = window.location.pathname + (query ? `?${query}` : '')
    router.push(path)
  }

  const toggleGiftMode = () => {
    if (isGiftMode) {
      disableGiftMode()
    } else {
      enableGiftMode()
    }
  }

  return (
    <GiftModeContext.Provider
      value={{
        isGiftMode,
        toggleGiftMode,
        enableGiftMode,
        disableGiftMode,
        showGiftSplash,
        setShowGiftSplash
      }}
    >
      {children}
    </GiftModeContext.Provider>
  )
}

export function useGiftMode() {
  const context = useContext(GiftModeContext)
  if (context === undefined) {
    throw new Error('useGiftMode must be used within a GiftModeProvider')
  }
  return context
}
