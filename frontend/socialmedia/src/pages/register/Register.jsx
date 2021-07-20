import React from 'react'
import './Register.css'

export default function Register() {
    return (
        <div className="register-container">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h1 className="registerLogo">Be_Social</h1>
                    <span className="registerDesc">Connect with frineds and world around you on Be_Social</span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <input type="text" placeholder="User Name" className="registerInput" />
                        <input type="email" placeholder="Email Id" className="registerInput" />
                        <input type="password" placeholder="Password" className="registerInput" />
                        <input type="password" placeholder="Password Again" className="registerInput" />
                        <button className="registerBtn">Register</button>
                        <button className="registerBtnRegister">Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
