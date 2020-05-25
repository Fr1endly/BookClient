import React, {
  useMemo,
  useState,
  Fragment,
  useCallback,
  useEffect,
} from "react";
import Element from "./Element";
import Leaf from "./Leaf";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

const Display = ({ match, chapters, disabled }) => {
  const classes = useStyles();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  // Finds chapter based on current URL paramters and gets it sections
  useEffect(() => {
    if (chapters) {
      let activeChapter = chapters.filter(
        (chapter) => chapter.title === match.params.title
      )[0];
      if (activeChapter) setValue(JSON.parse(activeChapter.sections));
    }
  }, [match.params, chapters]);

  return (
    <Fragment>
      <div className={classes.root}>
        {/* Render slate context */}
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            readOnly
          />
        </Slate>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  chapters: state.ruleBook.chapters,
});

export default connect(mapStateToProps)(withRouter(Display));
