import React from "react";
import { useSlate } from "slate-react";
import { insertTable, deleteTable } from "./Helpers";
import IconButton from "@material-ui/core/IconButton";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import BorderClearIcon from "@material-ui/icons/BorderClear";

export const InsertTableButton = () => {
  const editor = useSlate();

  return (
    <IconButton onClick={(e) => insertTable(editor)}>
      <BorderAllIcon />
    </IconButton>
  );
};

export const DeleteTableButton = () => {
  const editor = useSlate();

  return (
    <IconButton onClick={(e) => deleteTable(editor)}>
      <BorderClearIcon />
    </IconButton>
  );
};
