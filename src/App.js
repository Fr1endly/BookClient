import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Landing from "./components/layout/landing";
import Header from "./components/layout/Header";
import Alert from "./components/Alert";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth";
import Routes from "./components/routing/Routes";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

export default () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  //
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Router>
          <Header />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
};
