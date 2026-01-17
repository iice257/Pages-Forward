'use client'

import { useMemo } from 'react'
import type { Book } from '@/lib/supabase'

interface BookGroup {
  letter: string
  books: Book[]
}

export function useGrouping(books: Book[]): BookGroup[] {
  return useMemo(() => {
    // Group by first letter of title
    const groups: Record<string, Book[]> = {}

    for (const book of books) {
      const firstLetter = book.title[0].toUpperCase()
      const letter = /[A-Z]/.test(firstLetter) ? firstLetter : '#'

      if (!groups[letter]) {
        groups[letter] = []
      }
      groups[letter].push(book)
    }

    // Sort groups alphabetically and sort books within each group
    const sortedLetters = Object.keys(groups).sort((a, b) => {
      if (a === '#') return 1
      if (b === '#') return -1
      return a.localeCompare(b)
    })

    return sortedLetters.map((letter) => ({
      letter,
      books: groups[letter].sort((a, b) => a.title.localeCompare(b.title)),
    }))
  }, [books])
}
