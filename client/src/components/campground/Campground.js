import React, { useEffect, Fragment } from 'react';
import { getCampground, addLike, removeLike } from '../../actions/campground';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import CommentList from './CommentList';

const Campground = ({
  match,
  getCampground,
  campground: { campground, loading },
  addLike,
  removeLike
}) => {
  useEffect(() => {
    getCampground(match.params.id);
  }, [getCampground, match.params.id]);
  return loading || campground === null ? (
    <Spinner />
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
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error,
            consectetur suscipit eum ut, consequatur deleniti earum vel
            provident iure molestias rerum doloribus amet accusamus harum, animi
            accusantium perspiciatis soluta tempora.
          </p>
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
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>

        <div className="campground-image wow slideInRight">
          <img src={campground.image} alt={campground.title} />
        </div>
      </section>

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
  { getCampground, addLike, removeLike }
)(Campground);
