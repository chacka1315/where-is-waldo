import type { RoundCharacter } from '@waldogame/apiclient';
import type { ClickData, ValidationResponse } from '@waldogame/apiclient';
import type { MouseEvent } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type GameState = {
  characters: { character: RoundCharacter }[];
  boxPosition: { x: number; y: number };
  characterPosition: { x: number; y: number };
  boxIsOpen: boolean;
  validationRes: ValidationResponse | null;
  validationErr: string | null;
  isShowingRes: boolean;
  markers: ClickData[];
  submitIsOpen: boolean;
  rankingMenuIsOpen: boolean;
};

type GameAction = {
  updateAfterValidation: (
    validationRes: ValidationResponse,
    clickData: ClickData,
  ) => void;
  openBox: (e: MouseEvent<HTMLImageElement>) => void;
  setBoxIsOpen: (value: boolean) => void;
  setIsShowingRes: (value: boolean) => void;
  addMarker: (marker: ClickData) => void;
  setSubmitIsOpen: (value: boolean) => void;
  setValidationErr: (err: string) => void;
  setRankingMenuIsOpen: (value: boolean) => void;
  setCharacters: (chars: { character: RoundCharacter }[]) => void;
  reset: () => void;
};

type Store = GameState & GameAction;

export const initialState = {
  characters: [],
  boxPosition: { x: 0, y: 0 },
  characterPosition: { x: 0, y: 0 },
  boxIsOpen: false,
  validationRes: null,
  validationErr: null,
  isShowingRes: false,
  markers: [],
  rankingMenuIsOpen: false,
  submitIsOpen: false,
};

const useStore = create<Store>()(
  devtools((set, get, store) => ({
    ...initialState,
    setCharacters: (chars) => set({ characters: chars }),
    setSubmitIsOpen: (value) => set({ submitIsOpen: value }),
    setBoxIsOpen: (value) => set({ boxIsOpen: value }),
    setIsShowingRes: (value) => set({ isShowingRes: value }),
    setValidationErr: (err) => set({ validationErr: err }),
    setRankingMenuIsOpen: (value) => set({ rankingMenuIsOpen: value }),
    reset: () => set(store.getInitialState()),
    addMarker: (marker) => {
      set((state) => ({ markers: [...state.markers, marker] }));
    },
    updateAfterValidation: (validationRes, clickData) => {
      if (validationRes.match) {
        console.log('Match, udating', validationRes);

        get().addMarker(clickData);
        const updatedChars = get().characters.map((item) => {
          return validationRes.remainedIds.includes(item.character.id)
            ? { character: { ...item.character } }
            : { character: { ...item.character, found: true } };
        });

        set({
          characters: updatedChars,
          submitIsOpen: validationRes.finished,
          isShowingRes: true,
          validationRes,
        });
      } else {
        set({
          isShowingRes: true,
          validationRes,
        });
      }
    },
    openBox: (e) => {
      const pos = getPositions(e);
      set({
        boxPosition: pos.boxPosition,
        characterPosition: pos.characterPosition,
        boxIsOpen: true,
      });
    },
  })),
);

function getPositions(e: MouseEvent<HTMLImageElement>) {
  let x = e.clientX;
  let y = e.clientY;
  const boardInfos = (e.target as Element).getBoundingClientRect();

  const boxX = Math.abs(x - boardInfos.width) < 190 ? x - 190 : x;
  const boxY = Math.abs(y - boardInfos.height) < 200 ? y - 200 : y;

  const relativeCharX = (e.clientX - boardInfos.x) / boardInfos.width;
  const relativeCharY = (e.clientY - boardInfos.y) / boardInfos.height;
  return {
    boxPosition: { x: boxX, y: boxY },
    characterPosition: { x: relativeCharX, y: relativeCharY },
  };
}
export default useStore;
