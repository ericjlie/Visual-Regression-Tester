import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Nav = () => (
  <div>
  <div className="navbar">
    <nav className="nav">
      <Link to={"/"} >
      <i className="home fa fa-home"></i>
      </Link>
    </nav>

  </div>
  <Outlet />
  </div>
);

export default Nav;