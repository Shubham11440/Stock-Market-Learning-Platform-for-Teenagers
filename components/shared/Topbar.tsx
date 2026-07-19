'use client'

import { Bell, Search, User, Settings, LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { cn, getValidAvatarUrl, getAvatarEmoji } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TopbarProps {
  title?: string
  className?: string
}

export function Topbar({ title, className }: TopbarProps) {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <header
      className={cn(
        'h-16 flex items-center gap-4 px-4 lg:px-6',
        'bg-surface/80 backdrop-blur-xl border-b border-border',
        'sticky top-0 z-30',
        className
      )}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        {title && (
          <h1 className="text-base font-semibold text-text-1 font-display truncate">
            {title}
          </h1>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search button */}
        <button
          aria-label="Search"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-text-2 hover:text-text-1 hover:bg-surface-2 border border-transparent hover:border-border transition-all duration-200 cursor-pointer"
        >
          <Search size={16} />
        </button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-text-2 hover:text-text-1 hover:bg-surface-2 border border-transparent hover:border-border transition-all duration-200 cursor-pointer outline-none"
            >
              <Bell size={16} />
              {/* Unread dot */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-light ring-2 ring-surface" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="py-4 text-center text-sm text-text-3">
              No new notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User avatar Dropdown */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="User menu"
                className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/30 hover:ring-primary/60 transition-all duration-200 cursor-pointer outline-none"
              >
                {(() => {
                  const emoji = getAvatarEmoji(user.image)
                  const validSrc = getValidAvatarUrl(user.image, user.name ?? undefined)
                  if (emoji) {
                    return (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center text-lg">
                        {emoji}
                      </div>
                    )
                  }
                  if (validSrc) {
                    return <Image src={validSrc} alt={user.name || 'User'} width={36} height={36} className="w-full h-full object-cover" />
                  }
                  return (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-sm font-semibold font-display">
                      {user.name?.[0]?.toUpperCase() || 'S'}
                    </div>
                  )
                })()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span>{user.name}</span>
                <span className="text-xs text-text-3 font-normal">{user.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })} className="text-loss focus:bg-loss/10 focus:text-loss">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
