import React, { useContext, useRef } from 'react'
import './Login.css'
import api from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import { Link } from "react-router-dom";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        api.login({ email: email.current.value, password: password.current.value }, dispatch)
    }

    return (
        <div className="login-container">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h1 className="loginLogo">Be_Social</h1>
                    <span className="loginDesc">Connect with frineds and world around you on Be_Social</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox">
                        <input ref={email} type="email" className="loginInput" />
                        <input ref={password} type="password" className="loginInput" />
                        <button onClick={handleSubmit} type="submit" className="loginBtn" disabled={isFetching}>
                            {isFetching ? <CircularProgress color="primary" size="20px" /> : "Log In"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button type="button" className="loginBtnRegister" disabled={isFetching}>
                            <Link style={{ textDecoration: "none", color: "white" }} to="/register">
                                Create a new account
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
