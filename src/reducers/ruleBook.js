import {
  SET_DRAWER_OPEN,
  SET_DRAWER_CLOSE,
  TOGGLE_DRAWER,
} from "../actions/types";

const initialState = {
  open: false,
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
    default:
      return state;
  }
};
