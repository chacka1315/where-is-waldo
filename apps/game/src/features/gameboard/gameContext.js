import { createContext, useContext } from 'react';

export const GameContext = createContext({
  board: null,
  characters: null,
  loadError: null,
  isLoading: false,
  boxPosition: null,
  characterPosition: null,
  boxIsOpen: false,
  validationRes: null,
  validationErr: null,
  isShowingRes: false,
  markers: [],
  submitIsOpen: false,
});

export const GameDispatchContext = createContext(() => {
  console.warn(
    'Fake dispatch called: component is not wrapped in GameProvider',
  );
});

export const useGame = () => {
  return useContext(GameContext);
};

export const useGameDispatch = () => {
  return useContext(GameDispatchContext);
};
