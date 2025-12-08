import { execSync } from 'node:child_process';
import prisma from '../prisma/prisma';
import { pool } from '../prisma/prisma';

beforeEach(async () => {
  await prisma.$executeRaw`BEGIN`;
});

afterEach(async () => {
  await prisma.$executeRaw`ROLLBACK`;
});

// beforeAll((done) => {
//   // execSync('pnpm -F api db:migrate:test');
//   // execSync('pnpm -F api db:seed:test');
//   done();
// });

afterAll(async () => {
  try {
    // execSync('pnpm -F api db:reset:test');
    await prisma.$disconnect();
    await pool.end();
  } catch (err) {
    console.log(err);
  }
});
