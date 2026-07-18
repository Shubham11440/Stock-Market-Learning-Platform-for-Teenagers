'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { LessonSlide as SlideType } from '@/lib/content/schema'
import Image from 'next/image'

export interface LessonSlideProps {
  slide: SlideType
  isFirst: boolean
  isLast: boolean
  onNext: () => void
  onPrev: () => void
  direction: number // 1 for next, -1 for prev
}

export function LessonSlide({ slide, isFirst, isLast, onNext, onPrev, direction }: LessonSlideProps) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isLast) onNext()
      if (e.key === 'ArrowLeft' && !isFirst) onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFirst, isLast, onNext, onPrev])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[70vh] min-h-[400px]">
      
      {/* The Slide Content */}
      <div className="flex-1 relative overflow-hidden bg-surface-2 border border-border/50 rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col justify-center">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex flex-col gap-6 w-full h-full justify-center"
            // Swipe gestures for mobile
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                if (!isLast) onNext()
              } else if (swipe > swipeConfidenceThreshold) {
                if (!isFirst) onPrev()
              }
            }}
          >
            {slide.image && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-surface">
                {/* Fallback for external URLs or mock images */}
                <Image src={slide.image} alt={slide.title} fill className="object-cover" />
              </div>
            )}
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-1 text-center">
              {slide.title}
            </h2>
            
            <p className="text-lg sm:text-xl text-text-2 text-center leading-relaxed max-w-lg mx-auto">
              {slide.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8 px-4">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all disabled:opacity-0 focus-visible:ring-2 ring-primary text-text-2 hover:text-text-1 hover:bg-surface-2"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all bg-primary text-white hover:bg-primary-light focus-visible:ring-2 ring-offset-2 ring-offset-bg ring-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
          aria-label={isLast ? "Take Quiz" : "Next slide"}
        >
          {isLast ? 'Take Quiz' : 'Continue'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}
