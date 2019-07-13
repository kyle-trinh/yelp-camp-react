import React from 'react';
import { Link } from 'react-router-dom';

const CampgroundBadge = ({ campground }) => {
  return (
    <div className="campground-badge">
      <Link to="/">
        <img
          className="badge-img"
          src={campground.image}
          alt={campground.title}
        />
      </Link>

      <h3 className="my-2 badge-title">{campground.title}</h3>
      <Link to="/" className="btn btn-primary">
        More info
      </Link>
    </div>
  );
};

export default CampgroundBadge;
