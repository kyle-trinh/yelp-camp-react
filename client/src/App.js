import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Landing from './components/layout/Landing';
import Campground from './components/campground/Campground';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/campground" component={Campground} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
