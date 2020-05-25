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
export const saveChapter = (formValue) => async (dispatch) => {
  console.log(formValue);
  console.log("saveChapter fire");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ index, title, sections });
  try {
    const sections = JSON.stringify(chapter.content);
    await axios.post("http://localhost:3000/api/chapters", body, config);
  } catch (err) {
    console.log(err);
  }
};
