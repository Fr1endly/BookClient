import {
  SET_DRAWER_OPEN,
  SET_DRAWER_CLOSE,
  TOGGLE_DRAWER,
  LOAD_CHAPTERS,
  REMOVE_CHAPTER,
  FILTER_CHAPTERS,
  CLEAR_FILTERED_CHAPTERS,
} from "../actions/types";

const initialState = {
  open: false,
  chapters: [],
  filteredChapters: [],
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
    case REMOVE_CHAPTER:
      return {
        ...state,
        chapters: state.chapters.filter((chapter) => chapter._id !== payload),
      };
    case FILTER_CHAPTERS:
      return {
        ...state,
        filteredChapters: state.chapters.filter((chapter) => {
          return Object.keys(chapter).some((key) =>
            chapter[key].toString().toLowerCase().includes(payload)
          );
        }),
      };
    case CLEAR_FILTERED_CHAPTERS:
      return {
        ...state,
        filteredChapters: [],
      };
    default:
      return state;
  }
};
