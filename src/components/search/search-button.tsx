'use client'

import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchButtonProps {
  isExpanded: boolean
  onToggle: () => void
  className?: string
}

export function SearchButton({
  isExpanded,
  onToggle,
  className,
}: SearchButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn(
        'h-9 w-9 transition-all',
        isExpanded && 'bg-bg3',
        className
      )}
    >
      {isExpanded ? (
        <X className="h-4 w-4" />
      ) : (
        <Search className="h-4 w-4" />
      )}
    </Button>
  )
}
