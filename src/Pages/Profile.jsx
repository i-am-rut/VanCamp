import React, { useContext } from 'react'
import { AuthContext } from '../Utils/AuthProvider'

const Profile = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='profile-page-container'>
            <h1>Profile</h1>
            <div className='profile-container'>
                <div className='profile'>
                    <p><strong>Name: </strong> {user.name}</p>
                    <p><strong>email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <button className='edit-profile-button'>Add info / edit profile</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
