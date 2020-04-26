import React from "react";
import { useSlate } from "slate-react";
import CustomEditor from "./CustomEditor";

const MarkButton = ({ format }) => {
  const editor = useSlate();
  return (
    <button
      active={CustomEditor.isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
    >
      {format}
    </button>
  );
};

export default MarkButton;
