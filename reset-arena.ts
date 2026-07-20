import { db } from './lib/db'

async function deleteArena() {
  const result = await db.dailyQuizSubmission.deleteMany({
    where: {
      date: new Date('2026-07-20T00:00:00.000Z')
    }
  })
  console.log(`Deleted ${result.count} stuck Arena submissions.`)
}

deleteArena().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); })
