import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = (
  { component: Component, auth: { isAuthenicated, loading, isAdmin }, ...rest } // Same as !isAuthenicated && !loading && !isAdmin ? expression1 : expression2
) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenicated && !loading ? (
        <div>Please login</div>
      ) : !isAdmin ? (
        <div>Not authorized.</div>
      ) : (
        <Component {...props} {...rest} />
      )
    }
  />
);

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(AdminRoute);
