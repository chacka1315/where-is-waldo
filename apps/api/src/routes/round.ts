import Router from 'express';
import roundController from '../controllers/roundController.js';

const roundRouter = Router();

roundRouter.get('/', roundController.round_get);
roundRouter.get('/validatexy', roundController.validateXY_get);
export default roundRouter;
