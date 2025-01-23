import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const VanDetails = () => {

    const param = useParams()
    const [van, setVan] = useState(null)

    useEffect(() => {
        fetch(`/api/vans/${param.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [param.id])

  return (
    <div className='van-details-container'>
      {van? (
        <div className='van-details'>
            <img src={van.imageUrl} alt={`${van.name} van`} className='van-detail-main-image' />
            <i className={`van-type ${van.type}`} >{van.type}</i>
            <h1>{van.name}</h1>
            <p><span className='van-price'>${van.price}</span>/day</p>
            <p className='van-description'>{van.description}</p>
            <button className='van-details-rent-btn'>Rent this van</button>
        </div>
      ) : <h1>Loading...</h1>}
    </div>
  )
}

export default VanDetails
