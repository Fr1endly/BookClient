import React from "react";
import { useSlate } from "slate-react";
import CustomEditor from "./CustomEditor";

const LinkButton = () => {
  const editor = useSlate();
  return (
    <button
      active={CustomEditor.isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        CustomEditor.insertLink(editor, url);
      }}
    >
      LINK
    </button>
  );
};

export default LinkButton;
