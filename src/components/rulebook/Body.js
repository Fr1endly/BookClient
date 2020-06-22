import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import SlateEditor from "../editor/RTE";
import searchResults from "./SearchResults";
import { makeStyles } from "@material-ui/core/styles";
import SearchResults from "./SearchResults";
import CustomEditor from "../editor/CustomEditor";
import Typography from "@material-ui/core/Typography";

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
    fontFamily: "Roboto",
    maxWidth: "700px",
    margin: "0 auto",
    fontSize: "18px",

    "& p": {
      fontSize: "1em",
      lineHeight: "1.5em",
      marginBottom: "1.5em",
      marginTop: "1.5em",
    },
    "& h4": {
      fontSize: "1.166em",
      lineHeight: "1.286em",
      marginBottom: "1.286em",
      marginTop: "1.286em",
    },
    "& h3": {
      fontSize: "1.5em",
      lineHeight: "1em",
      marginBottom: "1em",
      marginTop: "0",
    },
    "& table": {
      border: "1px solid black",
      borderCollapse: "collapse",
      width: "100%",
    },
    "& td": {
      border: "2px solid #ddd",
      padding: "10px",
    },
    "& p:after": {
      content: "''",
      display: "inline-block",
      width: "0px",
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
        ) : (
          <div className={classes.content}>
            <h3>Hello and welcome</h3>
            <p></p>
            <h4>Text Title</h4>
            <p></p>
            <p>
              Eam eu persius interesset. Duo at quis quando feugiat, latine
              scribentur ne mei. Nec dictas audire te, duo an vidit sonet
              accusamus, suas alienum facilisi mel in. Et mnesarchum persequeris
              eos. At eum inimicus salutandi maluisset. Mel id labores
              concludaturque, duo an utamur bonorum adolescens. Mel justo
              labores legendos eu. Postea detraxit te pro. At vix probo impetus,
              eirmod reprimique ei has, mea eu iuvaret fierent omittantur. Vix
              an praesent consequat, pro an diam quot prodesset. Ad qui debitis
              deterruisset. Vel causae timeam in, nusquam deserunt suscipiantur
              est ut, vulputate referrentur mei ne. Ullum altera omnesque cu
              sit. Everti dolores delicata ut nam, hinc senserit eu mea. Pro
              debet munere vocibus eu, omnesque adipiscing dissentiet vel at,
              debitis mediocrem suavitate has ut. Cu appareat oportere facilisis
              sea, putent aperiri ut cum. Causae consequat cum no. Nec ei
              commune partiendo efficiantur. Dolore nonumy singulis no sed, eam
              et delicata inimicus, vim sensibus reformidans ei. Sed rebum
              ignota eu.
            </p>
          </div>
        )}

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
