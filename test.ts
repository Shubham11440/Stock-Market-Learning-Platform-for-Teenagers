import { db } from './lib/db';

async function main() {
  try {
    const user = await db.user.findFirst();
    console.log("DB connection successful. User:", user);
  } catch (e) {
    console.error("DB connection error:", e);
  } finally {
    await db.$disconnect();
  }
}
main();
