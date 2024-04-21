import './loginScreen.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginImg from '../assets/LoginBG.png';
import Logo from '../assets/Logo.png';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTeacherLogin = () => {
        navigate('/teacherPage');
    };

    const handleStudentLogin = () => {
        navigate('/studentPage');
    };

    return (
        // <div>
        //     Login
        //     <input
        //         type="text"
        //         placeholder="Username"
        //         value={username}
        //         onChange={handleUsernameChange}
        //     />
        //     <input
        //         type="password"
        //         placeholder="Password"
        //         value={password}
        //         onChange={handlePasswordChange}
        //     />
        //     <button onClick={handleTeacherLogin}>Teacher Login</button>
        //     <button onClick={handleStudentLogin}>Student Login</button>
        // </div>

        <div className='login_Container'>
            <div className="login_Screen">
                <div className='login_left'>
                    <img src={LoginImg} alt='Login Image' />
                </div>
                <div className='login_right'>
                    <div className='login_form_container'>
                        <h1 className='app_name'>Minerva</h1>
                        <img src={Logo} className='logoImg' alt='Logo' />
                        <h1 className='welcome_msg'> Welcome back! 👋</h1>
                        <div className='form_container'>
                            <input
                                className='input_username'
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <input
                                className='input_password'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />        
                            <button className="login_button" onClick={handleStudentLogin} >Student Login</button>
                            <button className="login_button" onClick={handleTeacherLogin} >Teacher Login</button>
                            <p className='signup_text'> Don't have an account? <span> Sign Up </span> here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
