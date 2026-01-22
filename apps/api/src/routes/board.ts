import Router, { NextFunction } from 'express';
import rankingRouter from './ranking.js';
import boardController from '../controllers/boardController.js';

const boardRouter = Router();

boardRouter.param('boardId', (req, res, next, boardId) => {
  req.boardId = Number(boardId);
  next();
});

boardRouter.use('/:boardId/ranking', rankingRouter);
boardRouter.get('/', boardController.allBoards_get);
boardRouter.get('/:boardId', boardController.board_get);

export default boardRouter;
