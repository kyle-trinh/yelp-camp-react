import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <h1>App</h1>
      </Fragment>
    </Provider>
  );
};

export default App;
