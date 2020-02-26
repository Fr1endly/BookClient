import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Register from './components/auth/Register';
import Landing from './components/layout/landing';
import Login from './components/auth/Login'
import './App.css';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import { loadUser } from './actions/auth';


export default () => {
  useEffect( () => {
    if(localStorage.token) {
      setAuthToken(localStorage.token)
    }
    store.dispatch(loadUser())
  }, [])

  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

