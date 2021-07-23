import React, { useRef } from 'react'
import {useHistory} from 'react-router-dom'

import './Register.css'
import api from '../../apiCalls'

export default function Register() {
    const history = useHistory();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.current.value !== passwordAgain.current.value) {
            password.current.setCustomValidity("password dont match")
        }
        else {
            api.register({
                'username': username.current.value,
                'email': email.current.value,
                'password': password.current.value,

            })

            history.push("/login");
        }
    }


    return (
        <div className="register-container">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h1 className="registerLogo">Be_Social</h1>
                    <span className="registerDesc">Connect with frineds and world around you on Be_Social</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox">
                        <input ref={username} required type="text" placeholder="User Name" className="registerInput" />
                        <input ref={email} required type="email" placeholder="Email Id" className="registerInput" />
                        <input ref={password} required type="password" placeholder="Password" className="registerInput" />
                        <input ref={passwordAgain} required type="password" placeholder="Password Again" className="registerInput" />
                        <button type="submit" onClick={handleSubmit} className="registerBtn">Register</button>
                        <button type="button" className="registerBtnRegister">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
