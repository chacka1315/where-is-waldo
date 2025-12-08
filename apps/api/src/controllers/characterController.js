import prisma from '../prisma/prisma.js';

const allCharacters_get = async (req, res, next) => {
  try {
    const characters = await prisma.character.findMany();
    res.json(characters);
  } catch (err) {
    next(err);
  }
};

export default { allCharacters_get };
