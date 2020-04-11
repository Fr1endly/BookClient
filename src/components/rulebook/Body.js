import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import SlateEditor from "../editor";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const Body = (props) => {
  const classes = useStyles();
  const { open } = props;
  return (
    <Fragment>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <SlateEditor />
      </main>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  open: state.ruleBook.open,
});

export default connect(mapStateToProps)(Body);
