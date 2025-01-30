import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()

    const[regData, setRegData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        role: ''
    })
    const [message, setMessage] = useState('') 
    const [done, setDone] = useState(false)
    
    const [passwordVisible, setPasswordVisible] = useState({
        password: false,
        repassword: false
    })
    
    const validateForm = () => {
        const { name, email, password, rePassword } = regData
        if (name && email && password && rePassword && password === rePassword) {
            setMessage('')
            setDone(true)
        } else {
            setMessage('All fields are mandatory and passwords must match')
            setDone(false)
        }
    }

    const handleEyeClick = (field) => {
        setPasswordVisible(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }
    const handleRegisterClick = async (event) => {
        event.preventDefault();
    
        // Destructure regData to get individual properties
        const { name, email, password, role } = regData;
    
        // Prepare the request payload
        const payload = {
            name,
            email,
            password,
            role,
        };
    
        try {
            // Make the POST request to the backend API
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON
                },
                body: JSON.stringify(payload), // Convert the payload to JSON format
            });
    
            // Check if the response is OK
            if (response.ok) {
                const data = await response.json(); 

                if(data.message === "User successfully registered!"){
                    setMessage(`${data.message} Redirecting to Login page in 4 seconds`)
                }
                setTimeout(() => {
                    navigate('/login')
                }, 4000)
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
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setRegData(prev => {
            const updatedData = { ...prev, [name]: value }
            validateForm(updatedData) // Validate form on every change
            return updatedData
        })
    }

  return (
    <div className='signup-page-container'>
        <h1>Create a VanCamp account</h1>
      <div className='signup-form-container'>
        <form>
            <label htmlFor='reg-name'>Enter name:</label>
            <input 
                id='reg-name'
                name='name'
                value={regData.name}
                placeholder='Enter full name' 
                required
                onChange={handleInputChange}
            />
            <label htmlFor='reg-email'>Enter email:</label>
            <input 
                id='reg-email'
                name='email'
                value={regData.email}
                type='email' 
                placeholder='Email address' 
                required
                autoComplete='off'
                onChange={handleInputChange}
            />
            <label htmlFor='reg-password'>Enter password:</label>
            <div 
            className='password-input-and-eyebutton-container signup-page-password'
            >
                <input 
                    id='reg-password'
                    name='password'
                    value={regData.password}
                    type={passwordVisible.password?  "text" : "password"}  
                    placeholder='Password'
                    autoComplete='off'
                    onChange={handleInputChange}
                />
                <button onClick={(e) => {e.preventDefault(); handleEyeClick('password')}}><FaEye /></button>
            </div>
            <label htmlFor='reg-re-password'>Re-enter password:</label>
            <div 
                className='password-input-and-eyebutton-container signup-page-repassword'
            >
                <input 
                    id='reg-re-password'
                    name='rePassword'
                    value={regData.rePassword}
                    type={passwordVisible.repassword? "password" : "text"} 
                    placeholder='Re-enter password'
                    autoComplete='off'
                    onChange={handleInputChange}
                />
                <button onClick={(e) => {e.preventDefault(); handleEyeClick('repassword')}}><FaEye /></button>
            </div>
            <label 
                htmlFor='role'>Select role:</label>
            <select 
                name="role" 
                id="role" 
                value={regData.role}
                className='role-selector'
                onChange={handleInputChange}
            >
                <option defaultValue="">--Select role--</option>
                <option 
                    value="renter"
                >Renter (recommended) </option>re
                <option 
                    value="host"
                >Van Host</option>
            </select>
            {message && <div className='reg-err-msg'>{message}</div>}
            <button 
                className='register-user-button' 
                onClick={handleRegisterClick}
                disabled={!done}
            >Register</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
