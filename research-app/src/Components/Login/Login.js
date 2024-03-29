import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function UserLogin(event) {
        event.preventDefault();
        handleLogin(username, password);
        navigate('/');
    }

    return (
        <div className='LoginMain'>
            <h1 className='LoginH1'>Login</h1>
            <form className='LoginForm' onSubmit={UserLogin}>
                <input
                    className='loginInput'
                    onChange={(e) => setUsername(e.target.value)}
                    type='email'
                    required={true}
                    value={username}
                    placeholder="Username"
                />
                {/* <br /> */}
                <input
                    className='loginInput'
                    type='password'
                    required={true}
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='LoginButton' type='submit'>Submit</button>
            </form>
            <span className='LoginSignupText'>Not a user? <button className='LoginSignupButton' onClick={() => navigate('/signup')}>Sign up</button></span>
        </div>
    );
}
