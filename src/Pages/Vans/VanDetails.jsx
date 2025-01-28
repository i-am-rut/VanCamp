import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const VanDetails = () => {

    const param = useParams()
    const [van, setVan] = useState(null)

    const getVan = async() => {
        try{
          const response = await fetch(`http://localhost:5000/api/vans/${param.id}`,{method: "GET"})
    
          if(response.ok) {
            const data = await response.json()
            setVan( data)
          } else {
            const errorData = await response.json()
            console.log('Error:-', errorData)
          }
        } catch (error) {
          console.log('Request failed:', error)
        }
      }
      
      useEffect(() => {
        getVan()
      }, [param.id])

  return (
    <div className='van-details-container'>
      <Link to='..' relative='path' className='back-nav-link van-details-backnav'>&#8592; Back to all vans</Link>
      {van? (
        <div className='van-details'>
            <img src={van.images[0]} alt={`${van.name} van`} className='van-detail-main-image' />
            <i className={`van-type ${van.type}`} >{van.type}</i>
            <h1>{van.name}</h1>
            <p><span className='van-price'>₹{van.price}</span>/day</p>
            <p className='van-description'>{van.description}</p>
            <button className='van-details-rent-btn'>Rent this van</button>
        </div>
      ) : <h1>Loading...</h1>}
    </div>
  )
}

export default VanDetails
