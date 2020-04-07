import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { toggleDrawer } from "../../actions/ruleBook";

import clsx from "clsx";
import { makeStyles, fade } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import TocIcon from "@material-ui/icons/Toc";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    display: "flex",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginBottom: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#ADADAD", 0.15),
    "&:hover": {
      backgroundColor: fade("#ADADAD", 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
}));

const mapStateToProps = (state) => ({
  ruleBook: state.ruleBook,
});

export default connect(mapStateToProps, { toggleDrawer })(
  ({ toggleDrawer, ruleBook: { open } }) => {
    const classes = useStyles();
    const [value, setValue] = useState("");

    const handleDrawerToggle = () => {
      toggleDrawer();
    };
    return (
      <Fragment>
        <Toolbar
          style={{}}
          position="fixed"
          elevation={0}
          color="inherit"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <TocIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </Fragment>
    );
  }
);
