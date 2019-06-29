import React, { Fragment } from 'react';
import Slideshow from './Slideshow';
import Navbar from './Navbar';
import CampgroundList from './CampgroundList';
import HeroText from './HeroText';

const Landing = () => {
  return (
    <Fragment>
      <header>
        <Navbar className="menu" />
        <HeroText />
        <Slideshow />
      </header>
      <CampgroundList />
    </Fragment>
  );
};

export default Landing;
