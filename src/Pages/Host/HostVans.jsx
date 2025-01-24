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
        <div key={van.id} className='host-vans-container'>
            <Link className='host-van-card' to={`/host/vans/${van.id}`}>
                <img src={van.imageUrl} alt={`${van.name} van`} className='host-van-card-image'/>
                <div className='host-van-card-info'>
                    <h3>{van.name}</h3>
                    <p><span>${van.price}</span>/day</p>
                </div>
            </Link>
        </div>
    ))

  return (
    <div className='host-vans-page-container'>
        <h1>Your listed vans</h1>
      {hostVans.length > 0 ? hostVanElement : <h1>Loading...</h1>}
    </div>
  )
}

export default HostVans
