import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function resetDB() {
  await prisma.$executeRawUnsafe(`DROP SCHEMA public CASCADE;`);
  await prisma.$executeRawUnsafe(`CREATE SCHEMA public;`);
}

resetDB()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅ Test db reset.');
  })
  .catch(async (err) => {
    console.log('❌Failed reting test db.');
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
