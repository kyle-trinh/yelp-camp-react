import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { deleteComment, addComment } from '../../actions/campground';
import Alert from '../layout/Alert';
import Moment from 'react-moment';

const CommentList = ({
  comments,
  deleteComment,
  addComment,
  campgroundId,
  auth
}) => {
  const [text, setText] = useState('');
  return (
    <Fragment>
      <section className="comment-section">
        <Alert />
        <div className="comment-action">
          <form
            className="form"
            onSubmit={e => {
              e.preventDefault();
              addComment(campgroundId, { text });
              setText('');
            }}>
            <div className="form-group">
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                name="text"
                placeholder="Create a comment"
                required>
                asdsad
              </textarea>
            </div>

            <input type="submit" className="btn btn-invert" value="submit" />
          </form>

          {/* <a href="#!" className="btn btn-primary">
            Add a comment
          </a> */}
        </div>

        <div className="comment-group">
          {comments.map(comment => (
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
                          onClick={e =>
                            deleteComment(campgroundId, comment._id)
                          }
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
          ))}
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment, addComment }
)(CommentList);
