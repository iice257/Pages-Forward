import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface GenreTagProps {
  genre: string
  variant?: 'default' | 'primary' | 'niche'
  className?: string
}

export function GenreTag({ genre, variant = 'default', className }: GenreTagProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-sans text-xs border-sand/60',
        variant === 'primary' && 'bg-olive/10 text-olive border-olive/30',
        variant === 'niche' && 'bg-sage/10 text-sage border-sage/30 italic',
        variant === 'default' && 'bg-bg3/50 text-stone',
        className
      )}
    >
      {genre}
    </Badge>
  )
}
