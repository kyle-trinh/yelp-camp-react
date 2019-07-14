import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addLike,
  removeLike,
  clearCampground,
  deleteCampground
} from '../../actions/campground';
import Modal from '../layout/Modal';

const CampgroundDetail = ({
  clearCampground,
  campground,
  auth,
  addLike,
  removeLike,
  deleteCampground
}) => {
  const likedYet = () => {
    let result = false;
    campground.likes.map(like => {
      if (like.user === auth.user._id) {
        result = true;
      }
      return like;
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

  const [showModal, setShowModal] = useState(false);

  const deleteActions = (
    <Fragment>
      <button onClick={() => setShowModal(false)} className="btn btn-primary">
        Cancel
      </button>
      <button
        onClick={() => deleteCampground(campground._id)}
        className="btn btn-danger">
        Delete
      </button>
    </Fragment>
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
            <div className="campground-like my-2">
              {likedYet() ? unlikeBtn : likeBtn}{' '}
              <span className="sub-text">
                {campground.likes.length} people likes this
              </span>
            </div>
            {auth.user._id === campground.user ? (
              <div className="campground-action ">
                <Link
                  onClick={() => clearCampground()}
                  to={`/campground/edit/${campground._id}`}
                  className="btn btn-primary">
                  Edit
                </Link>
                <a
                  href="#!"
                  onClick={e => setShowModal(true)}
                  className="btn btn-danger">
                  Delete
                </a>
              </div>
            ) : null}
          </Fragment>
        ) : null}
      </div>
      <Modal
        className={`modal ${showModal ? 'show' : ''}`}
        title="Delete campground"
        content="Are you sure you want to delete this campground?"
        actions={deleteActions}
        onDismiss={() => {
          setShowModal(false);
        }}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, clearCampground, deleteCampground }
)(CampgroundDetail);
