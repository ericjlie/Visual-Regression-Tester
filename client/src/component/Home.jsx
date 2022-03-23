import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home = () => (

    <Link to="/visreg">
      <div className="titleWrapper">
        <span className="title">
          Visual&nbsp;
        </span>
        <span className="title2">
        Regression&nbsp;
        </span>
        <span className="title3">
        Analysis&nbsp;
        </span>
      </div>
      <div className="subtitle">AKA Website Picture Comparer </div>
      <div className="subtitle2">Click Me </div>
    </Link>

)

export default Home;