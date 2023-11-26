// NavBar.jsx
import React from 'react';
import styles from './NavBar.module.css';
import { Outlet } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav>
        <ul className={styles.horizontalList}>
          <li><a href="/">Home</a></li>
          <li><a href="/signin">SignIn</a></li>
          <li><a href="/signup">SignUp</a></li>
          {/* Add other navigation links as needed */}
        </ul>
      </nav>
      <Outlet />
    </>

  );
};

export default NavBar;
