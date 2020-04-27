import React from "react";
import { useSlate } from "slate-react";
import CustomEditor from "./CustomEditor";
import IconButton from "@material-ui/core/IconButton";

const BlockButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <IconButton
      active={CustomEditor.isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleBlock(editor, format);
      }}
    >
      {children}
    </IconButton>
  );
};

export default BlockButton;
