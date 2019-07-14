import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import Alert from '../layout/Alert';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-wrapper">
      <Navbar className="menu menu-dark" />
      <section className="container">
        <Alert />
        <h1 className="text-primary">Register</h1>
        <p className="lead">
          {' '}
          <i className="fas fa-user" /> Please fill this information{' '}
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              value={name}
              onChange={e => onChange(e)}
              type="text"
              placeholder="Name"
              name="name"
            />
          </div>
          <div className="form-group">
            <input
              value={email}
              onChange={e => onChange(e)}
              type="email"
              placeholder="Email address"
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              value={password}
              onChange={e => onChange(e)}
              type="password"
              placeholder="Password"
              name="password"
              //   minLength="6"
            />
          </div>
          <div className="form-group">
            <input
              value={password2}
              onChange={e => onChange(e)}
              type="password"
              placeholder="Password"
              name="password2"
              //   minLength="6"
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
