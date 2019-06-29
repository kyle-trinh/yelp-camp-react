import React, { Fragment } from 'react';
import Moment from 'react-moment';

const Comment = ({ comment }) => {
  return (
    <div key={comment._id} className="comment">
      <i className="fas fa-user" />
      <div className="comment-detail">
        <h4>{comment.name}</h4>
        <p>{comment.text}</p>
        <div className="comment-button">
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === comment.author && (
              <Fragment>
                <a href="#!" className="btn btn-sm btn-invert">
                  Edit
                </a>
                <a
                  href="#!"
                  onClick={e => deleteComment(campgroundId, comment._id)}
                  className="btn btn-sm btn-danger">
                  Delete
                </a>
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

export default Comment;
