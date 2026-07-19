import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { getLessonContent } from '@/lib/content/parser'
import { LessonViewer } from '@/components/learning/LessonViewer'
import Link from 'next/link'
import { X } from 'lucide-react'

export default async function LessonPage({ 
  params 
}: { 
  params: Promise<{ levelId: string, lessonId: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { levelId, lessonId } = await params

  // 1. Fetch and validate JSON content
  const lesson = await getLessonContent(levelId, lessonId)
  
  if (!lesson) {
    notFound() // Triggers the nearest error.tsx / not-found.tsx
  }

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col py-4 px-4 sm:px-8">
      {/* Top Bar for Lesson */}
      <header className="flex items-center justify-between mb-8">
        <Link 
          href={`/dashboard/learn/${levelId}`}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-2 text-text-3 hover:text-text-1 transition-colors"
          aria-label="Exit lesson"
        >
          <X size={24} />
        </Link>
        <div className="flex-1 text-center font-display font-bold text-text-2 tracking-widest uppercase text-sm">
          {lesson.title}
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* The interactive client component */}
      <div className="flex-1 overflow-y-auto">
        <LessonViewer lesson={lesson} levelId={levelId} />
      </div>
    </div>
  )
}
