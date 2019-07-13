import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike } from '../../actions/campground';

const CampgroundDetail = ({ campground, auth, addLike }) => {
  const likedYet = () => {
    let result = false;
    campground.likes.map(like => {
      if (like.user === auth.user._id) {
        result = true;
      }
    });
    return result;
  };

  return (
    <Fragment>
      <img
        className="campground-detail-image"
        src={campground.image}
        alt={campground.title}
      />
      <div className="campground-detail-content">
        <h2>About</h2>
        <h1 className="campground-detail-title  text-primary">
          {campground.title}
        </h1>
        <p className="lead">{campground.description}</p>
        <p className="sub-text">
          Submited by {campground.name ? campground.name : 'Unknown'}, on{' '}
          <Moment format="YYYY/MM/DD">{campground.date}</Moment>
        </p>
        <div className="campground-like" />
        {auth.isAuthenticated ? (
          <Fragment>
            <button
              onClick={() => addLike(campground._id)}
              className={likedYet() ? 'btn btn-danger' : 'btn btn-primary'}>
              {likedYet() ? 'Unlike' : 'Like'}
            </button>
            <span className="sub-text">
              {campground.likes.length} people likes this
            </span>
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike }
)(CampgroundDetail);
