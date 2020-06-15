import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import SlateEditor from "../editor/RTE";
import searchResults from "./SearchResults";
import { makeStyles } from "@material-ui/core/styles";
import SearchResults from "./SearchResults";
import CustomEditor from "../editor/CustomEditor";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  rootShift: {
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
  content: {
    "& table": {
      border: "1px solid black",
      borderCollapse: "collapse",
      width: "100%",
    },
    "& td": {
      border: "2px solid #ddd",
      padding: "10px",
    },
  },
}));

const Body = (props) => {
  const classes = useStyles();
  const { open, searchResults, match, chapters } = props;
  const activeChapter = chapters.filter(
    (chapter) => chapter.title === match.params.title
  )[0];
  const htmlContent = activeChapter
    ? CustomEditor.serialiseHtmlFromValue(JSON.parse(activeChapter.sections))
    : null;

  return (
    <Fragment>
      <main
        className={clsx(classes.root, {
          [classes.rootShift]: open,
        })}
      >
        {activeChapter ? (
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className={classes.content}
          ></div>
        ) : null}

        {/* {searchResults.length > 0 ? (
          <SearchResults />
        ) : (
          <SlateEditor readOnly={true} />
        )} */}
      </main>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  chapters: state.ruleBook.chapters,
  open: state.ruleBook.open,
  searchResults: state.ruleBook.filteredChapters,
});

export default connect(mapStateToProps)(withRouter(Body));
