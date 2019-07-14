import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ className, logout, auth: { isAuthenticated, loading } }) => {
  const [closeBtn, setCloseBtn] = useState(false);

  const authLinks = (
    <ul className="menu-nav">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={logout}>
          Logout{' '}
          <i style={{ fontSize: '1.8rem' }} className="fas fa-sign-out-alt" />
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className={closeBtn ? 'menu-nav show' : 'menu-nav'}>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav className={className}>
        <Link to="/">
          <i className="fas fa-air-freshener" />
        </Link>
        {!loading ? (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        ) : null}
        <div
          className={closeBtn ? 'menu-btn close' : 'menu-btn'}
          onClick={() => {
            setCloseBtn(!closeBtn);
          }}>
          <div className="btn-line" />
          <div className="btn-line" />
          <div className="btn-line" />
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
