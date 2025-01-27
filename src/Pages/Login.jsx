import React from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'

const Login = () => {

    const handleSignupClick = (event) => {
        event.preventDefault()
    }

  return (
    <div className='login-page-container'>
        <h1>Sign in to your account</h1>
        <div className='login-form-container'>
            <form>
                <input id='login-email-input' placeholder='Email address'/>
                <div className='password-input-and-eyebutton-container'>
                    <input id='login-password-input' placeholder='Enter password'/>
                    <button><FaEye /></button>
                </div>
                <button onClick={handleSignupClick} className='sign-in-button'>Sign in</button>
            </form>
            <div className='login-page-signup-link-container'>
                <p>Don't have an account?</p>
                <Link to='/signup' className="login-page-signup-link">Create one now</Link>
            </div>
        </div>
    </div>
  )
}

export default Login
