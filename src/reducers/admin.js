import {
  GET_USERS,
  GET_USER_BY_ID,
  CLEAR_USER,
  SELECT_CHAPTER,
} from "../../src/actions/types";

const initialState = {
  users: [],
  user: null,
  chapter: null,
  chapterId: null,
  loading: true,
};

export default (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    case SELECT_CHAPTER:
      return {
        ...state,
        chapter: payload,
        chapterId: payload._id,
      };
    default:
      return state;
  }
};
