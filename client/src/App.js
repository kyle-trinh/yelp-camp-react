import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Landing from './components/layout/Landing';
import Campground from './components/campground/Campground';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';
import NewCampground from './components/campground/NewCampground';
import history from './history';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/campgrounds/:id" component={Campground} />
            <PrivateRoute
              exact
              path="/add-campground"
              component={NewCampground}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
