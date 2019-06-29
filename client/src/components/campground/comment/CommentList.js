import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { deleteComment, addComment } from '../../actions/campground';
import Alert from '../layout/Alert';
import Moment from 'react-moment';
import Comment from './Comment';

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
            <Comment comment={comment} />
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
