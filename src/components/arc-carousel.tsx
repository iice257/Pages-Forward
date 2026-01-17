'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { BookCover } from './book-cover'
import type { Book } from '@/lib/supabase'

interface ArcCarouselProps {
  books: Book[]
  currentIndex: number
  onSelect: (index: number) => void
  className?: string
}

// Always show exactly 7 items, with infinite feel
const VISIBLE_COUNT = 7

export function ArcCarousel({
  books,
  currentIndex,
  onSelect,
  className,
}: ArcCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  // Calculate which books to show (7 centered on current)
  const getVisibleBooks = () => {
    if (books.length === 0) return []

    const half = Math.floor(VISIBLE_COUNT / 2) // 3
    const indices: number[] = []

    for (let i = -half; i <= half; i++) {
      // Wrap around for infinite feel
      let idx = (currentIndex + i + books.length) % books.length
      indices.push(idx)
    }

    return indices.map(idx => ({ book: books[idx], originalIndex: idx }))
  }

  const visibleBooks = getVisibleBooks()

  // Arc curve calculation
  const getArcStyle = (position: number) => {
    // position: 0-6, center is 3
    const center = Math.floor(VISIBLE_COUNT / 2)
    const distance = Math.abs(position - center)
    const maxDistance = center

    // Arc: items further from center are lower and smaller
    const translateY = (distance / maxDistance) * 20 // max 20px down
    const scale = 1 - (distance / maxDistance) * 0.15 // min 0.85 scale
    const opacity = 1 - (distance / maxDistance) * 0.4 // min 0.6 opacity
    const zIndex = VISIBLE_COUNT - distance

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex,
    }
  }

  return (
    <div className={cn('relative w-full py-6 overflow-hidden', className)}>
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-20 pointer-events-none" />

      {/* Track - centered, exactly 7 items */}
      <div
        ref={trackRef}
        className="flex justify-center items-end gap-3 md:gap-4 px-4"
      >
        {visibleBooks.map(({ book, originalIndex }, position) => {
          const isCenter = position === Math.floor(VISIBLE_COUNT / 2)

          return (
            <button
              key={`${book.id}-${position}`}
              onClick={() => onSelect(originalIndex)}
              className={cn(
                'flex-shrink-0 transition-all duration-300 ease-out focus:outline-none rounded overflow-hidden',
                isCenter && 'ring-2 ring-sage ring-offset-2 ring-offset-bg'
              )}
              style={getArcStyle(position)}
            >
              <div
                className={cn(
                  'relative rounded overflow-hidden shadow-md',
                  isCenter ? 'w-16 h-24 md:w-20 md:h-28' : 'w-12 h-18 md:w-14 md:h-20'
                )}
              >
                <BookCover
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-full"
                />
              </div>

              {/* Title only for center item */}
              {isCenter && (
                <p className="mt-2 font-display text-xs text-ink text-center max-w-20 truncate">
                  {book.title}
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
