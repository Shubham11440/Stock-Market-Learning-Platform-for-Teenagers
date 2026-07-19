import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Lock, CheckCircle } from 'lucide-react'

import fs from 'fs/promises'
import path from 'path'

// Next.js 15+ requires params to be awaited
export default async function LevelPage({ params }: { params: Promise<{ levelId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { levelId } = await params

  // Fetch user's completed lessons
  const progress = await db.lessonProgress.findMany({
    where: { userId: session.user.id, completed: true },
    select: { lessonId: true }
  })
  const completedLessonIds = new Set(progress.map(p => p.lessonId))

  // Dynamically load lessons from filesystem
  const dirPath = path.join(process.cwd(), 'content', 'levels', levelId)
  let files: string[] = []
  try {
    files = await fs.readdir(dirPath)
  } catch {
    files = []
  }

  const jsonFiles = files.filter(f => f.endsWith('.json'))

  if (jsonFiles.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/dashboard/learn" className="inline-flex items-center gap-2 text-text-3 hover:text-text-1 mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Map
        </Link>
        <h1 className="font-display font-bold text-3xl text-text-1 mb-2 capitalize">{levelId}</h1>
        <p className="text-text-2 mb-10">Lessons for this tier are coming soon!</p>
      </div>
    )
  }

  // Parse each file to get title and order
  const rawLessons = await Promise.all(jsonFiles.map(async (file) => {
    const fileContents = await fs.readFile(path.join(dirPath, file), 'utf8')
    const data = JSON.parse(fileContents)
    return {
      id: data.id,
      title: data.title,
    }
  }))

  // Sort them naturally (lesson-1, lesson-2, etc)
  rawLessons.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }))

  // Calculate unlocked status sequentially
  const lessons = rawLessons.map((lesson, idx) => {
    const isCompleted = completedLessonIds.has(lesson.id)
    // First lesson is always unlocked. Others unlock if the previous is completed.
    const isUnlocked = idx === 0 ? true : completedLessonIds.has(rawLessons[idx - 1].id)
    return { ...lesson, isCompleted, isUnlocked }
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/dashboard/learn" className="inline-flex items-center gap-2 text-text-3 hover:text-text-1 mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Map
      </Link>

      <h1 className="font-display font-bold text-3xl text-text-1 mb-2 capitalize">{levelId}</h1>
      <p className="text-text-2 mb-10">Complete these lessons to master this level.</p>

      <div className="flex flex-col gap-4">
        {lessons.map((lesson, idx) => (
          <Link
            key={lesson.id}
            href={lesson.isUnlocked ? `/dashboard/learn/${levelId}/lesson/${lesson.id}` : '#'}
            className={`flex items-center justify-between p-6 rounded-2xl border ${
              lesson.isUnlocked 
                ? 'bg-surface hover:bg-surface-2 border-border cursor-pointer group transition-colors'
                : 'bg-surface/50 border-border/30 opacity-70 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                lesson.isCompleted ? 'bg-green-500/10 text-green-500' :
                lesson.isUnlocked ? 'bg-primary/10 text-primary' : 'bg-surface-2 text-text-3'
              }`}>
                {lesson.isCompleted ? <CheckCircle size={20} /> : lesson.isUnlocked ? <BookOpen size={20} /> : <Lock size={20} />}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-3 mb-1 block">
                  Lesson {idx + 1}
                </span>
                <h3 className="font-medium text-lg text-text-1 group-hover:text-primary-light transition-colors">
                  {lesson.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
