import React from 'react'
import './Login.css'

export default function Login() {
    return (
        <div className="login-container">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className="loginLogo">Be_Social</h1>
                    <span className="loginDesc">Connect with frineds and world around you on Be_Social</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="email" className="loginInput" />
                        <input type="password" className="loginInput" />
                        <button className="loginBtn">Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginBtnRegister">Create a new account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
