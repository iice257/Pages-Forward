import type { Metadata } from 'next'
import { Inter, Playfair_Display, Source_Serif_4, Jost } from 'next/font/google'
import './globals.css'
import { GiftModeProvider } from '@/context/gift-mode'

// Brand font - bold sans-serif for "PAGES FORWARD"
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-brand',
  weight: ['600', '700'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--ff',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--fb',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--fs',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pages Forward | Curated Book Catalog',
  description: 'Choose what moves you forward. A curated book discovery experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${sourceSerif.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <GiftModeProvider>
          {children}
        </GiftModeProvider>
      </body>
    </html>
  )
}
