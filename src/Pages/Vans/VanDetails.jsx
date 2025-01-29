import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaShuttleVan } from "react-icons/fa";


const VanDetails = () => {

  const param = useParams()
  const [van, setVan] = useState(null)
  const [formError, setFormError] = useState('')
  const [done, setDone] = useState(false)
  const [availability, setAvailability] = useState({
    fromDate: '',
    tillDate: ''
  })
  const [message, setMessage] = useState('')

  
  const dateConverter = (date) => {
    const parts = date.split('-')
    const newDate = `${parts[2]}-${parts[1]}-${parts[0]}`
    return newDate
  }
  
  useEffect(() => {
    const getVan = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/vans/${param.id}`, { method: "GET" })
        
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
  
  useEffect(() => {
    const ValidateForm = () => {
      const { fromDate, tillDate } = availability
      const today = new Date()
      const fromDateObj = new Date(fromDate)
      const tillDateObj = new Date(tillDate)
  
      if (fromDateObj >= today && tillDateObj >= fromDateObj) {
        setDone(true)
        setFormError('')
      } else {
        setDone(false)
        setFormError('From date cannot be in the past or after the till date.')
      }
    }
    if (availability.fromDate && availability.tillDate) {
      ValidateForm()
    }
  }, [availability])


  const handleCheckButton = async (e) => {
    e.preventDefault()
    
    if (!done) {
      return
    }

    try {

      const response = await fetch(`http://localhost:5000/api/bookings/availability/${param.id}?fromDate=${availability.fromDate}&tillDate=${availability.tillDate}`)

      if (response.ok) {
        const data = await response.json()
        if(data.available === true) {
          setMessage(`This van is available for booking between ${dateConverter(availability.fromDate)} and ${dateConverter(availability.tillDate)}`)
        }
      } else {
        const errorData = await response.json()
        setFormError('Failed to check availability. Please try again later.')
        setMessage(errorData.message)
      }
    } catch (error) {
      setFormError('An error occurred while checking availability.')
      console.error('Error:', error)
    } finally {
      setDone(false)
    }
  }

  return (
    <div className='van-details-container'>
      <Link to='..' relative='path' className='back-nav-link van-details-backnav'>&#8592; Back to all vans</Link>
      {van ? (
        <div className='van-details'>
          <img src={van.images[0]} alt={`${van.name} van`} className='van-detail-main-image' />
          <i className={`van-type ${van.type}`} >{van.type}</i>
          <h1>{van.name}</h1>
          <p><span className='van-price'>&#8377;{van.basePrice}</span>/day</p>
          <p className='van-description'>{van.description}</p>
          {van.insuranceDetails && <p><strong>Insurance: </strong> {van.insuranceDetails}</p>}
          <form className='van-details-check-availability-form'>
            <h4 className='check-availability-title'>Check availability:</h4>
            <div className='from-date-container'>
              <label htmlFor="check-availability-from-date">From date:</label>
              <input
                id='check-availability-from-date'
                type='date'
                name='fromDate'
                value={availability.fromDate}
                onChange={(e) => setAvailability(prev => ({ ...prev, fromDate: e.target.value }))} />
            </div>
            <div className='till-date-container'>
              <label htmlFor="check-availability-till-date">Till date:</label>
              <input
                id='check-availability-till-date'
                type='date'
                name='tillDate'
                value={availability.tillDate}
                onChange={(e) => setAvailability(prev => ({ ...prev, tillDate: e.target.value }))} />
            </div>
            <div className='check-availability-form-error'>{formError}</div>
            <button
              className='check-availability-button'
              disabled={!done}
              onClick={handleCheckButton}
            >Check availability</button>
          </form>
          {message && <h4>{message}</h4>}
          <button className='van-details-rent-btn'>Rent this van <FaShuttleVan /></button>
        </div>
      ) : <h1>Loading...</h1>}
    </div>
  )
}

export default VanDetails
