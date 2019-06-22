import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const Login = () => {
  return (
    <div>
      <Navbar className="menu" id="menu-dark" />
      <section className="container">
        <h1 className="text-primary">Sign in</h1>
        <p className="lead">
          {' '}
          <i className="fas fa-user" /> Sign into your account{' '}
        </p>
        <form className="form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Login" />
        </form>

        <p className="lead">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
