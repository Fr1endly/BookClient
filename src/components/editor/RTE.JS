import React, { useMemo, useState, Fragment, useCallback } from "react";
import Element from "./Element";
import Leaf from "./Leaf";
import MarkButton from "./MarkButton";
import BlockButton from "./BlockButton";
import { connect } from "react-redux";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { makeStyles } from "@material-ui/core/styles";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    border: "1px solid black",
  },
}));

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text:
          ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
];

const RTE = () => {
  const classes = useStyles();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Fragment>
      <div className={classes.root}>
        {/* Render slate context */}
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <div>
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
          </div>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoFocus
          />
        </Slate>
      </div>
    </Fragment>
  );
};

export default connect()(RTE);
