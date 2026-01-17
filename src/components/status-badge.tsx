import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type BookStatus = 'available' | 'reserved' | 'unavailable'

interface StatusBadgeProps {
  status: BookStatus
  className?: string
}

const statusConfig: Record<BookStatus, { label: string; dotClass: string; textClass: string }> = {
  available: {
    label: 'Available',
    dotClass: 'bg-avail',
    textClass: 'text-avail',
  },
  reserved: {
    label: 'Reserved',
    dotClass: 'bg-amber',
    textClass: 'text-amber',
  },
  unavailable: {
    label: 'Unavailable',
    dotClass: 'bg-red',
    textClass: 'text-red',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge
      variant="outline"
      className={cn(
        'gap-1.5 border-sand bg-bg2/50 font-sans text-xs',
        config.textClass,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dotClass)} />
      {config.label}
    </Badge>
  )
}
