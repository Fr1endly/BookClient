import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Register from "./components/auth/Register";
import Landing from "./components/layout/landing";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/navbar";
import Alert from "./components/Alert";
import AdminPanel from "./components/admin";
import AdminUserView from "./components/admin/AdminUserView";
import AdminCreateUser from "./components/admin/AdminCreateUser";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth";
import AdminRoute from "./components/routing/AdminRoute";

export default () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <AdminRoute exact path="/admin" component={AdminPanel} />
            <AdminRoute
              exact
              path="/admin/users/new"
              component={AdminCreateUser}
            />
            <AdminRoute
              exact
              path="/admin/users/:id"
              component={AdminUserView}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
