import React from 'react';

const CampgroundHeader = ({ campground }) => {
  return (
    <div
      className="campground-header"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),url(${
          campground.coverImage
        })`
      }}>
      <h1 className="campground-header-title">{campground.title}</h1>
    </div>
  );
};

export default CampgroundHeader;
