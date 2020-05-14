import React from "react";
import { useSlate } from "slate-react";
import { isLinkActive, insertLink } from "../Helpers";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link";

const LinkButton = () => {
  const editor = useSlate();
  return (
    <IconButton
      // active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <LinkIcon />
    </IconButton>
  );
};

export default LinkButton;
