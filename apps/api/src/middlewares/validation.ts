import { body } from 'express-validator';

const playerName = body('playerName')
  .trim()
  .isAlphanumeric('fr-FR', { ignore: " ._-'" })
  .withMessage('Your name should only contain letters and numbers.')
  .isLength({ min: 2, max: 20 })
  .withMessage('Your name must be between 2 and 20 chracters.');

export default { playerName };
