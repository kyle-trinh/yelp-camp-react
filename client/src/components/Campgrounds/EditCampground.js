import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import { updateCampground, getCampground } from '../../actions/campground';
import { connect } from 'react-redux';
import Alert from '../layout/Alert';
import Spinner from '../layout/Spinner';

const EditCampground = ({
  updateCampground,
  match,
  getCampground,
  campground
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    coverImage: ''
  });

  useEffect(() => {
    getCampground(match.params.id);
  }, [getCampground, match.params.id]);

  useEffect(() => {
    setFormData({
      title: campground.loading ? '' : campground.campground.title,
      description: campground.loading ? '' : campground.campground.description,
      image: campground.loading ? '' : campground.campground.image,
      coverImage: campground.loading ? '' : campground.campground.coverImage
    });
  }, [campground]);

  const { title, description, image, coverImage } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateCampground(match.params.id, formData);
    // setFormData({ title: '', description: '', image: '', coverImage: '' });
    // login(email, password);
  };

  return campground.loading ? (
    <Spinner />
  ) : (
    <div className="form-wrapper">
      {console.log(campground)}
      <Navbar className="menu menu-dark" />
      <section className="container">
        <Alert />
        <h1 className="text-primary">Create a new campground</h1>

        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label className="lead">Title</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              required
              value={title}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="lead">Description</label>
            <input
              type="text"
              placeholder="Description"
              name="description"
              required
              value={description}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="lead">Image</label>
            <input
              type="text"
              placeholder="Image"
              name="image"
              value={image}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group">
            <label className="lead">Cover Image</label>
            <input
              type="text"
              placeholder="Cover Image"
              name="coverImage"
              value={coverImage}
              onChange={e => onChange(e)}
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  campground: state.campground.campground
});

export default connect(
  mapStateToProps,
  { updateCampground, getCampground }
)(EditCampground);
