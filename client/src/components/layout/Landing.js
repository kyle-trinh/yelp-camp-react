import React, { Fragment } from 'react';
import Navbar from './Navbar';
import Slideshow from './Slideshow';
import HeroBox from './HeroBox';

const Landing = () => {
  return (
    <Fragment>
      <Navbar className="menu" />
      <header>
        <HeroBox />
        <Slideshow />
      </header>
    </Fragment>
  );
};

export default Landing;
