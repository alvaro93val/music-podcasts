import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <div>
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/podcast/1">Podcast</Link>
        </li>
        <li>
          <Link to="/podcast/1/episode/1">Details Podcast</Link>
        </li>
      </ul>
    </div>
    <Outlet />
  </div>
);

export default Layout;
