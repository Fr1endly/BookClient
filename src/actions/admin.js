import axios from "axios";
import { GET_USERS, GET_USER_BY_ID, CLEAR_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

export const getUsers = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:3000/api/users");
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const createOrEditUser = formData => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(formData);
  console.log(body);
  try {
    await axios.post("http://localhost:3000/admin/users", body, config);

    dispatch(setAlert("User created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const getUserById = id => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:3000/admin/users/${id}`);
    const payload = {
      ...res.data,
      id: id
    };
    dispatch({
      type: GET_USER_BY_ID,
      payload: payload
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearUser = () => async dispatch => {
  dispatch({
    type: CLEAR_USER
  });
};
