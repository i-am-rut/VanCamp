import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const Vans = () => {
  const [vans, setVans] = useState([])
  const [searchParams, setSearchparams] = useSearchParams()

  const typeFilter = searchParams.get("type")
  
  

  useEffect(() => {fetch("/api/vans")
    .then(res => res.json())
    .then(data => setVans(data.vans))
  }, [])


  const vanElements = vans.map(van => (
    <div key={van.id} className='van-card-container'>
      <Link to={`/vans/${van.id}`}>
        <img src={van.imageUrl} className='van-card-img' alt={`${van.name} van`}/>
        <div className='van-card-info'>
          <h2>{van.name}</h2>
          <p><span>${van.price}</span>/day</p>
        </div>
        <i className={`van-type ${van.type}`}>{van.type}</i>
      </Link>
    </div>
  ))

  const vanTypes = [...new Set(vans.map(van => van.type))]
  const typeFilterButtons = vanTypes.map(type => 
    <div key={type} className='filter-buttons-container'>
      <button 
        className={`van-type ${typeFilter === type && type} filter-button`}
        onClick={() => setSearchparams({type: type})}
      >{type}</button>
    </div>
  )

  return (
    <div className='vans-list-container'>
      <h1>Explore our van options</h1>
      {typeFilterButtons}
      {typeFilter && 
        <button 
          className='van-type filter-button'
          onClick={() => setSearchparams({})}
        >Clear filter</button>}
      <div className='vans-list filter-button'>
        {vans.length > 0? vanElements: <h1>Loading...</h1>}
      </div>
    </div>
  )
}

export default Vans
