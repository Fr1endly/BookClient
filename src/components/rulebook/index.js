import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100vh"
  }
}));
export default function index() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>Header</div>
      <div>Drawer</div>
      <div>Body</div>
    </div>
  );
}
