import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { QuestMap, LevelNode } from '@/components/learning/QuestMap'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { LEVEL_XP_REQUIREMENTS, LEVEL_NAMES } from '@/types'

import fs from 'fs/promises'
import path from 'path'

// Map our static levels (1-7) to a dynamic progress tree
async function fetchQuestMapData(userId: string): Promise<LevelNode[]> {
  const user = await db.user.findUniqueOrThrow({
    where: { id: userId },
    include: {
      progress: {
        where: { completed: true }
      }
    }
  })

  const slugs = ['rookie', 'apprentice', 'analyst', 'strategist', 'trader', 'investor', 'legend']
  
  // Dynamically count the number of JSON lessons in each level directory
  const lessonsPerLevel = await Promise.all(slugs.map(async (slug) => {
    try {
      const dirPath = path.join(process.cwd(), 'content', 'levels', slug)
      const files = await fs.readdir(dirPath)
      return files.filter(f => f.endsWith('.json')).length
    } catch {
      return 0 // Default to 0 if directory doesn't exist
    }
  }))

  const levels: LevelNode[] = LEVEL_NAMES.map((name, index) => {
    const isUnlocked = user.level >= index + 1
    const slug = slugs[index]
    const lessonsTotal = lessonsPerLevel[index]
    
    // Check how many completed progress records the user has for this level
    // In our DB, lessonIds are unique (e.g. rookie-lesson-1, but currently they are just lesson-1).
    // Wait, the progress records only store lessonId (e.g. "lesson-1"). 
    // To be precise across multiple tiers, lesson IDs should include the slug (e.g. "rookie-lesson-1").
    // Let's assume progress records match the generated IDs we will create.
    const lessonsCompleted = user.progress.filter(lp => lp.lessonId.startsWith(`${slug}-`) || (slug === 'rookie' && lp.lessonId.startsWith('lesson-'))).length
      
    const isCompleted = lessonsTotal > 0 && lessonsCompleted >= lessonsTotal
    const progress = lessonsTotal > 0 ? Math.min((lessonsCompleted / lessonsTotal) * 100, 100) : 0

    return {
      id: slug,
      title: name,
      description: `Complete ${lessonsTotal} lessons to master this stage.`,
      isUnlocked,
      isCompleted,
      progress,
      lessonsTotal,
      lessonsCompleted
    }
  })

  return levels
}

export default async function LearnPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const levels = await fetchQuestMapData(session.user.id)

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4">
      <header className="mb-8 text-center pt-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-1">
          Your Journey
        </h1>
        <p className="text-text-3 mt-2">
          Complete lessons to earn XP and unlock the next tier.
        </p>
      </header>

      <Suspense fallback={
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      }>
        <QuestMap levels={levels} />
      </Suspense>
    </div>
  )
}
