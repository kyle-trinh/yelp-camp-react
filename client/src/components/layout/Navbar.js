import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  className,
  id
}) => {
  const authLinks = (
    <ul className="menu-nav">
      {/* <li className="nav-item">
        
        <a href="#campground" className="nav-link">
          Campgrounds
        </a>
      </li> */}
      <li className="nav-item">
        <a onClick={logout} href="#!" className="nav-link">
          <i style={{ fontSize: '1.2rem' }} className="fas fa-sign-out-alt" />{' '}
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="menu-nav">
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
    <nav className={className} id={id}>
      <Link to="/" style={{ color: 'white' }}>
        <i className="fas fa-air-freshener" />
      </Link>

      {!loading ? (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      ) : null}
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
