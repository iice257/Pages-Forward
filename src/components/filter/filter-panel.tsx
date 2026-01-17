'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FilterGroup } from './filter-group'

export type FilterMode = 'sort' | 'filter'

export interface FilterState {
  mode: FilterMode
  category: string[]
  length: string | null
  popularity: string | null
  availability: boolean
  gift: boolean
}

interface FilterPanelProps {
  state: FilterState
  onChange: (state: FilterState) => void
  onClose: () => void
  className?: string
}

const CATEGORIES = [
  'Fiction', 'Non-fiction',
  'Business', 'Motivational', 'Romance', 'Sci-Fi',
  'Health', 'Mental', 'Biography', 'History',
  'Psychology', 'Self-Help', 'Philosophy', 'Finance',
  'Technology', 'Politics', 'Culture', 'Religion / Spirituality', 'Other'
]

const LENGTHS = ['Short', 'Medium', 'Long']
const POPULARITY = ['Renowned', 'Moderate', 'Niche']

export function FilterPanel({
  state,
  onChange,
  onClose,
  className,
}: FilterPanelProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const handleCategorySelect = (category: string) => {
    const current = state.category
    let newCategories: string[]

    if (current.includes(category)) {
      // Remove if already selected
      newCategories = current.filter((c) => c !== category)
    } else if (current.length < 2) {
      // Add if under limit
      newCategories = [...current, category]
    } else {
      // Replace oldest if at limit
      newCategories = [current[1], category]
    }

    onChange({ ...state, category: newCategories })
    setOpenGroup(null)
    onClose()
  }

  const handleLengthSelect = (length: string) => {
    onChange({ ...state, length: state.length === length ? null : length })
    setOpenGroup(null)
    onClose()
  }

  const handlePopularitySelect = (popularity: string) => {
    onChange({ ...state, popularity: state.popularity === popularity ? null : popularity })
    setOpenGroup(null)
    onClose()
  }

  const handleAvailabilityToggle = () => {
    onChange({ ...state, availability: !state.availability })
    onClose()
  }

  const handleGiftToggle = () => {
    onChange({ ...state, gift: !state.gift })
    onClose()
  }

  return (
    <div className={cn('flex flex-col gap-2 p-3 bg-bg2 border border-sand rounded-lg shadow-lg', className)}>
      {/* Sort/Filter Toggle */}
      <div className="flex gap-1 p-1 bg-bg3 rounded-md">
        <button
          onClick={() => onChange({ ...state, mode: 'sort' })}
          className={cn(
            'flex-1 px-3 py-1.5 text-xs font-sans rounded transition-colors',
            state.mode === 'sort' ? 'bg-bg text-ink shadow-sm' : 'text-stone hover:text-char'
          )}
        >
          Sort
        </button>
        <button
          onClick={() => onChange({ ...state, mode: 'filter' })}
          className={cn(
            'flex-1 px-3 py-1.5 text-xs font-sans rounded transition-colors',
            state.mode === 'filter' ? 'bg-bg text-ink shadow-sm' : 'text-stone hover:text-char'
          )}
        >
          Filter
        </button>
      </div>

      {/* Filter Groups */}
      <FilterGroup
        label="Category"
        isOpen={openGroup === 'category'}
        onToggle={() => setOpenGroup(openGroup === 'category' ? null : 'category')}
        options={CATEGORIES}
        selected={state.category}
        onSelect={handleCategorySelect}
        multiSelect
        maxSelect={2}
      />

      <FilterGroup
        label="Length"
        isOpen={openGroup === 'length'}
        onToggle={() => setOpenGroup(openGroup === 'length' ? null : 'length')}
        options={LENGTHS}
        selected={state.length ? [state.length] : []}
        onSelect={handleLengthSelect}
      />

      <FilterGroup
        label="Popularity"
        isOpen={openGroup === 'popularity'}
        onToggle={() => setOpenGroup(openGroup === 'popularity' ? null : 'popularity')}
        options={POPULARITY}
        selected={state.popularity ? [state.popularity] : []}
        onSelect={handlePopularitySelect}
      />

      {/* Toggle filters */}
      <div className="flex gap-2 pt-2 border-t border-sand">
        <button
          onClick={handleAvailabilityToggle}
          className={cn(
            'flex-1 px-3 py-2 text-xs font-sans rounded border transition-colors',
            state.availability
              ? 'bg-avail/10 text-avail border-avail/30'
              : 'bg-bg3 text-stone border-sand hover:text-char'
          )}
        >
          Available Only
        </button>
        <button
          onClick={handleGiftToggle}
          className={cn(
            'flex-1 px-3 py-2 text-xs font-sans rounded border transition-colors',
            state.gift
              ? 'bg-gradient-to-r from-[var(--gold-1)]/20 to-[var(--gold-3)]/20 text-amber border-amber/30'
              : 'bg-bg3 text-stone border-sand hover:text-char'
          )}
        >
          Gift Eligible
        </button>
      </div>
    </div>
  )
}
