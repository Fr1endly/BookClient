import {
  SET_DRAWER_OPEN,
  SET_DRAWER_CLOSE,
  TOGGLE_DRAWER,
  LOAD_CHAPTERS,
} from "../actions/types";

const initialState = {
  open: false,
  chapters: [],
  loading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DRAWER_OPEN:
      return {
        ...state,
        open: true,
      };
    case SET_DRAWER_CLOSE:
      return {
        ...state,
        open: false,
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        open: !state.open,
      };
    case LOAD_CHAPTERS:
      return {
        ...state,
        chapters: payload,
      };
    default:
      return state;
  }
};
