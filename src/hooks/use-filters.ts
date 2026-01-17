'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useMemo, useCallback } from 'react'
import type { Book } from '@/lib/supabase'

export interface FilterState {
  mode: 'sort' | 'filter'
  category: string[]
  length: string | null
  popularity: string | null
  availability: boolean
  gift: boolean
}

const defaultFilterState: FilterState = {
  mode: 'filter',
  category: [],
  length: null,
  popularity: null,
  availability: false,
  gift: false,
}

export function useFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Parse filter state from URL
  const state = useMemo((): FilterState => {
    return {
      mode: (searchParams.get('mode') as 'sort' | 'filter') || 'filter',
      category: searchParams.get('category')?.split(',').filter(Boolean) || [],
      length: searchParams.get('length'),
      popularity: searchParams.get('popularity'),
      availability: searchParams.get('availability') === 'true',
      gift: searchParams.get('gift') === 'true',
    }
  }, [searchParams])

  // Update URL with new filter state
  const setState = useCallback((newState: FilterState) => {
    const params = new URLSearchParams()

    if (newState.mode !== 'filter') params.set('mode', newState.mode)
    if (newState.category.length > 0) params.set('category', newState.category.join(','))
    if (newState.length) params.set('length', newState.length)
    if (newState.popularity) params.set('popularity', newState.popularity)
    if (newState.availability) params.set('availability', 'true')
    if (newState.gift) params.set('gift', 'true')

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [router, pathname])

  // Reset filters
  const reset = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      state.category.length > 0 ||
      state.length !== null ||
      state.popularity !== null ||
      state.availability ||
      state.gift
    )
  }, [state])

  // Get active filter display
  const activeFilterDisplay = useMemo((): { parent: string; child: string } | null => {
    if (state.category.length > 0) {
      return { parent: 'Category', child: state.category.join(', ') }
    }
    if (state.length) {
      return { parent: 'Length', child: state.length }
    }
    if (state.popularity) {
      return { parent: 'Popularity', child: state.popularity }
    }
    if (state.availability) {
      return { parent: 'Status', child: 'Available' }
    }
    if (state.gift) {
      return { parent: 'Type', child: 'Gift Eligible' }
    }
    return null
  }, [state])

  // Apply filters to book list
  const applyFilters = useCallback((books: Book[]): Book[] => {
    let filtered = [...books]

    // Category filter
    if (state.category.length > 0) {
      filtered = filtered.filter((book) =>
        state.category.includes(book.primary_type) ||
        state.category.includes(book.main_category)
      )
    }

    // Length filter
    if (state.length) {
      filtered = filtered.filter((book) => book.length === state.length)
    }

    // Popularity filter (convert to tiers)
    if (state.popularity) {
      filtered = filtered.filter((book) => {
        const avgPop = (book.author_popularity + book.book_popularity) / 2
        if (state.popularity === 'Renowned') return avgPop >= 0.7
        if (state.popularity === 'Moderate') return avgPop >= 0.4 && avgPop < 0.7
        if (state.popularity === 'Niche') return avgPop < 0.4
        return true
      })
    }

    // Availability filter
    if (state.availability) {
      filtered = filtered.filter((book) => book.status === 'available')
    }

    // Gift filter
    if (state.gift) {
      filtered = filtered.filter((book) => book.is_gift_eligible)
    }

    // Sorting
    if (state.mode === 'sort') {
      if (state.popularity) {
        filtered.sort((a, b) => {
          const avgA = (a.author_popularity + a.book_popularity) / 2
          const avgB = (b.author_popularity + b.book_popularity) / 2
          return avgB - avgA // Descending
        })
      }
    }

    return filtered
  }, [state])

  return {
    state,
    setState,
    reset,
    hasActiveFilters,
    activeFilterDisplay,
    applyFilters,
  }
}
