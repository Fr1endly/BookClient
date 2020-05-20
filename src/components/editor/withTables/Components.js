import React from "react";
import { useSlate } from "slate-react";
import {
  insertTable,
  deleteTable,
  insertColumn,
  deleteColumn,
  insertRow,
  deleteRow,
} from "./Helpers";
import IconButton from "@material-ui/core/IconButton";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import BorderClearIcon from "@material-ui/icons/BorderClear";
//For row
import BorderRightIcon from "@material-ui/icons/BorderRight";
import BorderVerticalIcon from "@material-ui/icons/BorderVertical";
//For Column
import BorderBottomIcon from "@material-ui/icons/BorderBottom";
import BorderHorizontalIcon from "@material-ui/icons/BorderHorizontal";

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

export const InsertRowButton = () => {
  const editor = useSlate();

  return (
    <IconButton onClick={(e) => insertRow(editor)}>
      <BorderBottomIcon />
    </IconButton>
  );
};

export const DeleteRowButton = () => {
  const editor = useSlate();

  return (
    <IconButton onClick={(e) => deleteRow(editor)}>
      <BorderHorizontalIcon />
    </IconButton>
  );
};

export const InsertColumnButton = () => {
  const editor = useSlate();

  return (
    <IconButton onClick={(e) => insertColumn(editor)}>
      <BorderRightIcon />
    </IconButton>
  );
};

export const DeleteColumnButton = () => {
  const editor = useSlate();

  return (
    <IconButton onClick={(e) => deleteColumn(editor)}>
      <BorderVerticalIcon />
    </IconButton>
  );
};
