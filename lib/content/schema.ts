import { z } from 'zod'

export const SlideSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
})

export const QuizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
  explanation: z.string().optional(),
})

export const QuizQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(QuizOptionSchema).min(2),
})

export const LessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  xpReward: z.number().positive(),
  slides: z.array(SlideSchema).min(1),
  quiz: z.array(QuizQuestionSchema).optional(),
})

export type LessonSlide = z.infer<typeof SlideSchema>
export type QuizOption = z.infer<typeof QuizOptionSchema>
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>
export type Lesson = z.infer<typeof LessonSchema>
