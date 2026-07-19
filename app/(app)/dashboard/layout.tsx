import { Sidebar } from '@/components/shared/Sidebar'
import { MobileNav } from '@/components/shared/MobileNav'
import { Topbar } from '@/components/shared/Topbar'
import { StockBot } from '@/components/ai/StockBot'
import { WelcomeQuest } from '@/components/onboarding/WelcomeQuest'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

import { DashboardContentWrapper } from '@/components/shared/DashboardContentWrapper'

// Dashboard layout:
//  ┌──────────────────────────────────────────────┐
//  │  Sidebar (desktop) │  Topbar                 │
//  │                    │  ─────────────────────  │
//  │                    │  Main content           │
//  │                    │                         │
//  ├────────────────────────────────────────────  │
//  │  MobileNav (bottom, mobile only)             │
//  └──────────────────────────────────────────────┘

export default async function DashboardLayout({ 
  children,
  modal 
}: { 
  children: React.ReactNode
  modal: React.ReactNode 
}) {
  const session = await auth()
  let hasCompletedTour = true

  if (session?.user?.email) {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { hasCompletedTour: true }
    })
    if (user) {
      hasCompletedTour = user.hasCompletedTour
    }
  }

  return (
    <div className="min-h-dvh bg-bg flex">
      {/* Desktop sidebar — fixed left */}
      <Sidebar />

      {/* Main content area — offset by sidebar width on desktop */}
      <DashboardContentWrapper>
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 relative">
          {children}
        </main>
      </DashboardContentWrapper>

      {/* Mobile bottom nav */}
      <MobileNav />

      {/* AI Mentor Floating Widget */}
      <StockBot />
      
      {/* Intercepted Modals Render Here */}
      {modal}

      {/* Welcome Quest / Product Tour */}
      <WelcomeQuest initialHasCompleted={hasCompletedTour} />
    </div>
  )
}
