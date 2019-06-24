import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/campground';
import Alert from '../layout/Alert';

const CommentList = ({ comments, deleteComment, postId }) => {
  return (
    <Fragment>
      <section className="comment-section">
        <div className="comment-action">
          <a href="#!" className="btn btn-primary">
            Add a comment
          </a>
        </div>
        <Alert />
        <div className="comment-group">
          {comments.map(comment => (
            <div key={comment._id} className="comment">
              <i className="fas fa-user" />
              <div className="comment-detail">
                <h4>{comment.name}</h4>
                <p>{comment.text}</p>
                <div className="comment-button">
                  <a href="#!" className="btn btn-sm btn-invert">
                    Edit
                  </a>
                  <a
                    onClick={e => deleteComment(postId, comment._id)}
                    href="#!"
                    className="btn btn-sm btn-danger">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default connect(
  null,
  { deleteComment }
)(CommentList);
