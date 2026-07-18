import { Sidebar } from '@/components/shared/Sidebar'
import { MobileNav } from '@/components/shared/MobileNav'
import { Topbar } from '@/components/shared/Topbar'

// Dashboard layout:
//  ┌──────────────────────────────────────────────┐
//  │  Sidebar (desktop) │  Topbar                 │
//  │                    │  ─────────────────────  │
//  │                    │  Main content           │
//  │                    │                         │
//  ├────────────────────────────────────────────  │
//  │  MobileNav (bottom, mobile only)             │
//  └──────────────────────────────────────────────┘

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg flex">
      {/* Desktop sidebar — fixed left */}
      <Sidebar />

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col lg:pl-[240px] transition-[padding] duration-300 min-w-0">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  )
}
