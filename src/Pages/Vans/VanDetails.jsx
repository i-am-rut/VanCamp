import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FaShuttleVan } from "react-icons/fa";


const VanDetails = () => {

  const param = useParams()
  const [van, setVan] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getVan = async () => {
      try {
        const response = await fetch(`https://vancamp-backend.onrender.com/api/vans/${param.id}`, { method: "GET" })

        if (response.ok) {
          const data = await response.json()
          setVan(data)
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


  return (
    <div className='van-details-container'>
      <Link to='..' relative='path' className='back-nav-link van-details-backnav'>&#8592; Back to all vans</Link>
      {van ? (
        <div className='van-details'>
          <img src={van.images[0]} alt={`${van.name} van`} className='van-detail-main-image' />
          <i className={`van-type ${van.type}`} >{van.type}</i>
          <h1>{van.name}</h1>
          <p><span className='van-price'>&#8377;{van.basePrice}</span>/day</p>
          <p><strong>City: </strong>{van.location}</p>
          <p><strong>Host: </strong>{van.hostName? van.hostName : van.hostId}</p>
          <p className='van-description'>{van.description}</p>
          {van.insuranceDetails && <p><strong>Insurance: </strong> {van.insuranceDetails}</p>}
          <button
            className='van-details-rent-btn'
            onClick={() => navigate(`/booking/${van._id}`)}>Rent this van <FaShuttleVan /></button>
        </div>
      ) : <h1>Loading...</h1>}
    </div>
  )
}

export default VanDetails
