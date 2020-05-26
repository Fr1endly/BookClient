import {
  SET_DRAWER_OPEN,
  SET_DRAWER_CLOSE,
  TOGGLE_DRAWER,
  LOAD_CHAPTERS,
  SELECT_CHAPTER,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";
import { camelCase } from "lodash";

//Open Drawer
export const openDrawer = () => (dispatch) =>
  dispatch({ type: SET_DRAWER_OPEN });

//Close Drawer
export const closeDrawer = () => (dispatch) =>
  dispatch({ type: SET_DRAWER_CLOSE });

// Toggle Drawer
export const toggleDrawer = () => (dispatch) =>
  dispatch({ type: TOGGLE_DRAWER });

// Load chapters and sort them.
export const fetchChapters = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3000/api/chapters");
    dispatch({
      type: LOAD_CHAPTERS,
      payload: res.data.sort((a, b) => a.index - b.index),
    });
  } catch (err) {
    console.log(err);
  }
};

// Save chapter to db.
export const saveChapter = (chapter, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    ...chapter,
    title: camelCase(chapter.title),
  });

  try {
    await axios.post("http://localhost:3000/api/chapters", body, config);
    history.push(`/rulebook/${camelCase(chapter.title)}`);
    fetchChapters();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Select active chapter for editing
export const getChapterById = (id) => (dispatch) => {
  
};
