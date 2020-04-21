import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Register from "./components/auth/Register";
import Landing from "./components/layout/landing";
import Login from "./components/auth/Login";
import Header from "./components/layout/Header";
import Alert from "./components/Alert";
import RuleBook from "./components/rulebook/RuleBook";
import AdminUserView from "./components/admin/AdminUserView";
import AdminPanelMat from "./components/admin/AdminPanelMat";
import AdminCreateUser from "./components/admin/AdminCreateUser";
import Editor from "./components/editor/RTE";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

export default () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Router>
          <Header />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/rulebook" component={RuleBook} />
            <PrivateRoute path="/rulebook/:title" component={RuleBook} />
            <AdminRoute exact path="/admin" component={AdminPanelMat} />
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
            <AdminRoute exact path="/admin/newChapter" component={Editor} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
};
