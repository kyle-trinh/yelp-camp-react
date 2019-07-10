import React, { Fragment } from 'react';

const Navbar = () => {
  return (
    <Fragment>
      <nav
        className={
          window.location.pathname === '/login' ||
          window.location.pathname === '/register'
            ? 'menu-dark menu'
            : 'menu'
        }>
        {console.log(window.location.pathname)}
        <a href="#!">
          <i className="fas fa-air-freshener" />
        </a>
        <ul className="menu-nav">
          <li className="nav-item">
            <a href="#!" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#!" className="nav-link">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a href="#!" className="nav-link">
              Register
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
