import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Nav = () => (
  <div>
    <nav>
      <Link to={"/"}>
        Home
      </Link>
      <Link to={"/visreg"}>
        Run a Test
      </Link>
    </nav>
    <Outlet />
  </div>
);

export default Nav;