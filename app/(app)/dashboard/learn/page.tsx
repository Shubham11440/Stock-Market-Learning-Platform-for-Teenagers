import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { QuestMap, LevelNode } from '@/components/learning/QuestMap'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { LEVEL_XP_REQUIREMENTS, LEVEL_NAMES } from '@/types'

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

  // We are mocking the "total lessons per level" for Phase 4 since they aren't all built.
  // In a real app, this would scan the file system or DB.
  const lessonsPerLevel = [3, 4, 5, 5, 6, 6, 8] // Just mock numbers

  const levels: LevelNode[] = LEVEL_NAMES.map((name, index) => {
    const isUnlocked = user.level >= index + 1
    
    // Simplistic progress mock: if unlocked, maybe they have completed some
    const lessonsTotal = lessonsPerLevel[index]
    // For level 1, we actually have 'lesson-1' built. Let's count DB progress for Rookie.
    const lessonsCompleted = index === 0 
      ? user.progress.filter(lp => lp.lessonId.startsWith('lesson-')).length 
      : (user.level > index + 1 ? lessonsTotal : 0) // if past it, assume 100%
      
    const isCompleted = lessonsCompleted >= lessonsTotal
    const progress = Math.min((lessonsCompleted / lessonsTotal) * 100, 100)

    // For level 1, we specifically map it to the slug 'rookie' which we created in the file system
    const slugs = ['rookie', 'apprentice', 'analyst', 'strategist', 'trader', 'investor', 'legend']

    return {
      id: slugs[index],
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
