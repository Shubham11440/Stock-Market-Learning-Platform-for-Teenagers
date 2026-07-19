const { db } = require('./lib/db');

async function run() {
  try {
    const lessons = await db.lesson.findMany();
    console.log('Lessons in DB:', lessons);
    const levels = await db.level.findMany();
    console.log('Levels in DB:', levels);
  } catch(e) {
    console.error(e);
  } finally {
    //
  }
}
run();
