import { GameContext, GameDispatchContext } from './gameContext';
import { useReducer } from 'react';
import { gameReducer, initialState } from './reducer';

export const GameProvider = function ({ children }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};
