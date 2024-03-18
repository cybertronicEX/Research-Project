import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Signup({ handleSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function UserSignup(event) {
        event.preventDefault();
        try {
            const response = await Axios.post('http://localhost:3001/newUser', {
                name: username,
                age: 0,
                email: email,
                password: password,
            });
            if (response.status === 200) {
                // Handle successful signup
                alert("User created! please log in");
                console.log('User created successfully:', response.data);
                navigate('/login'); // Redirect to login page
            } else {
                // Handle error response
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    }

    return (
        <div className='SignupMain'>
            <h1 className='SignupH1'>Sign Up</h1>
            <form className='SignupForm' onSubmit={UserSignup}>
                <input
                    className='signupInput'
                    type='text'
                    required={true}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='name'
                />
                <br />
                <input
                    className='signupInput'
                    type='email'
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />
                <br />
                <input
                    className='signupInput'
                    type='password'
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <br />
                {error && <p className='ErrorMessage'>{error}</p>}
                <button className='SignupButton' type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

