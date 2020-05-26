import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenicated },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenicated ? (
        <div>Please login</div>
      ) : (
        <Component {...props} {...rest} />
      )
    }
  />
);

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
