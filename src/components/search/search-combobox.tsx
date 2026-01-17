'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Search, BookPlus } from 'lucide-react'
import type { Book } from '@/lib/supabase'

interface SearchMatch {
  field: string
  value: string
  matchStart: number
  matchEnd: number
}

interface SearchResult {
  book: Book
  matches: SearchMatch[]
}

interface SearchComboboxProps {
  books: Book[]
  onSelect: (book: Book) => void
  onRequestBook: (query: string) => void
  onClose: () => void
  className?: string
}

export function SearchCombobox({
  books,
  onSelect,
  onRequestBook,
  onClose,
  className,
}: SearchComboboxProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Fuzzy search with match highlighting
  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return []

    const lowerQuery = query.toLowerCase()
    const searchResults: SearchResult[] = []

    for (const book of books) {
      const matches: SearchMatch[] = []

      // Search in title
      const titleIndex = book.title.toLowerCase().indexOf(lowerQuery)
      if (titleIndex !== -1) {
        matches.push({
          field: 'Title',
          value: book.title,
          matchStart: titleIndex,
          matchEnd: titleIndex + query.length,
        })
      }

      // Search in author
      const authorIndex = book.author.toLowerCase().indexOf(lowerQuery)
      if (authorIndex !== -1) {
        matches.push({
          field: 'Author',
          value: book.author,
          matchStart: authorIndex,
          matchEnd: authorIndex + query.length,
        })
      }

      // Search in description
      if (book.description) {
        const descIndex = book.description.toLowerCase().indexOf(lowerQuery)
        if (descIndex !== -1) {
          matches.push({
            field: 'Description',
            value: book.description.slice(
              Math.max(0, descIndex - 20),
              Math.min(book.description.length, descIndex + query.length + 30)
            ),
            matchStart: Math.min(20, descIndex),
            matchEnd: Math.min(20, descIndex) + query.length,
          })
        }
      }

      // Search in tags
      const tags = [book.primary_type, book.main_category, book.niche]
      for (const tag of tags) {
        const tagIndex = tag.toLowerCase().indexOf(lowerQuery)
        if (tagIndex !== -1) {
          matches.push({
            field: 'Tag',
            value: tag,
            matchStart: tagIndex,
            matchEnd: tagIndex + query.length,
          })
        }
      }

      if (matches.length > 0) {
        searchResults.push({ book, matches: matches.slice(0, 3) })
      }
    }

    return searchResults.slice(0, 8)
  }, [books, query])

  const handleSelect = (book: Book) => {
    onSelect(book)
    onClose()
  }

  const handleRequestBook = () => {
    if (query.trim()) {
      onRequestBook(query.trim())
    }
  }

  return (
    <div className={cn('w-full max-w-md bg-bg2 border border-sand rounded-lg shadow-lg overflow-hidden', className)}>
      {/* Search input */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-sand">
        <Search className="h-4 w-4 text-stone" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="flex-1 bg-transparent font-sans text-sm text-ink placeholder:text-clay outline-none"
        />
      </div>

      {/* Results */}
      <div className="max-h-80 overflow-y-auto">
        {results.length > 0 ? (
          <ul className="py-1">
            {results.map(({ book, matches }) => (
              <li key={book.id}>
                <button
                  onClick={() => handleSelect(book)}
                  className="w-full px-3 py-2 text-left hover:bg-bg3 transition-colors"
                >
                  <div className="font-display text-sm text-ink">{book.title}</div>
                  <div className="text-xs text-stone mt-0.5">by {book.author}</div>

                  {/* Matched fields */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {matches.map((match, i) => (
                      <span key={i} className="text-[10px] text-clay">
                        <span className="text-stone">{match.field}: </span>
                        {match.value.slice(0, match.matchStart)}
                        <mark className="bg-amber/20 text-amber">
                          {match.value.slice(match.matchStart, match.matchEnd)}
                        </mark>
                        {match.value.slice(match.matchEnd)}
                      </span>
                    ))}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim() ? (
          <div className="py-4 px-3 text-center">
            <p className="text-sm text-stone mb-3">No books found for "{query}"</p>
            <button
              onClick={handleRequestBook}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-sans text-sage hover:text-olive border border-sage/30 rounded-md hover:bg-sage/5 transition-colors"
            >
              <BookPlus className="h-4 w-4" />
              Request "{query}" as a book
            </button>
          </div>
        ) : (
          <div className="py-4 px-3 text-center text-sm text-stone">
            Start typing to search...
          </div>
        )}
      </div>
    </div>
  )
}
