import React from 'react';
import Moment from 'react-moment';

const Comment = ({ comment }) => {
  return (
    <div className="comment my-2">
      <img src={comment.avatar} />
      <div className="comment-detail">
        <h4 className="comment-author">{comment.name}</h4>
        <p className="sub-text text-white">{comment.text}</p>
        <button className="btn btn-sm btn-danger">Delete</button>
      </div>
      <p className="sub-text text-white time-ago">
        <Moment fromNow>{comment.createdAt}</Moment>
      </p>
    </div>
  );
};

export default Comment;
