import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for database tables
export interface Book {
  id: string
  slug: string
  title: string
  author: string
  subtitle?: string
  description?: string
  cover_image?: string
  primary_type: 'Fiction' | 'Non-fiction'
  main_category: string
  niche: string
  author_popularity: number
  book_popularity: number
  length: 'Short' | 'Medium' | 'Long'
  status: 'available' | 'reserved' | 'unavailable'
  is_gift_eligible: boolean
  accolade_text?: string
  major_award?: string
  number_of_bestsellers?: number
  number_of_awards?: number
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  uuid: string
  email_hash?: string
  email_verified: boolean
  onboarding_complete: boolean
  gift_claimed: boolean
  created_at: string
}

export interface BookRequest {
  id: string
  requested_title: string
  author?: string
  format_preference?: 'physical' | 'ebook' | 'audio'
  note?: string
  user_uuid: string
  user_email_hash?: string
  is_read: boolean
  created_at: string
}

export interface AppEvent {
  id: string
  type: 'gift.selected' | 'request.submitted' | 'order.created'
  payload: Record<string, unknown>
  user_uuid?: string
  is_read: boolean
  created_at: string
}

export interface Collection {
  id: string
  user_id: string
  book_id: string
  status: 'selected' | 'confirmed' | 'shipped' | 'delivered'
  created_at: string
  confirmed_at?: string
}
