import React, { useCallback, useMemo, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  saveChapter,
  getChapterById,
  editChapter,
} from "../../actions/ruleBook";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { withLinks } from "./withLinks/withLinks";
import { withTables } from "./withTables/withTables";
import {
  InsertTableButton,
  DeleteTableButton,
  InsertColumnButton,
  DeleteColumnButton,
  InsertRowButton,
  DeleteRowButton,
} from "./withTables/Components";
import Element from "./Element";
import Leaf from "./Leaf";
import BlockButton from "./components/BlockButton";
import MarkButton from "./components/MarkButton";
import LinkButton from "./withLinks/components/LinkButton";
import initialValue from "./InitialValue";
import CustomEditor from "./CustomEditor";
import { makeStyles } from "@material-ui/core/styles";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
  },
  editor: {
    border: "1px solid black",
  },
  input: {
    marginRight: theme.spacing(2),
  },
}));

//RICH TEXT EDITOR
const RTE = ({
  getChapterById,
  saveChapter,
  history,
  readOnly,
  match,
  chapters,
  chapter,
  chapterId,
  editChapter,
  edit,
}) => {
  const classes = useStyles();
  const [formValue, setFormValue] = useState({
    title: "",
    index: 0,
  });

  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withTables(withLinks(withHistory(withReact(createEditor())))),
    []
  );

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const chapter = {
      ...formValue,
      sections: JSON.stringify(value),
    };

    if (edit) {
      editChapter(chapter, history, match.params.id);
    } else {
      saveChapter(chapter, history);
    }
  };

  // Load chapter to display readOnly version to user
  if (readOnly) {
    useEffect(() => {
      if (chapters) {
        let activeChapter = chapters.filter(
          (chapter) => chapter.title === match.params.title
        )[0];
        if (activeChapter) setValue(JSON.parse(activeChapter.sections));
      }
    }, [match, chapters]);
  }
  // Load chapter for editing to admin user
  if (edit) {
    useEffect(() => {
      getChapterById(match.params.id);
      if (chapter) {
        setValue(JSON.parse(chapter.sections));
        const { index, title } = chapter;
        setFormValue({ title, index });
      }
    }, [getChapterById, match.params.id, chapterId]);
  }

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      {readOnly ? null : (
        <div className={classes.toolbar}>
          <div className={classes.buttonGroup}>
            <MarkButton format="bold">
              <FormatBoldIcon />
            </MarkButton>
            <MarkButton format="italic">
              <FormatItalicIcon />
            </MarkButton>
            <MarkButton format="underline">
              <FormatUnderlinedIcon />
            </MarkButton>
            <BlockButton format="heading-one">
              <LooksOneIcon />
            </BlockButton>
            <BlockButton format="heading-two">
              <LooksTwoIcon />
            </BlockButton>
            <BlockButton format="block-quote">
              <FormatQuoteIcon />
            </BlockButton>
            <BlockButton format="numbered-list">
              <FormatListNumberedIcon />
            </BlockButton>
            <BlockButton format="bulleted-list">
              <FormatListBulletedIcon />
            </BlockButton>
            <LinkButton />
            <InsertTableButton />
            <DeleteTableButton />
            <InsertRowButton />
            <InsertColumnButton />
            <DeleteRowButton />
            <DeleteColumnButton />
          </div>
        </div>
      )}

      <Divider />
      <Editable
        style={{ height: "80%" }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Entser some rich text…"
        spellCheck
        autoFocus
        readOnly={readOnly ? true : false}
        style={{ minHeight: "400px" }}
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              CustomEditor.toggleMark(editor, mark);
            }
          }
        }}
      />
      {readOnly ? null : (
        <div className={classes.toolbar} style={{ justifyContent: "center" }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              onChange={(e) => handleChange(e)}
              name="title"
              value={formValue.title}
              type="text"
              label="Title"
              className={classes.input}
              variant="outlined"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              name="index"
              value={formValue.index}
              label="Index"
              className={classes.input}
              variant="outlined"
              type="number"
            />
            <Button type="submit" color="primary">
              Submit
            </Button>
          </form>
        </div>
      )}
    </Slate>
  );
};

const mapStateToProps = (state) => ({
  chapter: state.admin.chapter,
  chapters: state.ruleBook.chapters,
  chapterId: state.admin.chapterId,
});

export default connect(mapStateToProps, {
  saveChapter,
  getChapterById,
  editChapter,
})(withRouter(RTE));
