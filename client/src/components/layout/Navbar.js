import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="menu">
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
          <a href="#!" className="nav-link">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
