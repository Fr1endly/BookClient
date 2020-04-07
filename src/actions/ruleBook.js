import { SET_DRAWER_OPEN, SET_DRAWER_CLOSE, TOGGLE_DRAWER } from "./types";

//Open Drawer
export const openDrawer = () => (dispatch) =>
  dispatch({ type: SET_DRAWER_OPEN });

//Close Drawer
export const closeDrawer = () => (dispatch) =>
  dispatch({ type: SET_DRAWER_CLOSE });

export const toggleDrawer = () => (dispatch) =>
  dispatch({ type: TOGGLE_DRAWER });
