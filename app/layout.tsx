import type { Metadata, Viewport } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/shared/ThemeProvider'
import './globals.css'

// ── Fonts ───────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

// ── Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'StockUp — Learn. Trade. Level Up.',
    template: '%s | StockUp',
  },
  description:
    'StockUp is a gamified stock market learning platform for Indian teenagers. Learn trading basics, practice with virtual money, and level up your financial knowledge.',
  keywords: [
    'stock market learning',
    'invest for teenagers',
    'paper trading India',
    'financial literacy',
    'gamified investing',
    'NSE BSE learn',
    'StockUp',
  ],
  authors: [{ name: 'StockUp Team' }],
  creator: 'StockUp',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'StockUp — Learn. Trade. Level Up.',
    description: 'Gamified stock market learning platform for Indian teenagers.',
    siteName: 'StockUp',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StockUp — Learn. Trade. Level Up.',
    description: 'Gamified stock market learning platform for Indian teenagers.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F9FF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
  ],
  width: 'device-width',
  initialScale: 1,
}

// ── Root Layout ─────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-bg text-text-1 font-sans antialiased">
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: 'rgb(var(--surface-2))',
                color: 'rgb(var(--text-1))',
                border: '1px solid rgb(var(--border))',
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily: 'var(--font-inter)',
              },
              success: {
                iconTheme: { primary: '#10B981', secondary: 'white' },
              },
              error: {
                iconTheme: { primary: '#EF4444', secondary: 'white' },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
