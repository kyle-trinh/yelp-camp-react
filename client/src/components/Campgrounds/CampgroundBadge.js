import React from 'react';
import { Link } from 'react-router-dom';

const CampgroundBadge = ({ campground }) => {
  const titleShorten = title => {
    const titleArray = title.split(' ');
    let result = '';
    if (titleArray.length > 3) {
      result += '...';
    }
    result = titleArray.splice(0, 3).join(' ') + result;

    return result;
  };
  return (
    <div className="campground-badge">
      <Link to="/">
        <img
          className="badge-img"
          src={campground.image}
          alt={campground.title}
        />
      </Link>
      <div className="badge-info">
        <h3 className="badge-title">{titleShorten(campground.title)}</h3>
        <Link to={`/campground/${campground._id}`} className="btn btn-primary">
          More info
        </Link>
      </div>
    </div>
  );
};

export default CampgroundBadge;
