import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register'
import Landing from './components/layout/landing'
import './App.css'
import { Provider } from 'react-redux';
import store from './store'

export default () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

