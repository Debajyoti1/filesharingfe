// NavBar.jsx
import React from 'react';
import styles from './NavBar.module.css';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';

const NavBar = () => {
  const {isLoggedIn} = useSelector(authSelector)
  const dispatch=useDispatch()
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
