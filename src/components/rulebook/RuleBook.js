import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Body from "./Body";
import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const RuleBook = ({ match }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Drawer />
      <Body />
    </div>
  );
};

export default RuleBook;
