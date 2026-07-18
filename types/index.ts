// ─────────────────────────────────────────────────────────────
// StockUp — Global TypeScript Types
// ─────────────────────────────────────────────────────────────

// ── User & Auth ──────────────────────────────────────────────

export type GoalType = 'SAVE' | 'INVEST' | 'TRADE' | 'LEARN'

export type Theme = 'dark' | 'light'

export interface User {
  id: string
  email: string
  name: string
  image?: string | null
  age?: number | null
  xp: number
  level: number
  streak: number
  lastLoginDate?: Date | null
  virtualBalance: number
  isRealUnlocked: boolean
  theme: Theme
  goalType?: GoalType | null
  createdAt: Date
  updatedAt: Date
}

// ── Learning & Progress ───────────────────────────────────────

export type BadgeRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'

export interface Level {
  id: string
  number: number
  name: string
  description: string
  xpRequired: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  levelId: string
  title: string
  slug: string
  content: LessonContent
  xpReward: number
  order: number
}

export interface LessonSlide {
  type: 'text' | 'image' | 'stat' | 'tip' | 'example'
  heading?: string
  body: string
  image?: string
  stat?: string
  statLabel?: string
  tip?: string
}

export interface LessonContent {
  slides: LessonSlide[]
  quiz: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface LessonProgress {
  id: string
  userId: string
  lessonId: string
  completed: boolean
  score?: number | null
  xpEarned: number
  completedAt?: Date | null
}

// ── Trading ───────────────────────────────────────────────────

export type OrderType = 'BUY' | 'SELL'

export interface Position {
  id: string
  userId: string
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  isVirtual: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  userId: string
  symbol: string
  name: string
  type: OrderType
  quantity: number
  price: number
  total: number
  isVirtual: boolean
  xpEarned: number
  createdAt: Date
}

export interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  open: number
  volume: number
  marketCap?: number
  pe?: number
  exchange: 'NSE' | 'BSE'
}

export interface ChartDataPoint {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// ── Gamification ──────────────────────────────────────────────

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: BadgeRarity
}

export interface UserBadge {
  id: string
  userId: string
  badgeId: string
  earnedAt: Date
  badge: Badge
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  image?: string | null
  xp: number
  level: number
  streak: number
}

// ── Social ────────────────────────────────────────────────────

export type DuelStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED'

export interface Squad {
  id: string
  name: string
  code: string
  createdAt: Date
  members: SquadMember[]
}

export interface SquadMember {
  id: string
  userId: string
  squadId: string
  role: 'LEADER' | 'MEMBER'
  user: Pick<User, 'id' | 'name' | 'image' | 'xp' | 'level'>
}

export interface Duel {
  id: string
  challengerId: string
  challengedId: string
  status: DuelStatus
  stocks: string[]
  startDate: Date
  endDate: Date
  winnerId?: string | null
  xpReward: number
}

// ── News ──────────────────────────────────────────────────────

export interface NewsArticle {
  id: string
  title: string
  summary: string
  teenSummary?: string // AI-simplified version
  source: string
  url: string
  publishedAt: Date
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
  relatedSymbols: string[]
}

// ── API Responses ─────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  status: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// ── XP System ─────────────────────────────────────────────────

export type XPEventType =
  | 'LESSON_COMPLETE'
  | 'QUIZ_PERFECT'
  | 'DAILY_LOGIN'
  | 'FIRST_TRADE'
  | 'SHARE_ACHIEVEMENT'
  | 'DAILY_CHALLENGE'
  | 'REFER_FRIEND'
  | 'DUEL_WIN'

export interface XPEvent {
  type: XPEventType
  amount: number
  description: string
}

export const XP_REWARDS: Record<XPEventType, number> = {
  LESSON_COMPLETE: 100,
  QUIZ_PERFECT: 150,
  DAILY_LOGIN: 25,
  FIRST_TRADE: 200,
  SHARE_ACHIEVEMENT: 50,
  DAILY_CHALLENGE: 75,
  REFER_FRIEND: 300,
  DUEL_WIN: 250,
}

export const LEVEL_XP_REQUIREMENTS = [0, 500, 1500, 3500, 7000, 12000, 20000]

export const LEVEL_NAMES = [
  'The Rookie',
  'The Apprentice',
  'The Analyst',
  'The Strategist',
  'The Trader',
  'The Investor',
  'The Legend',
]
