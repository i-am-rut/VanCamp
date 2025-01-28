import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [isVisible, setIsVisible] = useState(false)

    const [done, setDone] = useState(false)
    const [message, setMessage] = useState('')

    const validateForm = () => {
        const { email, password } = loginData
        if (email && password) {
            setDone(true)
        } else {
            setDone(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginData(prev => {
            const updatedData = { ...prev, [name]: value }
            validateForm(updatedData)
            return updatedData
        })
    }

    const handleEyeClick = (e) => {
        e.preventDefault()
        setIsVisible(prev => !prev)
    }

    console.log(loginData)
    const handleSignupClick = async (event) => {
        event.preventDefault();
    
        // Destructure regData to get individual properties
        const { email, password } = loginData;
    
        // Prepare the request payload
        const payload = {
            email,
            password
        };
    
        try {
            // Make the POST request to the backend API
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON
                },
                body: JSON.stringify(payload), // Convert the payload to JSON format
            });
    
            // Check if the response is OK
            if (response.ok) {
                const data = await response.json(); // Parse the response as JSON
                console.log('User logged in successfully:', data);
                // Handle success, e.g., show success message or redirect user
            } else {
                const errorData = await response.json(); // Parse the error response
                console.log('Error registering user:', errorData);
                // Handle error, e.g., show error message
                setMessage(errorData.message || 'Registration failed');
            }
        } catch (error) {
            console.log('Request failed:', error);
            setMessage('An error occurred during registration');
        }
    }

    return (
        <div className='login-page-container'>
            <h1>Sign in to your account</h1>
            <div className='login-form-container'>
                <form>
                    <input
                        id='login-email-input'
                        name='email'
                        value={loginData.email}
                        onChange={handleInputChange}
                        placeholder='Email address'
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
                    {message && <div className='login-err-msg'>{message}</div>}
                    <button
                        onClick={handleSignupClick}
                        className='sign-in-button'
                        disabled={!done}
                    >Sign in</button>
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
