import React, { useState } from 'react';
import {API_URL} from '../../configurations/config'
import styles from './Signup.module.css'
const SignUp = () => {
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

        try {
            // Make a POST request to your API endpoint
            const response = await fetch(API_URL+'/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
                body: JSON.stringify(formData),
            });

            // Check if the request was successful
            if (response.ok) {
                console.log('SignUp successful!');
                // You can handle the successful login here
            } else {
                console.error('SignUp failed.');
                // You can handle the failed login here
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle any network or API errors here
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
