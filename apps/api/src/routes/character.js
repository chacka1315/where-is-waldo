import Router from 'express';
import characterController from '../controllers/characterController.js';

const characterRouter = Router();
characterRouter.get('/', characterController.allCharacters_get);

export default characterRouter;
