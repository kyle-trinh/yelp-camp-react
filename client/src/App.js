import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import './animate.css';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';

import Landing from './components/layout/Landing';

import history from './history';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
