import React, { useEffect, useState } from "react";
import { createOrEditUser, deleteUser } from "../../actions/admin";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(1)
  },
  checkBoxControl: {
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  FormControl: {
    width: "100%"
  },
  TextFieldControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const UserView = ({ user }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <Paper elevation={1} className={classes.root}>
      <FormControlLabel
        className={classes.checkBoxControl}
        control={
          <Checkbox
            checked={checked}
            color="primary"
            onChange={handleChange}
            name="edit"
          />
        }
        label="Edit"
      />
      <div className={classes.FormControl}>
        <form>
          <TextField
            fullWidth
            className={classes.TextFieldControl}
            variant="outlined"
            disabled={!checked}
            label="name"
            value={user.name}
            onChange={e => setName(e.target.value)}
            size="small"
          />
          <TextField
            className={classes.TextFieldControl}
            fullWidth
            variant="outlined"
            disabled={!checked}
            label="email"
            value={user.email}
            onChange={e => setName(e.target.value)}
            size="small"
          />
        </form>
      </div>
    </Paper>
  );
};

const mapStateToProps = state => ({
  user: state.admin.user
});

export default connect(mapStateToProps)(UserView);
