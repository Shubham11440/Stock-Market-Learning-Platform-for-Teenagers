import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LEVEL_XP_REQUIREMENTS, LEVEL_NAMES } from '@/types'

// ── Tailwind merge helper ─────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Number formatting ─────────────────────────────────────────

/**
 * Format a number as Indian Rupees (INR)
 * e.g. 100000 → ₹1,00,000
 */
export function formatINR(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
    return `₹${amount.toFixed(2)}`
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format a percentage change with sign
 * e.g. 2.45 → "+2.45%", -1.2 → "-1.20%"
 */
export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

/**
 * Format large numbers with Indian number system
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value)
}

// ── XP & Level helpers ────────────────────────────────────────

/**
 * Get the current level (1-7) based on total XP
 */
export function getLevelFromXP(xp: number): number {
  let level = 1
  for (let i = LEVEL_XP_REQUIREMENTS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_XP_REQUIREMENTS[i]) {
      level = i + 1
      break
    }
  }
  return Math.min(level, 7)
}

/**
 * Get the XP progress (0–100) within the current level
 */
export function getLevelProgress(xp: number): number {
  const level = getLevelFromXP(xp)
  if (level >= 7) return 100

  const currentLevelXP = LEVEL_XP_REQUIREMENTS[level - 1]
  const nextLevelXP = LEVEL_XP_REQUIREMENTS[level]
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
  return Math.min(Math.max(progress, 0), 100)
}

/**
 * Get the XP required to reach the next level
 */
export function getXPToNextLevel(xp: number): number {
  const level = getLevelFromXP(xp)
  if (level >= 7) return 0
  return LEVEL_XP_REQUIREMENTS[level] - xp
}

/**
 * Get the level name string
 */
export function getLevelName(level: number): string {
  return LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)]
}

// ── Date helpers ──────────────────────────────────────────────

/**
 * Check if two dates are the same calendar day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * Check if a date is yesterday
 */
export function isYesterday(date: Date): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return isSameDay(date, yesterday)
}

/**
 * Format a relative time string (e.g. "2 hours ago")
 */
export function timeAgo(date: Date | string): string {
  const d = new Date(date)
  const now = new Date()
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

// ── Portfolio helpers ─────────────────────────────────────────

/**
 * Calculate P&L for a position
 */
export function calculatePnL(
  quantity: number,
  avgPrice: number,
  currentPrice: number
): { pnl: number; pnlPercent: number } {
  const pnl = (currentPrice - avgPrice) * quantity
  const pnlPercent = ((currentPrice - avgPrice) / avgPrice) * 100
  return { pnl, pnlPercent }
}

// ── Color helpers ─────────────────────────────────────────────

/**
 * Get color class based on positive/negative value
 */
export function getPnLColor(value: number): string {
  if (value > 0) return 'text-emerald-400'
  if (value < 0) return 'text-red-400'
  return 'text-gray-400'
}

/**
 * Get background color class based on badge rarity
 */
export function getBadgeRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    COMMON: 'from-gray-500 to-gray-600',
    RARE: 'from-blue-500 to-blue-600',
    EPIC: 'from-purple-500 to-purple-600',
    LEGENDARY: 'from-amber-400 to-orange-500',
  }
  return colors[rarity] ?? colors.COMMON
}

// ── String helpers ────────────────────────────────────────────

/**
 * Truncate text to a given length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return `${text.slice(0, length)}...`
}

/**
 * Generate a random 6-character squad invite code
 */
export function generateSquadCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

/**
 * Get initials from a name (e.g. "Rahul Sharma" → "RS")
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
