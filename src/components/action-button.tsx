'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Plus, Check, Bookmark } from 'lucide-react'

interface ActionButtonProps {
  variant?: 'add' | 'choose' | 'chosen'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function ActionButton({
  variant = 'add',
  onClick,
  disabled,
  className
}: ActionButtonProps) {
  const config = {
    add: {
      label: 'Add',
      icon: Plus,
      className: 'bg-sage hover:bg-sage/90 text-white',
    },
    choose: {
      label: 'Choose',
      icon: Bookmark,
      className: 'bg-gradient-to-r from-[var(--gold-1)] via-[var(--gold-2)] to-[var(--gold-3)] text-ink hover:opacity-90',
    },
    chosen: {
      label: 'Chosen',
      icon: Check,
      className: 'bg-sage/20 text-sage border border-sage cursor-default',
    },
  }

  const { label, icon: Icon, className: variantClass } = config[variant]

  return (
    <Button
      onClick={onClick}
      disabled={disabled || variant === 'chosen'}
      className={cn(
        'gap-2 font-sans text-sm transition-all',
        variantClass,
        className
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  )
}
