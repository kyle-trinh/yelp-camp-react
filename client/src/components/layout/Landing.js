import React, { Fragment } from 'react';
import Navbar from './Navbar';
import Slideshow from './Slideshow';
import HeroBox from './HeroBox';
import CampgroundList from '../Campgrounds/CampgroundList';
import Noti from '../layout/Noti';

const Landing = () => {
  return (
    <Fragment>
      {/* <div className="noti">
        <p>You have ...</p>
      </div> */}
      <Noti />
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
