import prisma from '../prisma/prisma.js';
import { BadRequestError } from '../errors/CustomErrors.js';
import { matchedData, validationResult } from 'express-validator';

const rankings_get = async (req, res, next) => {
  if (isNaN(req.boardId)) {
    const err = new BadRequestError('The board id must be an integer.');
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  try {
    const rankings = await prisma.ranking.findMany({
      where: {
        boardId: req.boardId,
      },
      orderBy: [{ time: 'asc' }, { createdAt: 'desc' }],
    });

    const board = await prisma.board.findUnique({
      where: { id: req.boardId },
    });
    res.json({ board, rankings });
  } catch (err) {
    next(err);
  }
};

const ranking_post = async (req, res, next) => {
  const validationErrs = validationResult(req);

  if (!validationErrs.isEmpty()) {
    const errors = validationErrs.array();
    const err = new BadRequestError("Player's name failed vaildation.");
    return res.status(err.statusCode).json({
      errors,
      msg: err.message,
    });
  }

  if (!req.session.score) {
    const err = new BadRequestError(
      'Player must found all characters before submiting.',
    );
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  try {
    const board = await prisma.board.findUnique({
      where: { id: req.boardId },
    });

    if (!board) {
      const err = new BadRequestError(
        'Cannot add ranking for inexistent board.',
      );
      return res.status(err.statusCode).json({
        msg: err.message,
      });
    }

    const { playerName } = matchedData(req);

    const ranking = await prisma.ranking.create({
      data: {
        boardId: req.boardId,
        playerName,
        time: req.session.score,
      },
    });

    res.status(201).json(ranking);
  } catch (err) {
    next(err);
  }
};

export default { rankings_get, ranking_post };
