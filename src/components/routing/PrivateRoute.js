import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (
  { component: Component, auth: { isAuthenicated }, ...rest } // Same as !isAuthenicated && !loading && !isAdmin ? expression1 : expression2
) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenicated ? <div>Please login</div> : <Component {...props} />
    }
  />
);

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
