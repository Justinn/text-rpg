import React from 'react';
import { NavLink } from 'react-router-dom';

const HorizontalBar = () => {
  return (
    <div className="horizontal-navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
        <NavLink to="/login">Login</NavLink>
        </li>
        <li>
        <NavLink to="/signup">Signup</NavLink>
          </li>
      </ul>
    </div>
  );
};

export default HorizontalBar;
