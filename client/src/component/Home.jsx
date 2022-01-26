import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home = () => (
  <div>
    Home Page
    <Link to="/visreg">
      Click Here to Start a Test
    </Link>
  </div>
)

export default Home;