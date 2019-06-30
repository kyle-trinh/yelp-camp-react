import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../../actions/campground';
import Moment from 'react-moment';

const Comment = ({ comment, deleteComment, auth, campgroundId }) => {
  return (
    <div key={comment._id} className="comment">
      <img src={comment.avatar} />
      {/* <i className="fas fa-user" /> */}
      <div className="comment-detail">
        <h4>{comment.name}</h4>
        <p>{comment.text}</p>
        <div className="comment-button">
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === comment.author && (
              <Fragment>
                <button
                  href="#!"
                  onClick={e => deleteComment(campgroundId, comment._id)}
                  className="btn btn-sm btn-danger">
                  Delete
                </button>
              </Fragment>
            )}
        </div>
      </div>
      <p className="time-ago">
        <Moment fromNow>{comment.createdAt}</Moment>
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(Comment);
