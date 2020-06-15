import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSlate } from "slate-react";
import CustomEditor from "../CustomEditor";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  active: {
    background: "#aaa",
  },
}));

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  const active = CustomEditor.isMarkActive(editor, format);
  const classes = useStyles();

  return (
    <IconButton
      className={active ? classes.active : null}
      size="small"
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
