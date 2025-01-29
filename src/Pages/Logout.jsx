import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    const logout = async() => {
        try{
          const response = await fetch("http://localhost:5000/api/auth/logout",{method: "GET"})
    
          if(response.ok) {
            const data = await response.json()
            setData(data)
          } else {
            const errorData = await response.json()
            console.log('Error:-', errorData)
          }
        } catch (error) {
          console.log('Request failed:', error)
        } finally {
            localStorage.removeItem('token')
            navigate('/login')
        }
      }
      logout()
  return (
    <div>
      <h1>{data && data.message}</h1>
    </div>
  )
}

export default Logout
