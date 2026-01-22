import {
  getAboard,
  getAllBoards,
  getLeaderboard,
  Board,
  RoundCharacter,
} from './boards.js';
import { getACharacter, getAllCharacters, Character } from './characters.js';
import {
  submitScore,
  startRound,
  validateXY,
  ValidationResponse,
  ClickData,
} from './rounds.js';

export default {
  getAboard,
  getAllBoards,
  getACharacter,
  getAllCharacters,
  submitScore,
  startRound,
  validateXY,
  getLeaderboard,
};

export { Board, Character, ValidationResponse, ClickData, RoundCharacter };
