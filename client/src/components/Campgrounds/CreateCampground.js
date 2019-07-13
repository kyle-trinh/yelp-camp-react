import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import { createCampground } from '../../actions/campground';
import { connect } from 'react-redux';
import Alert from '../layout/Alert';

const NewCampground = ({ createCampground }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    coverImage: ''
  });

  const { title, description, image, coverImage } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createCampground(formData);
    setFormData({ title: '', description: '', image: '', coverImage: '' });
    // login(email, password);
  };

  return (
    <div>
      <Navbar className="menu menu-dark" />
      <section className="container">
        <Alert />
        <h1 className="text-primary">Create a new campground</h1>

        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
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
            <input
              type="text"
              placeholder="Image"
              name="image"
              required
              value={image}
              onChange={e => onChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Cover Image"
              name="coverImage"
              required
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

export default connect(
  null,
  { createCampground }
)(NewCampground);
