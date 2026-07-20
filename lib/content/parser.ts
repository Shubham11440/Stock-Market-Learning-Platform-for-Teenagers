import { promises as fs } from 'fs'
import path from 'path'
import { Lesson, LessonSchema } from './schema'

/**
 * Parses and validates a lesson JSON file from the filesystem.
 * @param levelId e.g. "rookie"
 * @param lessonId e.g. "lesson-1"
 * @returns The strongly typed Lesson object or null if not found
 * @throws Error if the JSON is malformed or validation fails
 */
export async function getLessonContent(levelId: string, lessonId: string): Promise<Lesson | null> {
  // The DB lessonId is globally unique (e.g. "rookie-lesson-1") but the physical file is "lesson-1.json"
  const fileName = lessonId.startsWith(`${levelId}-`) 
    ? lessonId.replace(`${levelId}-`, '') 
    : lessonId;
    
  const filePath = path.join(process.cwd(), 'content', 'levels', levelId, `${fileName}.json`)
  
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const rawJson = JSON.parse(fileContents)
    
    // Zod validation throws if invalid
    return LessonSchema.parse(rawJson)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null // File not found
    }
    console.error(`[Content Parser] Failed to parse lesson ${levelId}/${lessonId}:`, error)
    throw error // Propagate validation/parsing errors to Error Boundary
  }
}
