import React, { Fragment } from "react";
import { connect } from "react-redux";

// Add useEffect that would load user based on params.id
// Make Get user by id action

const AdminUserView = ({ match }) => (
  <Fragment>
    Hello from admin/usersView
    <h3>MATCH: {match.params.id}</h3>
  </Fragment>
);

export default connect()(AdminUserView);
