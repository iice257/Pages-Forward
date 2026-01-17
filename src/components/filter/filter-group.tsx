'use client'

import { cn } from '@/lib/utils'
import { ChevronDown, Check } from 'lucide-react'

interface FilterGroupProps {
  label: string
  isOpen: boolean
  onToggle: () => void
  options: string[]
  selected: string[]
  onSelect: (option: string) => void
  multiSelect?: boolean
  maxSelect?: number
  className?: string
}

export function FilterGroup({
  label,
  isOpen,
  onToggle,
  options,
  selected,
  onSelect,
  multiSelect = false,
  maxSelect = 1,
  className,
}: FilterGroupProps) {
  return (
    <div className={className}>
      {/* Group header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-sans text-char hover:text-ink hover:bg-bg3 rounded transition-colors"
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-stone transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Options */}
      {isOpen && (
        <div className="mt-1 flex flex-wrap gap-1.5 px-2 py-2 bg-bg3/50 rounded">
          {options.map((option) => {
            const isSelected = selected.includes(option)
            const canSelect = isSelected || selected.length < maxSelect || !multiSelect

            return (
              <button
                key={option}
                onClick={() => onSelect(option)}
                disabled={!canSelect && !isSelected}
                className={cn(
                  'px-2 py-1 text-xs font-sans rounded border transition-colors',
                  isSelected
                    ? 'bg-sage/10 text-sage border-sage/30'
                    : canSelect
                      ? 'bg-bg text-stone border-sand hover:text-char hover:border-stone'
                      : 'bg-bg text-clay border-sand/50 cursor-not-allowed opacity-50'
                )}
              >
                {isSelected && <Check className="inline h-3 w-3 mr-1" />}
                {option}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
