import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  toggleDrawer,
  filterChapters,
  clearFilteredChapters,
} from "../../actions/ruleBook";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, fade } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TocIcon from "@material-ui/icons/Toc";

import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filterOptions = createFilterOptions({
  stringify: (option) => option.title,
  stringify: (option) => option.sections,
});

const exportData = [
  {
    //ITEM
    fname: "Jayne",
    lname: "Washington",
    email: "jaynewashington@exposa.com",
    gender: "female",
  },
  {
    fname: "Peterson",
    lname: "Dalton",
    email: "petersondalton@exposa.com",
    gender: "male",
  },
];

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
    // backgroundColor: fade("#ADADAD", 0.15),
    // "&:hover": {
    //   backgroundColor: fade("#ADADAD", 0.25),
    // },
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

const Header = ({
  history,
  toggleDrawer,
  filterChapters,
  clearFilteredChapters,
  ruleBook: { open, chapters },
}) => {
  const classes = useStyles();
  // const [value, setValue] = useState("");
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  //   filterChapters(value.toLowerCase());
  // };

  // useEffect(() => {
  //   if (value.length === 0) {
  //     clearFilteredChapters();
  //   }
  // }, [value]);

  const handleDrawerToggle = () => {
    toggleDrawer();
  };

  useEffect(() => {
    if (value) {
      history.push(`/rulebook/${value.title}`);
    }
  }, [value]);
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
          <Autocomplete
            autoHighlight
            freeSolo
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="search"
            options={chapters}
            getOptionLabel={(option) => option.title}
            filterOptions={filterOptions}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            )}
          />
        </div>
      </Toolbar>
    </Fragment>
  );
};

export default connect(mapStateToProps, {
  toggleDrawer,
  filterChapters,
  clearFilteredChapters,
})(withRouter(Header));
