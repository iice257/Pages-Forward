'use client'

import { Suspense, useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { FilterButton, FilterPanel, type FilterState } from '@/components/filter'
import { SearchButton, SearchCombobox } from '@/components/search'
import { RequestModal } from '@/components/request-modal'
import { BookCover } from '@/components/book-cover'
import { StatusBadge } from '@/components/status-badge'
import { GenreTag } from '@/components/genre-tag'
import { supabase, type Book } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { BookPlus } from 'lucide-react'
import Link from 'next/link'

function LibraryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const [requestQuery, setRequestQuery] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Parse filter state from URL
  const filterState: FilterState = useMemo(() => ({
    mode: (searchParams.get('mode') as 'sort' | 'filter') || 'filter',
    category: searchParams.get('category')?.split(',').filter(Boolean) || [],
    length: searchParams.get('length'),
    popularity: searchParams.get('popularity'),
    availability: searchParams.get('availability') === 'true',
    gift: searchParams.get('gift') === 'true',
  }), [searchParams])

  // Fetch books
  useEffect(() => {
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

  // Apply filters
  const filteredBooks = useMemo(() => {
    let result = [...books]

    if (filterState.category.length > 0) {
      result = result.filter((b) =>
        filterState.category.includes(b.primary_type) ||
        filterState.category.includes(b.main_category)
      )
    }

    if (filterState.length) {
      result = result.filter((b) => b.length === filterState.length)
    }

    if (filterState.popularity) {
      result = result.filter((b) => {
        const avg = (b.author_popularity + b.book_popularity) / 2
        if (filterState.popularity === 'Renowned') return avg >= 0.7
        if (filterState.popularity === 'Moderate') return avg >= 0.4 && avg < 0.7
        return avg < 0.4
      })
    }

    if (filterState.availability) {
      result = result.filter((b) => b.status === 'available')
    }

    if (filterState.gift) {
      result = result.filter((b) => b.is_gift_eligible)
    }

    return result
  }, [books, filterState])

  // Group by first letter
  const groupedBooks = useMemo(() => {
    const groups: Record<string, Book[]> = {}
    for (const book of filteredBooks) {
      const letter = book.title[0].toUpperCase()
      const key = /[A-Z]/.test(letter) ? letter : '#'
      if (!groups[key]) groups[key] = []
      groups[key].push(book)
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [filteredBooks])

  // Update URL with filter state
  const updateFilters = (newState: FilterState) => {
    const params = new URLSearchParams()
    if (newState.mode !== 'filter') params.set('mode', newState.mode)
    if (newState.category.length > 0) params.set('category', newState.category.join(','))
    if (newState.length) params.set('length', newState.length)
    if (newState.popularity) params.set('popularity', newState.popularity)
    if (newState.availability) params.set('availability', 'true')
    if (newState.gift) params.set('gift', 'true')
    router.push(`/library?${params.toString()}`, { scroll: false })
  }

  const handleBookSelect = (book: Book) => {
    const idx = books.findIndex((b) => b.id === book.id)
    router.push(`/?index=${idx}`)
  }

  const handleRequestBook = (query: string) => {
    setRequestQuery(query)
    setIsRequestOpen(true)
  }

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      document.documentElement.setAttribute('data-theme', !prev ? 'dark' : 'light')
      return !prev
    })
  }

  const hasActiveFilters = filterState.category.length > 0 ||
    filterState.length !== null ||
    filterState.popularity !== null ||
    filterState.availability ||
    filterState.gift

  return (
    <main className="min-h-screen bg-bg">
      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
        onFullListClick={() => { }}
      />

      <RequestModal
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
        initialQuery={requestQuery}
      />

      {/* Toolbar */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-bg/90 backdrop-blur-sm border-b border-sand">
        <div className="flex items-center justify-between h-14 px-6 md:px-8 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-sans text-sm text-stone hover:text-ink">
              ← Back
            </Link>

            <FilterButton
              isExpanded={isFilterOpen}
              activeFilters={hasActiveFilters ? (() => {
                const filters = []
                if (filterState.category.length > 0) {
                  filters.push({ label: 'Category', value: filterState.category[0] })
                }
                if (filterState.length) {
                  filters.push({ label: 'Length', value: filterState.length })
                }
                if (filterState.popularity) {
                  filters.push({ label: 'Popularity', value: filterState.popularity })
                }
                if (filterState.availability) {
                  filters.push({ label: 'Status', value: 'Available' })
                }
                if (filterState.gift) {
                  filters.push({ label: 'Mode', value: 'Gift Eligible' })
                }
                return filters
              })() : undefined}
              onToggle={() => {
                setIsFilterOpen(!isFilterOpen)
                setIsSearchOpen(false)
              }}
              onClear={() => router.push('/library')}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-sans text-sm text-stone">
              {filteredBooks.length} books
            </span>
            <SearchButton
              isExpanded={isSearchOpen}
              onToggle={() => {
                setIsSearchOpen(!isSearchOpen)
                setIsFilterOpen(false)
              }}
            />
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="absolute top-full left-6 mt-2 w-72 z-40">
            <FilterPanel
              state={filterState}
              onChange={updateFilters}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        )}

        {/* Search Combobox */}
        {isSearchOpen && (
          <div className="absolute top-full right-6 mt-2 w-96 z-40">
            <SearchCombobox
              books={books}
              onSelect={handleBookSelect}
              onRequestBook={handleRequestBook}
              onClose={() => setIsSearchOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-32 pb-16 px-6 md:px-8 max-w-[1600px] mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-sans text-stone">Loading...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-sans text-stone mb-4">No books match your filters</p>
            <button
              onClick={() => handleRequestBook('')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-sans text-sage border border-sage/30 rounded-md hover:bg-sage/5"
            >
              <BookPlus className="h-4 w-4" />
              Request a book
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedBooks.map(([letter, letterBooks]) => (
              <section key={letter}>
                <h2 className="font-display text-2xl text-ink mb-6 sticky top-32 bg-bg/90 backdrop-blur-sm py-2 -mx-2 px-2">
                  {letter}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {letterBooks.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => handleBookSelect(book)}
                      className="group text-left focus:outline-none"
                    >
                      <div className="relative aspect-[2/3] rounded overflow-hidden shadow-md group-hover:shadow-lg transition-shadow mb-3">
                        <BookCover
                          src={book.cover_image}
                          alt={book.title}
                          className="w-full h-full"
                        />
                        {book.accolade_text && (
                          <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-[var(--gold-1)] via-[var(--gold-2)] to-[var(--gold-3)] text-ink text-[8px] font-sans font-semibold text-center py-1 rounded">
                            {book.accolade_text}
                          </div>
                        )}
                      </div>
                      <h3 className="font-display text-sm text-ink group-hover:text-sage transition-colors line-clamp-2 mb-1">
                        {book.title}
                      </h3>
                      <p className="font-sans text-xs text-stone mb-2">
                        {book.author}
                      </p>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={book.status} className="text-[10px]" />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center"><p className="font-sans text-stone">Loading...</p></div>}>
      <LibraryContent />
    </Suspense>
  )
}
