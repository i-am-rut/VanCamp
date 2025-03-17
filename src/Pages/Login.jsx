import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import {AuthContext} from '../Utils/AuthProvider'

const Login = () => {
    const {login} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState('')
    const original = location.state?.from || "/"

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleEyeClick = (e) => {
        e.preventDefault()
        setIsVisible(prev => !prev)
    }

    const handleLoginClick = async (event) => {
        event.preventDefault();
        try {
            
            await login(loginData.email, loginData.password)
            navigate(original, {replace: true})

        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div className='login-page-container'>
            {original !== "/" && <p style={{fontWeight: "bold", color: "red"}}>You must login first</p>}
            <h1>Sign in to your account</h1>
            <div className='login-form-container'>
                <form>
                    <input
                        id='login-email-input'
                        name='email'
                        value={loginData.email}
                        onChange={handleInputChange}
                        placeholder='Email address'
                        autoComplete='off'
                    />
                    <div className='password-input-and-eyebutton-container'>
                        <input
                            id='login-password-input'
                            type={isVisible ? 'text' : 'password'}
                            name='password'
                            value={loginData.password}
                            onChange={handleInputChange}
                            placeholder='Enter password' />
                        <button onClick={handleEyeClick}><FaEye /></button>
                    </div>
                    <div className='login-err-msg-container'>{message && <div className='login-err-msg'>{message}</div>}</div>
                    <button
                        onClick={handleLoginClick}
                        className='sign-in-button'
                    >Log in</button>
                </form>
                <div className='login-page-signup-link-container'>
                    <p>Don't have an account?</p>
                    <Link to='/signup' state={ {from : original} } className="login-page-signup-link">Create one now</Link>
                </div>
            </div>
        </div>
    )
}

export default Login