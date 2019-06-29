import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

const HeroText = () => {
  return (
    <div className="hero-text" style={{ position: 'relative', zIndex: '5' }}>
      <h1>Welcome to YelpCamp!</h1>
      <Link
        className="btn btn-primary"
        to="campground-section"
        smooth={true}
        duration={500}>
        View all campgrounds
      </Link>
    </div>
  );
};

export default HeroText;
