import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <nav className={props.className} id={props.id}>
      <i className="fas fa-air-freshener" />
      <ul className="menu-nav">
        <li className="nav-item">
          <a href="#!" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <Link to="/campground" className="nav-link">
            Campgrounds
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
