import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  clearUser,
  createOrEditUser,
  getUsers,
  deleteUser,
} from "../../actions/admin";

import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(1),
  },
  checkBoxControl: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  FormControl: {
    width: "100%",
  },
  TextFieldControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actionBar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const UserView = ({
  user,
  clearUser,
  createOrEditUser,
  getUsers,
  deleteUser,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState({
    email: "",
    name: "",
    isActive: false,
    isAdmin: false,
  });
  const { isActive, isAdmin, email, name } = state;

  useEffect(() => {
    setState({ ...user });
  }, [user]);

  const toggleEditMode = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => {
    clearUser();
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrEditUser(state, true);
    clearUser();
    getUsers();
  };

  const handleDelete = (e) => {
    deleteUser(user.id);
    clearUser();
    getUsers();
  };

  return (
    <Paper elevation={1} className={classes.root}>
      <div className={classes.actionBar}>
        <div>
          <FormControlLabel
            className={classes.checkBoxControl}
            control={
              <Checkbox
                checked={checked}
                color="primary"
                onChange={toggleEditMode}
                name="edit"
              />
            }
            label="Edit"
          />
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </label>
      </div>

      <div className={classes.FormControl}>
        <form>
          <TextField
            fullWidth
            className={classes.TextFieldControl}
            variant="outlined"
            disabled={!checked}
            name="name"
            label="name"
            value={name}
            onChange={handleChange}
            size="small"
          />
          <TextField
            className={classes.TextFieldControl}
            fullWidth
            variant="outlined"
            disabled={!checked}
            name="email"
            label="email"
            value={email}
            onChange={handleChange}
            size="small"
          />
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isActive}
                    onChange={handleChange}
                    name="isActive"
                    disabled={!checked}
                  />
                }
                label="Active "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdmin}
                    onChange={handleChange}
                    name="isAdmin"
                    disabled={!checked}
                  />
                }
                label="Admin rights"
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                type="submit"
                color="primary"
                className={classes.submitButton}
              >
                Submit
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  user: state.admin.user,
});

export default connect(mapStateToProps, {
  clearUser,
  createOrEditUser,
  getUsers,
  deleteUser,
})(UserView);
