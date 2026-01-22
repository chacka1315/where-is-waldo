import { RequestHandler } from 'express';
import prisma from '../prisma/prisma.js';

const allBoards_get: RequestHandler = async (req, res, next) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        coordinates: {
          select: { character: { select: { name: true, iconUrl: true } } },
        },
      },
    });

    res.json(boards);
  } catch (err) {
    next(err);
  }
};

const board_get: RequestHandler = async (req, res, next) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: req.boardId },
      include: {
        coordinates: {
          select: { character: { select: { name: true, iconUrl: true } } },
        },
      },
    });

    res.json(board);
  } catch (err) {
    next(err);
  }
};
export default { allBoards_get, board_get };
