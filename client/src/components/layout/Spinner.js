import React, { Fragment } from 'react';
import spinner from './Double Ring-1s-200px.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img className="spinner" src={spinner} alt="Loading..." />
    </Fragment>
  );
};

export default Spinner;
