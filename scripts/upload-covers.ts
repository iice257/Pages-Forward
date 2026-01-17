/**
 * Upload book covers to Supabase Storage
 * Run with: npx tsx scripts/upload-covers.ts
 */

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Load environment variables from .env.local
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const COVERS_DIR = path.join(process.cwd(), 'assets', 'covers')
const BUCKET_NAME = 'covers'

async function uploadCovers() {
  console.log('📚 Uploading book covers to Supabase Storage...\n')

  // Read all files in covers directory
  const files = fs.readdirSync(COVERS_DIR).filter(f =>
    f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp')
  )

  console.log(`Found ${files.length} cover images\n`)

  let uploaded = 0
  let failed = 0

  for (const file of files) {
    const filePath = path.join(COVERS_DIR, file)
    const fileBuffer = fs.readFileSync(filePath)

    const contentType = file.endsWith('.png')
      ? 'image/png'
      : file.endsWith('.webp')
        ? 'image/webp'
        : 'image/jpeg'

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(file, fileBuffer, {
        contentType,
        upsert: true, // Overwrite if exists
      })

    if (error) {
      console.error(`❌ Failed: ${file} - ${error.message}`)
      failed++
    } else {
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(file)

      console.log(`✓ ${file} → ${publicUrl}`)
      uploaded++
    }
  }

  console.log(`\n✅ Uploaded: ${uploaded}`)
  console.log(`❌ Failed: ${failed}`)

  // Update database with public URLs
  console.log('\n📝 Updating database with public URLs...\n')

  const { data: books, error: fetchError } = await supabase
    .from('books')
    .select('id, cover_image')

  if (fetchError) {
    console.error('Failed to fetch books:', fetchError.message)
    return
  }

  for (const book of books || []) {
    if (!book.cover_image) continue

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(book.cover_image)

    const { error: updateError } = await supabase
      .from('books')
      .update({ cover_image: publicUrl })
      .eq('id', book.id)

    if (updateError) {
      console.error(`❌ Failed to update ${book.id}: ${updateError.message}`)
    } else {
      console.log(`✓ Updated book ${book.id}`)
    }
  }

  console.log('\n🎉 Done!')
}

uploadCovers()
