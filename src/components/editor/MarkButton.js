import React from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import IconButton from "@material-ui/core/IconButton";

const MarkButton = ({ format, children }) => {
  const editor = useSlate();

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

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

export default MarkButton;
