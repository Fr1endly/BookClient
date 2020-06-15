import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Register from "../../components/auth/Register";
import Login from "../../components/auth/Login";
import AdminUserView from "../../components/admin/AdminUserView";
import AdminPanelMat from "../../components/admin/AdminPanelMat";
import AdminCreateUser from "../../components/admin/AdminCreateUser";
import RuleBook from "../rulebook/RuleBook";
import RTE from "../../components/editor/RTE";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/rulebook" component={RuleBook} />
        <PrivateRoute path="/rulebook/:title" component={RuleBook} />
        <AdminRoute exact path="/admin" component={AdminPanelMat} />
        <AdminRoute exact path="/admin/users/new" component={AdminCreateUser} />
        <AdminRoute exact path="/admin/users/:id" component={AdminUserView} />
        <AdminRoute exact path="/admin/editor" component={RTE} />
        <AdminRoute
          exact
          path="/admin/editChapter/:id"
          component={RTE}
          edit={true}
        />
      </Switch>
    </Fragment>
  );
};

export default Routes;
