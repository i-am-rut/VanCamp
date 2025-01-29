import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const Booking = () => {
    const param = useParams()
    const [van, setVan] = useState(null)
    const [message, setMessage] = useState('')
    const [bookingInfo, setBookingInfo] = useState({
        fromDate: '',
        tillDate: '',
        renterContact: ''
    })

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
          } finally {
            setMessage('Got the van')
          }
        }
        getVan()
    }, [param.id])
    




    return (
        <div className='van-booking-page-container'>
            <h1>Add booking Details:</h1>
            <div className='van-booking-container'>
                <div className='van-preview-card-container'>
                    {van && <div className='van-preview-card'>
                        <img className='booking-preview-image' src={van.images[0]} alt={`${van.name} Van`}/>
                        <div className='booking-van-preview-info'>
                            <h2>{van.name}</h2>
                            <p><strong>&#8377;{van.basePrice}</strong>/day</p>
                        </div>
                    </div>}
                </div>
                    <form className='booking-form'>
                        <div className='from-date-container'>
                            <label htmlFor="booking-from-date">From date:</label>
                            <input
                                id='booking-from-date'
                                type='date'
                                name='fromDate'
                                value={bookingInfo.fromDate}
                                onChange={(e) => setBookingInfo(prev => ({ ...prev, fromDate: e.target.value }))} />
                        </div>
                        <div className='till-date-container'>
                            <label htmlFor="booking-till-date">Till date:</label>
                            <input
                                id='booking-till-date'
                                type='date'
                                name='tillDate'
                                value={bookingInfo.tillDate}
                                onChange={(e) => setBookingInfo(prev => ({ ...prev, tillDate: e.target.value }))} />
                        </div> 
                        <div className='contact-number-container'>
                            <label>Contact number:</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="renterContact"
                                value={bookingInfo.renterContact} 
                                pattern="[1-9][0-9]{9}" 
                                required 
                                inputMode='numeric'
                                placeholder='Contact number for van host'
                                onChange={(e) => setBookingInfo(prev => ({...prev, renterContact: e.target.value}))} />
                        </div>
                    </form>
                    {message && <h4 className='booking-error-message'>{message}</h4>}
            </div>
        </div>
    )
}

export default Booking
