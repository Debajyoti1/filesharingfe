import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, authSign, signIn } from '../../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../Loader/Loader'
const Signin = () => {
  // State variables for input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { isLoggedIn, loadingAuth } = useSelector(authSelector);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authSign())
  }, [])

  useEffect(() => {
    if (!loadingAuth && isLoggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!loadingAuth && isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, loadingAuth]);


  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Accessing the values of name, email, and password
    console.log('Email:', email);
    console.log('Password:', password);

    // Prepare the data to be sent to the API
    const formData = {
      email: email,
      password: password
    };
    dispatch(signIn(formData))
  }

  return (
    <>
      <div>
        {loadingAuth || isLoggedIn ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            /><br />
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            /><br />
            <button type='submit'>SignIn</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Signin;
