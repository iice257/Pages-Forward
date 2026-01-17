'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FilterButtonProps {
  isExpanded: boolean
  activeFilters?: { label: string; value: string }[]
  onToggle: () => void
  onClear?: () => void
  className?: string
}

export function FilterButton({
  isExpanded,
  activeFilters,
  onToggle,
  onClear,
  className,
}: FilterButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={cn(
        'gap-2 transition-all duration-300',
        isExpanded && 'bg-bg3',
        className
      )}
    >
      <SlidersHorizontal className="h-4 w-4" />

      {activeFilters && activeFilters.length > 0 ? (
        <span className="text-sm flex items-center">
          {activeFilters.map((filter, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && <span className="mx-3 text-[5px] text-stone">●</span>}
              <span className="text-stone mr-1.5">{filter.label}</span>
              <span className="text-char font-medium">{filter.value}</span>
            </span>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClear?.()
            }}
            className="ml-3 hover:text-red p-1 rounded-full hover:bg-bg3 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ) : (
        <span className="hidden md:inline text-sm">Filter</span>
      )}
    </Button>
  )
}
