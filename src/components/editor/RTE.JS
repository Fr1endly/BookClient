import React, { useCallback, useMemo, useState } from "react";
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
import { Input } from "@material-ui/core";

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
}));

const RichTextExample = () => {
  const classes = useStyles();
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withTables(withLinks(withHistory(withReact(createEditor())))),
    []
  );

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
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
          <div style={{ display: "inline-flex" }}>
            <TextField type="text" label="Title" />
            <TextField label="Index" />
            <Buttont type="submit" color="primary">
              Submit
            </Buttont>
          </div>
        </div>
      </div>
      <Divider />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Entser some rich text…"
        spellCheck
        autoFocus
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
    </Slate>
  );
};

export default RichTextExample;
