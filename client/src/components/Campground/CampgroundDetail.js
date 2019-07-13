import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeLike, clearCampground } from '../../actions/campground';

const CampgroundDetail = ({
  clearCampground,
  campground,
  auth,
  addLike,
  removeLike
}) => {
  const likedYet = () => {
    let result = false;
    campground.likes.map(like => {
      if (like.user === auth.user._id) {
        result = true;
      }
    });
    return result;
  };

  const likeBtn = (
    <button onClick={() => addLike(campground._id)} className="btn btn-primary">
      Like
    </button>
  );

  const unlikeBtn = (
    <button
      onClick={() => removeLike(campground._id)}
      className="btn btn-danger">
      Unlike
    </button>
  );

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

        {auth.isAuthenticated ? (
          <Fragment>
            <div className="campground-like">
              {likedYet() ? unlikeBtn : likeBtn}{' '}
              <span className="sub-text">
                {campground.likes.length} people likes this
              </span>
            </div>
            <div className="campground-action my-2">
              <Link
                onClick={() => clearCampground()}
                to={`/campground/edit/${campground._id}`}
                className="btn btn-primary">
                Edit
              </Link>
              <button className="btn btn-danger">Delete</button>
            </div>
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
  { addLike, removeLike, clearCampground }
)(CampgroundDetail);
