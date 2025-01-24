import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'

const HostVanDetails = () => {

    const param = useParams()
    const [hostVan, setHostVan] = useState(null)
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    };
    
    useEffect(() => {
        fetch(`/api/host/vans/${param.id}`)
            .then(res => res.json())
            .then(data => setHostVan(data.vans[0]))
    }, [param.id])


  return (
    <div className='host-van-details-page-container'>
        <Link to='..' relative='path' className='back-nav-link'>&#8592; Back to all vans</Link>
        {hostVan? 
            (
                <div className='host-van-details-container'>
                    <div className='host-van-details-preview'>
                        <img src={hostVan.imageUrl} alt={`${hostVan.name} van`} className='host-van-details-image' />
                        <div className='host-van-details-info'>
                            <i className={`van-type ${hostVan.type}`}>{hostVan.type}</i>
                            <h2>{hostVan.name}</h2>
                            <p><span className='price'>${hostVan.price}</span>/day</p>
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
                </div> 
            ) : <h1>Loading...</h1>}        
    </div>
  )
}

export default HostVanDetails
