import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
// useNavigate
const HostVanDetails = () => {

    const param = useParams()
    const [hostVan, setHostVan] = useState(null)
    // const navigate = useNavigate()
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    };
    
    useEffect(() => {
        const getVan = async () => {
          try {
            const response = await fetch(`https://vancamp-backend.onrender.com/api/vans/${param.id}`, { method: "GET" })
    
            if (response.ok) {
              const data = await response.json()
              setHostVan(data)
            } else {
              const errorData = await response.json()
              console.log('Error:-', errorData)
            }
          } catch (error) {
            console.log('Request failed:', error)
          }
        }
        getVan()
      }, [param.id])

    //   const handleEditVan = async() => {
    //     try {
    //         const res = await axios.patch(`http://localhost:5000/api/vans/edit/${param.id}`, {withCredentials: true})
    //         console.log(res)
    //         // navigate('..')
    //     } catch (error) {
            
    //     }
    //   }

      const handleDeleteVan = async() => {
        try {
            const res = await axios.delete(`https://vancamp-backend.onrender.com/api/vans/${param.id}`, {withCredentials: true})
            console.log(res.message)
            // navigate('..')
        } catch (error) {
            
        }
      }


  return (
    <div className='host-van-details-page-container'>
        <Link to='..' relative='path' className='back-nav-link'>&#8592; Back to all vans</Link>
        {hostVan? 
            (
                <div className='host-van-details-container'>
                    <div className='host-van-details-preview'>
                        <img src={hostVan.images[0]} alt={`${hostVan.name} van`} className='host-van-details-image' />
                        <div className='host-van-details-info'>
                            <i className={`van-type ${hostVan.category}`}>{hostVan.category}</i>
                            <h2>{hostVan.name}</h2>
                            <p><span className='price'>&#8377;{hostVan.basePrice}</span>/day</p>
                        </div>
                    </div>
                    <nav className='host-van-details-navbar-container'>
                        <NavLink 
                            to='.'
                            end
                            className='sub-navbar-elem'
                            style={({ isActive }) => (isActive ? activeStyles : null)}
                        >Details</NavLink>
                        <NavLink 
                            to='price'
                            className='sub-navbar-elem'
                            style={({ isActive }) => (isActive ? activeStyles : null)}
                        >Pricing</NavLink>
                        <NavLink 
                            to='photos'
                            className='sub-navbar-elem'
                            style={({ isActive }) => (isActive ? activeStyles : null)}
                        >Photos</NavLink>
                    </nav>
                    <Outlet context={hostVan} />
                    <div className='van-buttons-container'>
                        <Link 
                            className='edit-van-button'
                            to={`/host/vans/edit/${param.id}`}
                        >Edit van</Link>
                        <button 
                            className='delete-van-button'
                            onClick={handleDeleteVan}
                        >Delete van</button>
                    </div>
                </div> 
            ) : <h1>Loading...</h1>}        
    </div>
  )
}

export default HostVanDetails
