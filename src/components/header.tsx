'use client'

import { cn } from '@/lib/utils'
import { Moon, Sun, Gift } from 'lucide-react'
import { useGiftMode } from '@/context/gift-mode'

interface HeaderProps {
  isDarkMode?: boolean
  onThemeToggle?: () => void
  onFullListClick?: () => void
  onCollectionClick?: () => void
  collectionCount?: number
}

export function Header({
  isDarkMode = false,
  onThemeToggle,
  onFullListClick,
  onCollectionClick,
  collectionCount = 0,
}: HeaderProps) {
  const { isGiftMode, toggleGiftMode } = useGiftMode()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg/90 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-6 md:px-8 max-w-[1600px] mx-auto">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <span className="font-brand text-sm md:text-base text-ink tracking-[0.15em]">
            PAGES FORWARD
          </span>
          {isGiftMode && (
            <span className="font-sans text-xs">
              <span className="gold-text italic font-medium">Gifting</span>
              <span className="text-stone ml-1">Season</span>
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="btn-hover h-10 w-10 flex items-center justify-center rounded-full border border-sand bg-bg2 text-stone hover:text-ink"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Full List Button */}
          <button
            onClick={onFullListClick}
            className="btn-hover h-10 px-4 flex items-center gap-2 rounded-full border border-sand bg-bg2 text-sm font-sans text-ink hover:bg-bg3"
          >
            FULL LIST
          </button>

          {/* Gift Toggle Button */}
          <button
            onClick={toggleGiftMode}
            className={cn(
              'btn-hover h-10 w-10 flex items-center justify-center rounded-full border relative',
              isGiftMode
                ? 'border-amber bg-gradient-to-br from-[var(--gold-1)]/20 to-[var(--gold-3)]/20 text-amber'
                : 'border-sand bg-bg2 text-stone hover:text-ink'
            )}
            aria-label={isGiftMode ? 'Exit gift mode' : 'Enter gift mode'}
          >
            <Gift className={cn('h-4 w-4', isGiftMode && 'fill-current')} />
          </button>
        </div>
      </div>
    </header>
  )
}
