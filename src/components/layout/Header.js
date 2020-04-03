import React, { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "center",
    overflowX: "auto",
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  }
}));

function Header(props) {
  const classes = useStyles();
  const {
    auth: { isAuthenicated, loading, isAdmin },
    logout
  } = props;

  const authLinks = (
    <Fragment>
      <Button
        onClick={logout}
        variant="outlined"
        size="small"
        style={{ marginRight: "5px" }}
      >
        Sign out
      </Button>
      {isAdmin ? (
        <Link component={RouterLink} to="/admin">
          <Button
            variant="outlined"
            size="small"
            style={{ marginRight: "5px" }}
          >
            Admin
          </Button>
        </Link>
      ) : null}
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link component={RouterLink} to="/login">
        <Button variant="outlined" size="small" style={{ marginRight: "5px" }}>
          Sign in
        </Button>
      </Link>

      <Link component={RouterLink} to="/register">
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Link>
    </Fragment>
  );

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Social </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link component={RouterLink} to="/">
            Roll & Role
          </Link>
        </Typography>
        {!loading && (isAuthenicated ? authLinks : guestLinks)}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Link
          color="inherit"
          noWrap
          variant="body2"
          className={classes.toolbarLink}
        >
          News
        </Link>
        <Link
          component={RouterLink}
          color="inherit"
          noWrap
          variant="body2"
          to="/rulebook"
          className={classes.toolbarLink}
        >
          Documentation
        </Link>
        <Link
          color="inherit"
          noWrap
          variant="body2"
          className={classes.toolbarLink}
        >
          Planner
        </Link>
      </Toolbar>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
