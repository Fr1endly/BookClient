import React, { Fragment, useEffect, useState } from "react";
import { createOrEditUser, deleteUser } from "../../actions/admin";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(3)
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  }
}));

const UserView = ({ user }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <Paper elevation={1} className={classes.root}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      <Typography
        variant="h6"
        color="primary"
        paragraph
        style={{ textTransform: "capitalize" }}
      >
        {user.name}
      </Typography>
    </Paper>
  );
};

const mapStateToProps = state => ({
  user: state.admin.user
});

export default connect(mapStateToProps)(UserView);
