import React, { Fragment } from 'react';
import Navbar from './Navbar';
import Slideshow from './Slideshow';
import HeroBox from './HeroBox';
import CampgroundList from '../Campgrounds/CampgroundList';

const Landing = () => {
  return (
    <Fragment>
      <header>
        <Navbar className="menu" />
        <HeroBox />
        <Slideshow />
      </header>
      <CampgroundList />
    </Fragment>
  );
};

export default Landing;
