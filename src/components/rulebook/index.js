import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Body from "./Body";
import Drawer from "./Drawer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  }
}));
export default function index() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Drawer />
      <Body />
    </div>
  );
}
