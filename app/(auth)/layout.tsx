import { Logo } from '@/components/shared/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

// Minimal centered layout for auth pages (login, signup, onboarding)
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg flex flex-col dot-grid">
      {/* Top nav — just logo + theme toggle */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 bg-surface/40 backdrop-blur-sm">
        <Logo size="sm" />
        <ThemeToggle />
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-12 flex items-center justify-center">
        <p className="text-xs text-text-3">
          © {new Date().getFullYear()} StockUp. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
