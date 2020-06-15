import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Form = ({}) => {
  const classes = useStyles();

  const [formValue, setFormValue] = useState({
    title: "",
    index: 0,
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classes.toolbar}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          onChange={(e) => handleChange(e)}
          name="title"
          value={formValue.title}
          type="text"
          label="Title"
          className={classes.input}
          variant="outlined"
        />
        <TextField
          onChange={(e) => handleChange(e)}
          name="index"
          value={formValue.index}
          label="Index"
          className={classes.input}
          variant="outlined"
          type="number"
        />
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
