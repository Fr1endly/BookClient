import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ADMIN_LOADED,
  LOGOUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenicated: null,
  isAdmin: null,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenicated: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenicated: true,
        loading: false
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        ...payload,
        token: null,
        isAuthenicated: false,
        loading: false,
        isAdmin: false
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenicated: true,
        loading: false,
        user: payload
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenicated: true,
        isAdmin: true,
        loading: false,
        user: payload
      };
    default:
      return state;
  }
};
