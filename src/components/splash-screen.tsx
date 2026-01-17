'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Gift } from 'lucide-react'

interface SplashScreenProps {
  variant: 'welcome' | 'gifting'
  onComplete?: () => void
  duration?: number
}

export function SplashScreen({
  variant,
  onComplete,
  duration = 2500
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, duration - 600)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [duration, onComplete])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-bg transition-opacity duration-500',
        isFading ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="text-center">
        {variant === 'welcome' ? (
          <>
            {/* Bold sans-serif brand per reference */}
            <h1 className="font-brand text-4xl md:text-6xl lg:text-7xl text-ink tracking-[0.12em]">
              PAGES FORWARD
            </h1>
            <p className="font-sans text-xs md:text-sm tracking-[0.25em] uppercase text-stone mt-4">
              CHOOSE WHAT MOVES YOU FORWARD
            </p>
          </>
        ) : (
          <>
            {/* Gifting splash per reference image 2 */}
            <h1 className="font-brand text-4xl md:text-6xl lg:text-7xl text-ink tracking-[0.12em]">
              PAGES FORWARD
            </h1>
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="gold-text gold-text-shadow font-display italic text-lg md:text-xl">
                GIFTING
              </span>
              <span className="font-sans text-stone text-lg md:text-xl tracking-wide">
                SEASON
              </span>
              <Gift className="h-5 w-5 text-amber ml-1" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
