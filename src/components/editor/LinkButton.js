import React from "react";
import { useSlate } from "slate-react";
import CustomEditor from "./CustomEditor";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link";

const LinkButton = () => {
  const editor = useSlate();
  return (
    <IconButton
      active={CustomEditor.isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        CustomEditor.insertLink(editor, url);
      }}
    >
      <LinkIcon />
    </IconButton>
  );
};

export default LinkButton;
