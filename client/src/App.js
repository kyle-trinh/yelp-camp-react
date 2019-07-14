import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import './animate.css';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';

import Landing from './components/layout/Landing';

import history from './history';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateCampground from './components/Campgrounds/CreateCampground';
import Campground from './components/Campground/Campground';
import EditCampground from './components/Campgrounds/EditCampground';
import ScrollToTop from './components/layout/ScrollToTop';
import Footer from './components/layout/Footer';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Router history={history}>
        <ScrollToTop>
          <Fragment>
            <Route exact path="/" component={Landing} />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute
                exact
                path="/campground/new"
                component={CreateCampground}
              />
              <Route exact path="/campground/:id" component={Campground} />
              <PrivateRoute
                exact
                path="/campground/edit/:id"
                component={EditCampground}
              />
            </Switch>
            <Footer />
          </Fragment>
        </ScrollToTop>
      </Router>
    </Provider>
  );
};

export default App;
