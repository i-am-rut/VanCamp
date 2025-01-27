import React from 'react'
import { FaEye } from 'react-icons/fa'

const Signup = () => {

    const handleRegisterClick = (event) => {
        event.preventDefault()
    }

  return (
    <div className='signup-page-container'>
        <h1>Create a VanCamp account</h1>
      <div className='signup-form-container'>
        <form>
            <label htmlFor='reg-name'>Enter name:</label>
            <input 
                id='reg-name'
                placeholder='Enter full name' 
                required 
            />
            <label htmlFor='reg-email'>Enter email:</label>
            <input 
                id='reg-email'
                type='email' 
                placeholder='Email address' 
                required
            />
            <label htmlFor='reg-password'>Enter password:</label>
            <div 
            className='password-input-and-eyebutton-container signup-page-password'
            >
                <input 
                    id='reg-password'
                    type='password' 
                    placeholder='Password' 
                />
                <button><FaEye /></button>
            </div>
            <label htmlFor='reg-re-password'>Re-enter password:</label>
            <div 
                className='password-input-and-eyebutton-container signup-page-repassword'
            >
                <input 
                    id='reg-re-password'
                    type='password' 
                    placeholder='Re-enter password' 
                />
                <button><FaEye /></button>
            </div>
            <label 
                htmlFor='role'>Select role:</label>
            <select 
                name="role" 
                id="role" 
                className='role-selector'
            >
                <option 
                    defaultValue="renter"
                >Renter</option>
                <option 
                    value="host"
                >Van Host</option>
            </select>
            <button 
                className='register-user-button' 
                onClick={handleRegisterClick}
            >Register</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
