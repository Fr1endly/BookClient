import React from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import IconButton from "@material-ui/core/IconButton";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const BlockButton = ({ format, children }) => {
  const editor = useSlate();

  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });

    return !!match;
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

export default BlockButton;
