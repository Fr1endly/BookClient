import React, {
  useMemo,
  useState,
  Fragment,
  useCallback,
  useEffect,
} from "react";
import { connect } from "react-redux";
import { Editor, Transforms, createEditor } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
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

const LIST_TYPES = ["numbered-list", "bulleted-list"];

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

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <IconButton
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {children}
    </IconButton>
  );
};

const BlockButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <IconButton
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {children}
    </IconButton>
  );
};

export default connect()(RTE);
