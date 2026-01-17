'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface BookCoverProps {
  src?: string | null
  alt: string
  className?: string
  priority?: boolean
}

// Placeholder SVG for missing covers
const PlaceholderCover = ({ title }: { title: string }) => (
  <div className="w-full h-full bg-gradient-to-br from-stone/10 to-clay/20 flex items-center justify-center p-4">
    <span className="font-display text-sm text-stone text-center leading-tight">
      {title.length > 30 ? title.slice(0, 30) + '...' : title}
    </span>
  </div>
)

export function BookCover({ src, alt, className, priority = false }: BookCoverProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if src is a full URL or just a filename
  const imageSrc = src
    ? src.startsWith('http')
      ? src
      : `/covers/${src}` // Fallback to local for dev
    : null

  if (!imageSrc || hasError) {
    return (
      <div className={cn('overflow-hidden', className)}>
        <PlaceholderCover title={alt} />
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone/10 animate-pulse" />
      )}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        priority={priority}
        sizes="(max-width: 768px) 200px, 300px"
      />
    </div>
  )
}
