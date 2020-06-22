import React, { Fragment, useState } from "react";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect, Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    //backgroundImage: `url(${require("../public/TowerHouse.jpg")})`,
    backgroundRepeat: "no-repeat",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    height: "100%",
    margin: "0 20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "0 10px",
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ login, isAuthenicated }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenicated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className={classes.paper}>
        <span
          className={classes.logo}
          style={{ fontFamily: "Fredericka the Great", fontSize: "40px" }}
        >
          Role & Roll
        </span>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={(e) => onChange(e)}
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => onChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2" component={RouterLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>{null}</Box>
        </form>
      </div>
      {/* <form className="form" onSubmit={(e) => onSubmit(e)}>
        <h3>Please sign in</h3>
        <div className="form-group">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => onChange(e)}
          />
        </div>
        <hr />
        <div className="form-group">
          <input type="submit" value="Submit" style={{ marginTop: "15px" }} />
        </div>
      </form> */}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenicated: state.auth.isAuthenicated,
});

export default connect(mapStateToProps, { login })(Login);
