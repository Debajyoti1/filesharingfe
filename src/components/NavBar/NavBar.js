// NavBar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { authSelector, signOut } from '../../redux/reducers/authReducer';
import styles from './NavBar.module.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loadingAuth } = useSelector(authSelector);
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut())
    navigate('/'); // Redirect to the home page after sign-out
  };

  return (
    <>
      <nav>
        <ul className={styles.horizontalList}>
          <li><Link to="/">Home</Link></li>
          {
            isLoggedIn ? (
              <li><Link onClick={handleSignOut}>SignOut</Link></li>
            ) : (
              <>
                <li><Link to="/signin">SignIn</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
              </>
            )
          }
          {/* Add other navigation links as needed */}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
