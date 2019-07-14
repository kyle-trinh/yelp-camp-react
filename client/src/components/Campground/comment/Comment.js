import React from 'react';
import Moment from 'react-moment';
import { deleteComment } from '../../../actions/campground';
import { connect } from 'react-redux';

const Comment = ({ comment, campgroundId, deleteComment }) => {
  return (
    <div className="comment my-2">
      <img src={comment.avatar} />
      <div className="comment-detail">
        <h4 className="comment-author">{comment.name}</h4>
        <p className="sub-text text-white">{comment.text}</p>
        <button
          onClick={e => {
            deleteComment(campgroundId, comment._id);
          }}
          className="btn btn-sm btn-danger">
          Delete
        </button>
      </div>
      <p className="sub-text text-white time-ago">
        <Moment fromNow>{comment.createdAt}</Moment>
      </p>
    </div>
  );
};

export default connect(
  null,
  { deleteComment }
)(Comment);
