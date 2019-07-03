import React, { useEffect, Fragment, useState } from 'react';
import {
  getCampground,
  addLike,
  removeLike,
  deleteCampground
} from '../../actions/campground';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import CommentList from './comment/CommentList';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';
const Campground = ({
  match,
  getCampground,
  campground: { campground, loading },
  addLike,
  removeLike,
  deleteCampground
}) => {
  useEffect(() => {
    getCampground(match.params.id);
  }, [getCampground, match.params.id]);

  const [showModal, setShowModal] = useState(false);

  const actions = (
    <Fragment>
      <button onClick={e => setShowModal(false)} className="btn btn-primary">
        Cancel
      </button>
      <button
        onClick={e => deleteCampground(campground._id)}
        className="btn btn-danger">
        Delete
      </button>
    </Fragment>
  );
  return loading || campground === null ? (
    <div style={{ height: '100vh', paddingTop: '40vh' }}>
      <Spinner />
    </div>
  ) : (
    <Fragment>
      <header>
        <Navbar className="menu" />
        <div className="title-text-box">
          <h1>{campground.title}</h1>
        </div>
        <div
          className="campground-cover-image"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)),url(${
              campground.coverImage
            })`
          }}
        />
      </header>
      <section className="campground-detail">
        <div className="campground-description wow bounceInUp">
          <h2>About</h2>
          <h1>{campground.title}</h1>
          <p>{campground.description}</p>
          <p className="small-text">
            Submitted by {campground.name ? campground.name : 'Unknown'},
            {' on '}
            <Moment format="YYYY/MM/DD">{campground.date}</Moment>
          </p>
          <button
            onClick={e => addLike(campground._id)}
            style={{ marginRight: '1rem' }}
            className="btn btn-primary">
            <i className="fas fa-thumbs-up" />{' '}
            {campground.likes.length > 0 && (
              <span>{`    ${campground.likes.length}`}</span>
            )}
          </button>
          <button
            onClick={e => removeLike(campground._id)}
            className="btn btn-primary">
            <i className="fas fa-thumbs-down" />
          </button>
          <div className="edit-delete">
            <button style={{ marginRight: '1rem' }} className="btn btn-primary">
              Edit
            </button>
            <Link
              // to={`/campgrounds/delete-campground/${campground._id}`}
              // onClick={e => deleteCampground(campground._id)}
              onClick={e => setShowModal(true)}
              className="btn btn-danger">
              Delete
            </Link>
          </div>
        </div>

        <div className="campground-image wow slideInRight">
          <img src={campground.image} alt={campground.title} />
        </div>
      </section>

      <Modal
        className={`modal ${showModal ? 'show' : ''}`}
        title="Delete Campground"
        content="Are you sure you want to delete this campground?"
        actions={actions}
        onDismiss={() => {
          history.push(`/campgrounds/${campground._id}`);
          setShowModal(false);
        }}
      />

      <CommentList
        comments={campground.comments}
        campgroundId={campground._id}
      />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  campground: state.campground
});

export default connect(
  mapStateToProps,
  { getCampground, addLike, removeLike, deleteCampground }
)(Campground);
