import React, { Fragment } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import SlateEditor from "../editor/RTE";
import searchResults from "./SearchResults";
import { makeStyles } from "@material-ui/core/styles";
import SearchResults from "./SearchResults";

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
  const { open, searchResults } = props;
  return (
    <Fragment>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {searchResults.length > 0 ? (
          <SearchResults />
        ) : (
          <SlateEditor readOnly={true} />
        )}
      </main>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  open: state.ruleBook.open,
  searchResults: state.ruleBook.filteredChapters,
});

export default connect(mapStateToProps)(Body);
