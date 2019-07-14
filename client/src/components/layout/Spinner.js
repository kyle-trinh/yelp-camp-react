import React, { Fragment } from 'react';
import spinner from './Double Ring-1s-200px.gif';

const Spinner = () => {
  return (
    <Fragment>
      <main id="main">
        <img className="spinner" src={spinner} alt="Loading..." />
      </main>
    </Fragment>
  );
};

export default Spinner;
