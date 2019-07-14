import React from 'react';
import { Link } from 'react-scroll';

const HeroBox = () => {
  return (
    <div className="hero-text-box">
      <h1 className="my-2">Welcome to YelpCamp!</h1>
      <Link
        to="campground-section"
        smooth={true}
        duration={500}
        className="btn btn-lg btn-primary">
        See all campgrounds
      </Link>
    </div>
  );
};

export default HeroBox;
