import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Vans = () => {
  const [vans, setVans] = useState([])

  useEffect(() => {fetch("/api/vans")
    .then(res => res.json())
    .then(data => setVans(data.vans))
  }, [])

  const vanElements = vans.map(van => (
    <Link to={`/vans/${van.id}`} key={van.id} className='van-card-container'>
      <img src={van.imageUrl} className='van-card-img' alt={`${van.name} van`}/>
      <div className='van-card-info'>
        <h2>{van.name}</h2>
        <p>${van.price}<span>/day</span></p>
      </div>
      <i className={`van-type ${van.type}`}>{van.type}</i>
    </Link>
  ))

  return (
    <div className='vans-list-container'>
      <h1>Explore our van options</h1>
      <div className='vans-list'>
        {vans.length > 0? vanElements: <h1>Loading...</h1>}
      </div>
    </div>
  )
}

export default Vans
