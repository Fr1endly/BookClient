import {
  SET_DRAWER_OPEN,
  SET_DRAWER_CLOSE,
  TOGGLE_DRAWER,
  LOAD_CHAPTERS,
} from "./types";
import axios from "axios";

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
export const saveChapter = (chapter) => async (dispatch) => {
  try {
    const content = JSON.stringify(chapter.content);
  } catch (err) {}
};
