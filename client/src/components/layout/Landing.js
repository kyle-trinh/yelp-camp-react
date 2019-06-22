import React, { Fragment } from 'react';
import Slideshow from './Slideshow';
import Navbar from './Navbar';
import CampgroundList from './CampgroundList';

const Landing = () => {
  return (
    <Fragment>
      <header>
        <Navbar className="menu" />
        <Slideshow />
      </header>
      <CampgroundList />
    </Fragment>
  );
};

export default Landing;
