import { GET_USERS, GET_USER_BY_ID } from "../../src/actions/types";

const initialState = {
  users: [],
  user: null,
  loading: true
};

export default (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        user: payload,
        loading: false
      };
    default:
      return state;
  }
};
