import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../configurations/config';
import { authSelector, authSign, signUp } from '../../redux/reducers/authReducer';
import styles from './Signup.module.css';
const SignUp = () => {

    const dispatch = useDispatch();

    const { isLoggedIn, loadingAuth } = useSelector(authSelector);

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(authSign())
    }, [])
    // User is logged in so redirect to Dashboard
    useEffect(() => {
        if (!loadingAuth && isLoggedIn) {
            navigate("/dashboard");
        }
    }, []);
    //If anything changes for auth then also check if it can be redirected to Dashboard
    useEffect(() => {
        if (!loadingAuth && isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, loadingAuth]);
    // State variables for input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Event handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Accessing the values of name, email, and password
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        // Prepare the data to be sent to the API
        const formData = {
            name: name,
            email: email,
            password: password
        };
        const response= await dispatch(signUp(formData))
        //redirect to signin after success
        console.log(response.payload);
        if(response.payload.ok){
            console.log('success');
            navigate('/signin')
        }
        else{
            const msg= await response.payload.json()
            console.log(msg);
        }
    }

    return (
        <>
            <div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                    /><br />
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
                    <button type='submit'>SignUp</button>
                </form>
            </div>
        </>
    );
};

export default SignUp;
