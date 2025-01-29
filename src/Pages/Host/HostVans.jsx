import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HostVans = () => {

    const [hostVans, setHostVans] = useState([])

    useEffect(() => {
        fetch('/api/host/vans')
            .then(res => res.json())
            .then(data => setHostVans(data.vans))
    }, [])

    const hostVanElement = hostVans.map(van => (
        <div key={van._id} className='host-vans-container'>
            <Link className='host-van-card' to={`/host/vans/${van._id}`}>
                <img src={van.images[0]} alt={`${van.name} van`} className='host-van-card-image'/>
                <div className='host-van-card-info'>
                    <h3>{van.name}</h3>
                    <p><span>&#8377;{van.basePrice}</span>/day</p>
                </div>
            </Link>
        </div>
    ))

  return (
    <div className='host-vans-page-container'>
        <h1>Your listed vans</h1>
      {hostVans.length > 0 ? hostVanElement : <h1>Loading...</h1>}
        <Link to='/host/vans/create-van' className='host-van-page-add-van-link'>+ Add new van</Link>
    </div>
  )
}

export default HostVans
