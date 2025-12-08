import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

let boardIds = {};
let charIds = {};

async function createCharacters() {
  const characters = await prisma.character.createManyAndReturn({
    data: [
      {
        name: 'Waldo',
        imageUrl: 'waldo img',
        iconUrl: 'waldo icon',
        description: 'waldo here',
      },
      {
        name: 'Wenda',
        imageUrl: 'wenda img',
        iconUrl: 'wenda icon',
        description: 'Wenda here',
      },
    ],
  });

  characters.forEach((char) => (charIds[char.name] = char.id));
}

async function createBoards() {
  const boards = await prisma.board.createManyAndReturn({
    data: [
      {
        name: 'Board_1',
        level: 1,
        complexity: 'Easy',
        imageUrl: 'bar',
      },
      {
        name: 'Board_2',
        level: 2,
        complexity: 'Easy',
        imageUrl: 'bar',
      },
    ],
  });

  boards.forEach((board) => (boardIds[board.name] = board.id));
}

async function createCoordinates() {
  await prisma.coordinate.createMany({
    data: [
      {
        boardId: boardIds.Board_1,
        characterId: charIds.Waldo,
        charXmin: 1,
        charXmax: 2,
        charYmin: 1,
        charYmax: 2,
      },
      {
        boardId: boardIds.Board_2,
        characterId: charIds.Waldo,
        charXmin: 1,
        charXmax: 2,
        charYmin: 1,
        charYmax: 2,
      },

      {
        boardId: boardIds.Board_1,
        characterId: charIds.Wenda,
        charXmin: 1,
        charXmax: 2,
        charYmin: 1,
        charYmax: 2,
      },
      {
        boardId: boardIds.Board_2,
        characterId: charIds.Wenda,
        charXmin: 1,
        charXmax: 2,
        charYmin: 1,
        charYmax: 2,
      },
    ],
  });
}

async function main() {
  await createCharacters();
  await createBoards();
  await createCoordinates();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('✅ Test db Seed');
  })
  .catch(async (err) => {
    console.log('❌Failed seeding test db.');
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
