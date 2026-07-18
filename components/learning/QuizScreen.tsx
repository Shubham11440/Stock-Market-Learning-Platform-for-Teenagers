'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { QuizQuestion as QuizQuestionType } from '@/lib/content/schema'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface QuizScreenProps {
  questions: QuizQuestionType[]
  onComplete: (score: number) => void
}

export function QuizScreen({ questions, onComplete }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const currentQ = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1

  const handleSubmit = () => {
    if (!selectedId) return

    const isCorrect = currentQ.options.find(o => o.id === selectedId)?.isCorrect
    if (isCorrect) setScore(s => s + 1)
    
    setHasSubmitted(true)
  }

  const handleNext = () => {
    if (isLast) {
      onComplete(score + (currentQ.options.find(o => o.id === selectedId)?.isCorrect ? 1 : 0))
    } else {
      setCurrentIndex(i => i + 1)
      setSelectedId(null)
      setHasSubmitted(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[75vh] min-h-[500px]">
      
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-medium text-text-3 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
        </div>
        <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 relative bg-surface border border-border/50 rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col">
        
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-1 mb-8">
          {currentQ.question}
        </h2>

        <div className="flex flex-col gap-4 flex-1">
          {currentQ.options.map((option) => {
            const isSelected = selectedId === option.id
            const showCorrect = hasSubmitted && option.isCorrect
            const showWrong = hasSubmitted && isSelected && !option.isCorrect

            return (
              <button
                key={option.id}
                onClick={() => !hasSubmitted && setSelectedId(option.id)}
                disabled={hasSubmitted}
                aria-pressed={isSelected}
                className={cn(
                  "relative w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 group flex items-center justify-between",
                  !hasSubmitted && !isSelected && "border-border bg-surface hover:border-primary/50 hover:bg-surface-2",
                  !hasSubmitted && isSelected && "border-primary bg-primary/5 ring-4 ring-primary/10",
                  showCorrect && "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300",
                  showWrong && "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300",
                  hasSubmitted && !isSelected && !showCorrect && "border-border/50 opacity-50 bg-surface"
                )}
              >
                <span className="font-medium text-lg pr-8">{option.text}</span>
                
                {showCorrect && <CheckCircle2 className="text-green-500 flex-shrink-0" />}
                {showWrong && <XCircle className="text-red-500 flex-shrink-0" />}
                
                {/* Custom radio indicator for unsubmitted state */}
                {!hasSubmitted && (
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                    isSelected ? "border-primary" : "border-text-3 group-hover:border-primary/50"
                  )}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback Area */}
        {hasSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-surface-2 border border-border"
            aria-live="polite"
          >
            <p className="font-medium text-text-1">
              {currentQ.options.find(o => o.id === selectedId)?.isCorrect 
                ? "🎉 Correct!" 
                : "Not quite."}
            </p>
            {currentQ.options.find(o => o.id === selectedId)?.explanation && (
              <p className="text-text-2 text-sm mt-1">
                {currentQ.options.find(o => o.id === selectedId)?.explanation}
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-8 flex justify-end">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedId}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-all bg-primary text-white hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25 active:scale-95"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-all bg-text-1 text-bg hover:bg-text-2 shadow-lg active:scale-95"
          >
            {isLast ? 'Complete Lesson' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  )
}
