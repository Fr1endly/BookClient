import React from "react";
import { useSlate } from "slate-react";
import CustomEditor from "../CustomEditor";
import IconButton from "@material-ui/core/IconButton";

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <IconButton
      // active={CustomEditor.isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
    >
      {children}
    </IconButton>
  );
};

export default MarkButton;
