import { db } from './lib/db';

async function migrateDB() {
  const progressToUpdate = await db.lessonProgress.findMany({
    where: {
      lessonId: { startsWith: 'lesson-' }
    }
  });

  for (const p of progressToUpdate) {
    const newLessonId = `rookie-${p.lessonId}`;
    
    // Create new Lesson if it doesn't exist to satisfy foreign key
    await db.lesson.upsert({
      where: { id: newLessonId },
      update: {},
      create: {
        id: newLessonId,
        levelId: 'rookie',
        title: newLessonId,
        slug: newLessonId,
        content: {},
        xpReward: 100,
        order: 1
      }
    });

    // Update progress
    await db.lessonProgress.update({
      where: { id: p.id },
      data: { lessonId: newLessonId }
    });
    console.log(`Updated progress ID ${p.id} to ${newLessonId}`);
  }

  console.log('Database migration complete.');
}

migrateDB()
  .then(() => process.exit(0))
  .catch(e => { console.error(e); process.exit(1); });
