import React, { useMemo, useState, Fragment, useCallback } from "react";
import { connect } from "react-redux";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text:
          "Sunt in qui qui est exercitation eu elit dolore nulla. Cupidatat eu pariatur consequat incididunt aute proident sit reprehenderit. Deserunt et Lorem reprehenderit labore in anim ea laborum occaecat laborum. Irure veniam esse irure et est nisi deserunt ex ea reprehenderit duis culpa. Est labore sunt officia velit aliquip Lorem dolor nostrud nulla consequat esse. Mollit deserunt eu dolore velit mollit velit sit laboris ea aute et adipisicing occaecat laboris. Proident aliquip aliqua eu ea. Exercitation sint qui nostrud reprehenderit id incididunt ipsum deserunt nulla proident non commodo. Pariatur occaecat enim eu officia officia laborum qui irure. Cillum minim sunt veniam sit laborum proident duis sint ad. Labore pariatur ea ut sunt dolor Lorem non aliquip in proident non ad irure. Dolore minim voluptate consectetur non commodo duis. Adipisicing laboris ipsum incididunt officia quis duis laborum fugiat commodo voluptate exercitation consectetur laboris minim. Est consequat labore dolore esse est aliquip irure deserunt eu laborum occaecat occaecat occaecat. Aute Lorem labore id veniam reprehenderit veniam pariatur ex. Nostrud laborum proident proident duis duis laboris ullamco. Fugiat laborum Lorem esse anim ad esse et proident. Ut voluptate incididunt ipsum proident cillum dolore ipsum nulla elit ea reprehenderit.",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Sunt in qui qui est exercitation eu elit dolore nulla. Cupidatat eu pariatur consequat incididunt aute proident sit reprehenderit. Deserunt et Lorem reprehenderit labore in anim ea laborum occaecat laborum. Irure veniam esse irure et est nisi deserunt ex ea reprehenderit duis culpa. Est labore sunt officia velit aliquip Lorem dolor nostrud nulla consequat esse. Mollit deserunt eu dolore velit mollit velit sit laboris ea aute et adipisicing occaecat laboris. Proident aliquip aliqua eu ea. Exercitation sint qui nostrud reprehenderit id incididunt ipsum deserunt nulla proident non commodo. Pariatur occaecat enim eu officia officia laborum qui irure. Cillum minim sunt veniam sit laborum proident duis sint ad. Labore pariatur ea ut sunt dolor Lorem non aliquip in proident non ad irure. Dolore minim voluptate consectetur non commodo duis. Adipisicing laboris ipsum incididunt officia quis duis laborum fugiat commodo voluptate exercitation consectetur laboris minim. Est consequat labore dolore esse est aliquip irure deserunt eu laborum occaecat occaecat occaecat. Aute Lorem labore id veniam reprehenderit veniam pariatur ex. Nostrud laborum proident proident duis duis laboris ullamco. Fugiat laborum Lorem esse anim ad esse et proident. Ut voluptate incididunt ipsum proident cillum dolore ipsum nulla elit ea reprehenderit.",
      },
    ],
  },
];

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "paragraph":
      return (
        <Typography variant="body1" gutterBottom {...attributes}>
          {children}
        </Typography>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default connect()((props) => {
  const classes = useStyles();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);

  const renderElement = useCallback((props) => <Element {...props} />, []);

  return (
    <Fragment>
      <div className={classes.root}>
        {/* Render slate context */}
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Editable renderElement={renderElement} readOnly />
        </Slate>
      </div>
    </Fragment>
  );
});
