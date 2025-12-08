import Router from 'express';
import rankingController from '../controllers/rankingController.js';
import validation from '../middlewares/validation.js';

const rankingRouter = Router();

rankingRouter.get('/', rankingController.rankings_get);
rankingRouter.post('/', validation.playerName, rankingController.ranking_post);

export default rankingRouter;
