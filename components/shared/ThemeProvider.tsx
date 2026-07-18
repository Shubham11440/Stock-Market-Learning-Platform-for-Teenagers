'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Wraps the app with next-themes for SSR-safe dark/light switching.
// Defaults to dark theme — that's the primary StockUp experience.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  )
}
