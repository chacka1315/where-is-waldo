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
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584411/Waldo_n4wodu.webp`,
        iconUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584445/waldo_jaoylo.png`,
        description: `Waldo is the main character and star of the Where's Waldo? series. The character is known for his distinct wardrobe of a red and white striped shirt, blue pants, brown shoes, red and white striped socks, round glasses, and a red and white bobble hat. He has traveled all over the world, through time, and to distant magical lands.`,
      },
      {
        name: 'Wenda',
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584411/Wenda_ob7q1b.webp`,
        iconUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584443/wenda_wunoim.png`,
        description: `Wenda is Waldo's friend. The character is the "one who takes the pictures" according to the intro of The Wonder Book, but she always loses her camera. She first appeared in 1991 in The Magnificent Poster Book along with her twin sister, Wilma, who had previously appeared in 1990's The Ultimate Fun Book!. Wilma has not been seen since. Wenda's wardrobes include a red and white striped shirt, blue skirt, red and white striped stockings, glasses, and red and white bobbled hat.`,
      },
      {
        name: 'Odlaw',
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584410/Odlaw_f8nu7f.webp`,
        iconUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584444/odlaw_mai7kg.png`,
        description: `Odlaw is "Waldo's awful opposite" and the main villain of the Where's Waldo? series. He is described as "mean, nasty, loathsome, and disgusting." His number of good deeds are few and all he cares about is getting his hands on Waldo's magic walking stick. Odlaw's name comes from "Waldo" spelled backwards.`,
      },
      {
        name: 'Wizard Whitebeard',
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584410/Wizard_jvxa8d.webp`,
        iconUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584443/wizard_bydxev.png`,
        description: `Wizard Whitebeard is a character in the Where's Waldo? series. He is a wizard who often visits Waldo with one of his many magical scrolls (something he always ends up losing). The Wizard is recognizable by his red robe, his bare feet, blue hat, long white beard, and his striped staff. Whitebeard is the one with the magic that allows Waldo and his friends to travel to all the magical and far-off lands.Wizard Whitebeard first appeared in 1989 in the book The Great Waldo Search. Whitebeard is a recurring character in the 1991 television series.`,
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
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584122/board_1_eqyfua.jpg`,
      },
      {
        name: 'Board_2',
        level: 2,
        complexity: 'Easy',
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584123/board_2_os0qef.jpg`,
      },
      {
        name: 'Board_3',
        level: 3,
        complexity: 'Normal',
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584124/board_3_bsb916.jpg`,
      },
      {
        name: 'Board_4',
        level: 4,
        complexity: 'Normal',
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584122/board_4_n4bu0s.jpg`,
      },
      {
        name: 'Board_5',
        level: 5,
        complexity: 'Normal',
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584125/board_5_xg3m4u.jpg`,
      },
      {
        name: 'Board_6',
        level: 6,
        complexity: 'Hard',
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584124/board_6_wdbvx0.jpg`,
      },
      {
        name: 'Board_7',
        level: 7,
        complexity: 'Hard',
        imageUrl: `https://res.cloudinary.com/deeklaav9/image/upload/v1764584127/board_7_neju9v.jpg`,
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
        charXmin: 0.424,
        charXmax: 0.437,
        charYmin: 0.736,
        charYmax: 0.783,
      },
      {
        boardId: boardIds.Board_2,
        characterId: charIds.Waldo,
        charXmin: 0.934,
        charXmax: 0.944,
        charYmin: 0.043,
        charYmax: 0.077,
      },
      {
        boardId: boardIds.Board_3,
        characterId: charIds.Waldo,
        charXmin: 0.554,
        charXmax: 0.561,
        charYmin: 0.429,
        charYmax: 0.448,
      },
      {
        boardId: boardIds.Board_4,
        characterId: charIds.Waldo,
        charXmin: 0.413,
        charXmax: 0.427,
        charYmin: 0.168,
        charYmax: 0.208,
      },
      {
        boardId: boardIds.Board_5,
        characterId: charIds.Waldo,
        charXmin: 0.471,
        charXmax: 0.481,
        charYmin: 0.203,
        charYmax: 0.26,
      },
      {
        boardId: boardIds.Board_6,
        characterId: charIds.Waldo,
        charXmin: 0.564,
        charXmax: 0.574,
        charYmin: 0.344,
        charYmax: 0.376,
      },
      {
        boardId: boardIds.Board_7,
        characterId: charIds.Waldo,
        charXmin: 0.164,
        charXmax: 0.169,
        charYmin: 0.839,
        charYmax: 0.854,
      },
      {
        boardId: boardIds.Board_1,
        characterId: charIds.Wenda,
        charXmin: 0.429,
        charXmax: 0.442,
        charYmin: 0.592,
        charYmax: 0.619,
      },
      {
        boardId: boardIds.Board_2,
        characterId: charIds.Wenda,
        charXmin: 0.268,
        charXmax: 0.643,
        charYmin: 0.633,
        charYmax: 0.656,
      },
      {
        boardId: boardIds.Board_3,
        characterId: charIds.Wenda,
        charXmin: 0.747,
        charXmax: 0.752,
        charYmin: 0.528,
        charYmax: 0.54,
      },
      {
        boardId: boardIds.Board_4,
        characterId: charIds.Wenda,
        charXmin: 0.292,
        charXmax: 0.3,
        charYmin: 0.722,
        charYmax: 0.755,
      },
      {
        boardId: boardIds.Board_5,
        characterId: charIds.Wenda,
        charXmin: 0.216,
        charXmax: 0.23,
        charYmin: 0.314,
        charYmax: 0.353,
      },
      {
        boardId: boardIds.Board_6,
        characterId: charIds.Wenda,
        charXmin: 0.386,
        charXmax: 0.392,
        charYmin: 0.317,
        charYmax: 0.342,
      },
      {
        boardId: boardIds.Board_7,
        characterId: charIds.Wenda,
        charXmin: 0.753,
        charXmax: 0.759,
        charYmin: 0.752,
        charYmax: 0.766,
      },
      {
        boardId: boardIds.Board_1,
        characterId: charIds['Wizard Whitebeard'],
        charXmin: 0.651,
        charXmax: 0.662,
        charYmin: 0.765,
        charYmax: 0.787,
      },
      {
        boardId: boardIds.Board_2,
        characterId: charIds['Wizard Whitebeard'],
        charXmin: 0.277,
        charXmax: 0.297,
        charYmin: 0.372,
        charYmax: 0.44,
      },
      {
        boardId: boardIds.Board_3,
        characterId: charIds['Wizard Whitebeard'],
        charXmin: 0.661,
        charXmax: 0.67,
        charYmin: 0.306,
        charYmax: 0.322,
      },
      {
        boardId: boardIds.Board_4,
        characterId: charIds['Wizard Whitebeard'],
        charXmin: 0.683,
        charXmax: 0.692,
        charYmin: 0.032,
        charYmax: 0.057,
      },
      {
        boardId: boardIds.Board_5,
        characterId: charIds['Wizard Whitebeard'],
        charXmin: 0.687,
        charXmax: 0.699,
        charYmin: 0.158,
        charYmax: 0.206,
      },
      {
        boardId: boardIds.Board_6,
        characterId: charIds['Wizard Whitebeard'],
        charXmin: 0.843,
        charXmax: 0.856,
        charYmin: 0.832,
        charYmax: 0.888,
      },
      {
        boardId: boardIds.Board_7,
        characterId: charIds['Wizard Whitebeard'],
        charXmin: 0.285,
        charXmax: 0.291,
        charYmin: 0.124,
        charYmax: 0.136,
      },
      {
        boardId: boardIds.Board_1,
        characterId: charIds.Odlaw,
        charXmin: 0.581,
        charXmax: 0.597,
        charYmin: 0.942,
        charYmax: 0.967,
      },
      {
        boardId: boardIds.Board_2,
        characterId: charIds.Odlaw,
        charXmin: 0.893,
        charXmax: 0.904,
        charYmin: 0.543,
        charYmax: 0.583,
      },
      {
        boardId: boardIds.Board_3,
        characterId: charIds.Odlaw,
        charXmin: 0.432,
        charXmax: 0.439,
        charYmin: 0.32,
        charYmax: 0.335,
      },
      {
        boardId: boardIds.Board_4,
        characterId: charIds.Odlaw,
        charXmin: 0.192,
        charXmax: 0.202,
        charYmin: 0.714,
        charYmax: 0.747,
      },
      {
        boardId: boardIds.Board_6,
        characterId: charIds.Odlaw,
        charXmin: 0.399,
        charXmax: 0.406,
        charYmin: 0.588,
        charYmax: 0.618,
      },
      {
        boardId: boardIds.Board_7,
        characterId: charIds.Odlaw,
        charXmin: 0.861,
        charXmax: 0.866,
        charYmin: 0.813,
        charYmax: 0.827,
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
    console.log('✅Seed successfuly.');
  })
  .catch(async (err) => {
    console.log('❌Failed seeding.');
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
