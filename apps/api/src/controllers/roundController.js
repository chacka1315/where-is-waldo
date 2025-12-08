import prisma from '../prisma/prisma.js';
import { BadRequestError } from '../errors/CustomErrors.js';

const round_get = async (req, res, next) => {
  const { boardid } = req.query;

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

const validateXY_get = async (req, res, next) => {
  let { x, y, charId, boardid } = req.query;

  const playerX = Number(x);
  const playerY = Number(y);
  charId = Number(charId);

  if (isNaN(boardid) || isNaN(charId)) {
    const err = new BadRequestError('Incorrect character or board id');
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  try {
    const coordinates = await prisma.coordinate.findUnique({
      where: {
        boardId_characterId: {
          boardId: Number(boardid),
          characterId: charId,
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
      where: { id: charId },
      select: { name: true },
    });

    const match =
      playerX >= coordinates.charXmin &&
      playerX <= coordinates.charXmax &&
      playerY >= coordinates.charYmin &&
      playerY <= coordinates.charYmax;

    let remainedIds = req.session.charsRemainedIds;
    if (match) {
      req.session.charsFoundIds.push(charId);

      remainedIds = req.session.charsRemainedIds.filter((id) => {
        return id !== charId;
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
        msg: `✅You are right, ${character.name} was there.`,
      });
    } else {
      return res.json({
        match,
        remainedIds,
        finished: false,
        msg: `❌You are wrong, ${character.name} is not there.`,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default { round_get, validateXY_get };
