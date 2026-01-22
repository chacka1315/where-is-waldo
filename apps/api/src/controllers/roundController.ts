import prisma from '../prisma/prisma.js';
import { BadRequestError } from '../errors/CustomErrors.js';
import { RequestHandler } from 'express';

const round_get: RequestHandler = async (req, res, next) => {
  const id = req.query.boardid;
  const boardid = Number(id);
  if (isNaN(boardid)) {
    const err = new BadRequestError('The board id must be an integer.');
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  try {
    const board = await prisma.board.findUnique({
      where: { id: Number(boardid) },
      include: {
        coordinates: {
          select: {
            character: { omit: { description: true, imageUrl: true } },
          },
        },
      },
    });

    if (!board) {
      const err = new BadRequestError('You requested for an inexistent board.');
      return res.status(err.statusCode).json({
        msg: err.message,
      });
    }

    req.session.roundStartedAt = Date.now();
    req.session.charsFoundIds = [];
    req.session.finished = false;
    req.session.charsRemainedIds = board.coordinates.map((c) => c.character.id);

    res.json(board);
  } catch (err) {
    next(err);
  }
};

const validateXY_get: RequestHandler = async (req, res, next) => {
  let { x, y, charId, boardid } = req.query;

  const playerX = Number(x);
  const playerY = Number(y);
  const characterId = Number(charId);
  const currBoardId = Number(boardid);

  if (isNaN(currBoardId) || isNaN(characterId)) {
    const err = new BadRequestError('Incorrect character or board id');
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  try {
    const coordinates = await prisma.coordinate.findUnique({
      where: {
        boardId_characterId: {
          boardId: currBoardId,
          characterId: characterId,
        },
      },
    });

    if (!coordinates) {
      const err = new BadRequestError('Bad validation request');
      return res.status(err.statusCode).json({
        msg: err.message,
      });
    }

    const character = await prisma.character.findUnique({
      where: { id: characterId },
      select: { name: true },
    });

    const match =
      playerX >= Number(coordinates.charXmin) &&
      playerX <= Number(coordinates.charXmax) &&
      playerY >= Number(coordinates.charYmin) &&
      playerY <= Number(coordinates.charYmax);

    let remainedIds = req.session.charsRemainedIds;
    if (match && req.session.charsFoundIds && req.session.charsRemainedIds) {
      req.session.charsFoundIds.push(characterId);

      remainedIds = req.session.charsRemainedIds.filter((id) => {
        return id !== characterId;
      });

      req.session.charsRemainedIds = remainedIds;
      req.session.finished = remainedIds.length === 0;

      if (remainedIds.length === 0) {
        req.session.score = Date.now() - req.session.roundStartedAt;
      }
      return res.json({
        match,
        remainedIds,
        finished: remainedIds.length === 0,
        msg: `✅🌈You are right, ${character?.name} was there.`,
      });
    } else {
      return res.json({
        match,
        remainedIds,
        finished: false,
        msg: `❌😂You are wrong, ${character?.name} is not there.`,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default { round_get, validateXY_get };
