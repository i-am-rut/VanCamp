import React, { useContext } from 'react'
import { AuthContext } from '../Utils/AuthProvider'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthLayout = () => {
    const { user } = useContext(AuthContext)
    const location = useLocation()

    if(user) {
        return <Outlet />
    } else {
        return <Navigate to='/login' state={{from: location.pathname}} replace={true} />
    }

}

export default AuthLayout
