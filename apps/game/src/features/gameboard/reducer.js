export const ACTIONS = {
  //Board loading
  LOAD_SUCCESS: 'load_success',
  LOAD_ERROR: 'load_error',

  //Click flow
  OPEN_BOX: 'open_box',
  CLOSE_BOX: 'close_box',

  //Validation flow
  VALIDATE_START: 'validate_start',
  VALIDATE_ERROR: 'validate_err',
  VALIDATE_SUCCESS: 'validate_sucess',
  SHOW_RESPONSE: 'show_res',
  HIDE_RESPONSE: 'hide_res',
  ADD_MARKER: 'add_marker',
  UPDATE_CHAR_FOUND_STATUS: 'upt_char_found_status',

  //score submition
  OPEN_SUBMIT: 'open_submit',
  CLOSE_SUBMIT: 'close_submit',
};

export const initialState = {
  //Board loading
  board: null,
  characters: null,
  loadError: null,
  isLoading: true,

  //Click flow
  boxPosition: { x: 0, y: 0 },
  characterPosition: { x: 0, y: 0 },
  boxIsOpen: false,

  //Validation flow
  validationRes: null,
  isValidating: false,
  validationErr: null,
  isShowingRes: false,
  markers: [],

  //score submition
  submitIsOpen: false,
};

export function gameReducer(state, action) {
  switch (action.type) {
    //Board loading
    case ACTIONS.LOAD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        loadError: null,
        board: action.payload.board,
        characters: action.payload.characters,
      };
    }

    case ACTIONS.LOAD_ERROR: {
      return {
        ...state,
        isLoading: false,
        board: null,
        characters: null,
        loadError: action.payload,
      };
    }

    //Click flow
    case ACTIONS.OPEN_BOX: {
      const e = action.payload;
      let x = e.clientX;
      let y = e.clientY;
      const boardInfos = e.target.getBoundingClientRect();

      const boxX = Math.abs(x - boardInfos.width) < 190 ? x - 190 : x;
      const boxY = Math.abs(y - boardInfos.height) < 200 ? y - 200 : y;

      const relativeCharX = (e.clientX - boardInfos.x) / boardInfos.width;
      const relativeCharY = (e.clientY - boardInfos.y) / boardInfos.height;

      return {
        ...state,
        boxIsOpen: true,
        boxPosition: { x: boxX, y: boxY },
        characterPosition: { x: relativeCharX, y: relativeCharY },
      };
    }

    case ACTIONS.CLOSE_BOX: {
      return {
        ...state,
        boxIsOpen: false,
      };
    }

    //Validation flow
    case ACTIONS.VALIDATE_START: {
      return { ...state, isValidating: true };
    }

    case ACTIONS.VALIDATE_SUCCESS: {
      const data = action.payload.data;
      const remainedIds = action.payload.data.remainedIds;
      const clickData = action.payload.clickData;
      let updatedMarkers = [...state.markers];
      let updatedChars = [...state.characters];

      if (data.match) {
        updatedMarkers.push(clickData);

        updatedChars = state.characters.map((item) => {
          return remainedIds.includes(item.character.id)
            ? { character: { ...item.character } }
            : { character: { ...item.character, found: true } };
        });
      }

      return {
        ...state,
        isValidating: false,
        isShowingRes: true,
        validationErr: null,
        validationRes: data,
        characters: updatedChars,
        markers: updatedMarkers,
        submitIsOpen: data.finished,
      };
    }

    case ACTIONS.VALIDATE_ERROR: {
      return {
        ...state,
        isValidating: false,
        validationErr: action.payload,
        validationRes: null,
      };
    }

    case ACTIONS.HIDE_RESPONSE: {
      return { ...state, isShowingRes: false };
    }

    //score submition
    case ACTIONS.OPEN_SUBMIT: {
      return { ...state, submitIsOpen: true };
    }

    case ACTIONS.CLOSE_SUBMIT: {
      return { ...state, submitIsOpen: false };
    }

    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
}
