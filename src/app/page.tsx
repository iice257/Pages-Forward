'use client'

import { useState, useEffect, useCallback } from 'react'
import { SplashScreen } from '@/components/splash-screen'
import { Header } from '@/components/header'
import { BookSlide } from '@/components/book-slide'
import { ArcCarousel } from '@/components/arc-carousel'
import { supabase, type Book } from '@/lib/supabase'
import { FilterPanel, FilterButton, type FilterState } from '@/components/filter'

const INITIAL_FILTER: FilterState = {
  mode: 'sort',
  category: [],
  length: null,
  popularity: null,
  availability: false,
  gift: false
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [books, setBooks] = useState<Book[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGiftMode, setIsGiftMode] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showGiftSplash, setShowGiftSplash] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Filter state
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Splash screen logic
  useEffect(() => {
    const checkSplash = () => {
      const now = Date.now()
      const lastShown = localStorage.getItem('pf_splash_last_shown')
      const visitCount = parseInt(localStorage.getItem('pf_splash_visits') || '0', 10)

      const FIFTEEN_MINUTES = 15 * 60 * 1000
      const isTimeout = !lastShown || (now - parseInt(lastShown, 10) > FIFTEEN_MINUTES)
      const isThirdVisit = (visitCount + 1) % 3 === 0

      // Show splash if:
      // 1. First time (no lastShown)
      // 2. Timeout expired
      // 3. 3rd visit (actually 3rd, 6th, etc.)
      const shouldShow = isTimeout || isThirdVisit || visitCount === 0

      if (shouldShow) {
        setShowSplash(true)
        localStorage.setItem('pf_splash_last_shown', now.toString())
        // If timeout or first time, reset count? Or just keep counting?
        // User said "only on 3rd reload", implying frequency.
        // Let's increment count strictly.
        localStorage.setItem('pf_splash_visits', (visitCount + 1).toString())
      } else {
        setShowSplash(false)
        localStorage.setItem('pf_splash_visits', (visitCount + 1).toString())
      }
      // Don't set isLoading false here, wait for data
    }

    checkSplash()

    async function fetchBooks() {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('title')

      if (data && !error) {
        setBooks(data)
      }
      setIsLoading(false)
    }

    fetchBooks()
  }, [])

  // Sync filter state with gift mode
  useEffect(() => {
    if (isGiftMode !== filterState.gift) {
      setFilterState(prev => ({ ...prev, gift: isGiftMode }))
    }
  }, [isGiftMode])

  // Filter books
  const displayBooks = books.filter(book => {
    // Gift Filter
    if ((isGiftMode || filterState.gift) && (!book.is_gift_eligible || book.status !== 'available')) {
      return false
    }

    // Availability Filter
    if (filterState.availability && book.status !== 'available') {
      return false
    }

    // Category Filter (Primary match)
    if (filterState.category.length > 0) {
      const cats = [book.main_category, book.niche, book.primary_type].filter(Boolean)
      const hasMatch = filterState.category.some(c => cats.includes(c))
      if (!hasMatch) return false
    }

    // Length Filter
    if (filterState.length && book.length !== filterState.length) {
      return false
    }

    // Popularity Filter (Mock logic as popularity is float in DB usually)
    // Legacy mapping: 0-0.3 Niche, 0.3-0.7 Moderate, >0.7 Renowned?
    // Let's use string match if book has popularity_text or similar. 
    // Checking `BookSlide`, it uses `book_popularity` (float?). 
    // `assets/gifts_metadata.csv` had `book_popularity` as float.
    // Let's approximate:
    if (filterState.popularity) {
      const score = book.book_popularity || 0
      if (filterState.popularity === 'Renowned' && score < 0.8) return false
      if (filterState.popularity === 'Moderate' && (score < 0.4 || score >= 0.8)) return false
      if (filterState.popularity === 'Niche' && score >= 0.4) return false
    }

    return true
  })

  // Calculate active filters for button
  const activeFilters = [
    ...filterState.category.map(c => ({ label: 'Category', value: c })),
    ...(filterState.length ? [{ label: 'Length', value: filterState.length }] : []),
    ...(filterState.popularity ? [{ label: 'Popularity', value: filterState.popularity }] : [])
  ]

  const handleClearFilters = () => {
    setFilterState(INITIAL_FILTER)
  }

  // Filter Element to pass to Header
  const filterElement = (
    <div className="relative z-50">
      <div className="flex items-center gap-2">
        {/* Filter Button */}
        {!isFilterOpen && (
          <FilterButton
            isExpanded={false}
            activeFilters={activeFilters}
            onToggle={() => setIsFilterOpen(true)}
            onClear={handleClearFilters}
          />
        )}
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="absolute top-0 left-0 min-w-[320px]">
          <FilterPanel
            state={filterState}
            onChange={(s) => setFilterState(s)}
            onClose={() => setIsFilterOpen(false)}
            className="shadow-xl"
          />
        </div>
      )}
    </div>
  )

  // Navigate with transition animation
  const navigateTo = useCallback((newIndex: number) => {
    if (newIndex === currentIndex || displayBooks.length === 0) return

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 200)
  }, [currentIndex, displayBooks.length])

  const goToPrev = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : displayBooks.length - 1
    navigateTo(newIndex)
  }, [currentIndex, displayBooks.length, navigateTo])

  const goToNext = useCallback(() => {
    const newIndex = currentIndex < displayBooks.length - 1 ? currentIndex + 1 : 0
    navigateTo(newIndex)
  }, [currentIndex, displayBooks.length, navigateTo])

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev
      document.documentElement.setAttribute('data-theme', newValue ? 'dark' : 'light')
      return newValue
    })
  }

  // Handle gift splash complete
  const handleGiftSplashComplete = () => {
    setShowGiftSplash(false)
    // Mode is already enabled by context
  }

  // Handle book action
  const handleBookAction = (book: Book) => {
    console.log('Action on book:', book.title)
    // TODO: Implement verification modal
  }

  // Handle full list click
  const handleFullListClick = () => {
    window.location.href = '/library'
  }

  // Show welcome splash
  if (showSplash) {
    return (
      <SplashScreen
        variant="welcome"
        onComplete={() => setShowSplash(false)}
      />
    )
  }

  // Show gift splash
  if (showGiftSplash) {
    return (
      <SplashScreen
        variant="gifting"
        onComplete={handleGiftSplashComplete}
      />
    )
  }

  const currentBook = displayBooks[currentIndex]

  return (
    <main className={`min-h-screen bg-bg flex flex-col ${isGiftMode ? 'gift-mode' : ''}`}>
      {/* Header */}
      <Header
        isGiftMode={isGiftMode}
        isDarkMode={isDarkMode}
        onGiftModeToggle={toggleGiftMode}
        onThemeToggle={toggleTheme}
        onFullListClick={handleFullListClick}
        collectionCount={0}
        filterElement={filterElement}
      />

      {/* Main content */}
      <div className="flex-1 pt-16 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-sans text-stone">Loading books...</p>
          </div>
        ) : displayBooks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-sans text-stone">No books available.</p>
          </div>
        ) : (
          <>
            {/* Book Slide */}
            <div className="flex-1">
              {currentBook && (
                <BookSlide
                  book={currentBook}
                  isGiftMode={isGiftMode}
                  isTransitioning={isTransitioning}
                  onAction={handleBookAction}
                  onPrev={goToPrev}
                  onNext={goToNext}
                />
              )}
            </div>

            {/* Arc Carousel */}
            <ArcCarousel
              books={displayBooks}
              currentIndex={currentIndex}
              onSelect={navigateTo}
              className="border-t border-sand"
            />
          </>
        )}
      </div>
    </main>
  )
}
