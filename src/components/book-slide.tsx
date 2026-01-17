'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { StatusBadge } from './status-badge'
import { GenreTag } from './genre-tag'
import { ActionButton } from './action-button'
import { BookCover } from './book-cover'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Book } from '@/lib/supabase'

interface BookSlideProps {
  book: Book
  isGiftMode?: boolean
  isTransitioning?: boolean
  onAction?: (book: Book) => void
  onPrev?: () => void
  onNext?: () => void
}

export function BookSlide({
  book,
  isGiftMode = false,
  isTransitioning = false,
  onAction,
  onPrev,
  onNext,
}: BookSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext?.()
      else onPrev?.()
    }
    setTouchStart(null)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onPrev, onNext])

  // Truncate description for containment
  const truncatedDescription = book.description && book.description.length > 200
    ? book.description.slice(0, 200) + '...'
    : book.description

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex flex-col md:flex-row h-full w-full transition-all',
        isTransitioning && 'opacity-0 blur-sm',
        !isTransitioning && 'opacity-100 blur-0'
      )}
      style={{ transitionDuration: '300ms' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Left: Cover Panel */}
      <div className="relative flex-1 flex items-center justify-center p-6 md:p-12 bg-bg-cover min-h-[300px] md:min-h-0">
        {/* Navigation Arrow Left */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 btn-hover h-12 w-12 flex items-center justify-center rounded-full border border-sand bg-bg/80 backdrop-blur-sm text-stone hover:text-ink z-10"
          aria-label="Previous book"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Book Cover */}
        <div className="relative">
          <BookCover
            src={book.cover_image}
            alt={book.title}
            className="w-48 md:w-64 lg:w-72 aspect-[2/3] rounded shadow-lg"
            priority
          />

          {/* Accolade ribbon */}
          {book.accolade_text && (
            <div className="absolute -right-2 top-6 bg-gradient-to-r from-[var(--gold-1)] via-[var(--gold-2)] to-[var(--gold-3)] text-ink text-[10px] font-sans font-semibold tracking-wide px-3 py-1.5 shadow-md rotate-[-2deg] gold-text-shadow">
              {book.accolade_text}
            </div>
          )}
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 btn-hover h-12 w-12 flex items-center justify-center rounded-full border border-sand bg-bg/80 backdrop-blur-sm text-stone hover:text-ink z-10"
          aria-label="Next book"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Right: Content Panel */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-12 bg-bg overflow-hidden">
        <div className="max-w-md">
          {/* Status + Action Row */}
          <div className="flex items-center justify-between mb-4">
            <StatusBadge status={book.status} />
            {book.status === 'available' && (
              <ActionButton
                variant={isGiftMode ? 'choose' : 'add'}
                onClick={() => onAction?.(book)}
              />
            )}
          </div>

          {/* Title - large serif */}
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-tight mb-2">
            {book.title}
          </h1>

          {/* Subtitle - italic with left border */}
          {book.subtitle && (
            <p className="font-display text-base md:text-lg text-char italic border-l-2 border-sand pl-3 mb-4">
              {book.subtitle}
            </p>
          )}

          {/* Description - constrained */}
          <p className="font-body text-sm md:text-base text-umber leading-relaxed mb-6 max-h-24 overflow-hidden">
            {truncatedDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <GenreTag genre={book.main_category} />
            <GenreTag genre={book.niche} variant="niche" />
          </div>

          {/* Author Section */}
          <div className="border-t border-sand pt-4">
            <p className="font-display text-lg text-ink">
              {book.author}
            </p>
            {(book.number_of_bestsellers ?? 0) > 0 && (
              <p className="font-sans text-xs text-stone tracking-wide uppercase mt-1">
                {book.number_of_bestsellers} × BESTSELLER BOOKS
              </p>
            )}
          </div>

          {/* Gift mode promise */}
          {isGiftMode && (
            <p className="mt-6 font-sans text-xs text-stone italic">
              This isn&apos;t a cart. It&apos;s a single, deliberate choice.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
