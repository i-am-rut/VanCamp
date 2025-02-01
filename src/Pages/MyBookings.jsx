import axios from 'axios'
import React, {useEffect, useState} from 'react'

const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    const displayArray = bookings.reverse()
    const dateFormat = (str) => {
        const date = str.split('T')[0].split('-')
        const newDate = `${date[2]}-${date[1]}-${date[0]}`
        return newDate
    }

    const vanCard = displayArray.map(booking => (
        <div className='my-bookings-card'>
            <div className='my-bookings-card-van-preview'>
                <img className='my-bookings-card-image' src={booking.vanId.images[0]} alt={`${booking.vanId.name} van`} />
                <div className='my-bookings-card-info-container'>
                    <h2>{booking.vanId.name}</h2>
                    <p><strong>From:</strong> {dateFormat(booking.startDate)}</p>
                    <p><strong>To:</strong> {dateFormat(booking.endDate)}</p>
                    <p><strong>Amount:</strong> &#8377;{booking.price.totalPrice}</p>
                </div>
            </div>
            <div className='my-bookings-card-status-and-actions-container'>
                <p><strong>Status:</strong> {booking.status}</p>
                <div className='my-bookings-card-buttons-container'>
                    <button className={`pay-button ${booking.status === 'Cancelled' && 'display-none'} `}>Pay Amount</button>
                    <button className={`cancel-booking-button ${booking.status === 'Cancelled' && 'display-none'} `}>Cancel booking</button>
                </div>
            </div>
        </div>
    ))
    
    
    const getUserBookings = async () => {
        try {
            const res = await axios.get('https://vancamp-backend.onrender.com/api/bookings/mybookings', {withCredentials: true})
            if (res.message === "No available bookings") {
                setBookings([])
            }
            setBookings(res.data)
        } catch (error) {
            console.log("Get user bookings error:", error.message)
        }
    }

    useEffect(() => {
        getUserBookings()
    }, [])

    // console.log("Display array ==>", displayArray)
  return (
    <div className='my-bookings-page-container'>
      <div className='my-bookings-container'>
        <div className='my-bookings-note-section'>
            <p><strong>NOTES:</strong><br />1. You can make <strong>payment</strong> till <strong>1 day before your booking start date.</strong> If you fail to do so, the <strong>booking</strong> will be automatically <strong>cancelled.</strong> <br /><br /> 2. You can <strong>cancel your bookings</strong> only <strong>till the booking start date</strong> after that bookings will not be canceled.</p>
        </div>
        <div className='my-bookings-card-container'>
            {bookings?  vanCard :<div className='my-bookings-no-bookings-case'>Looks like you have no bookings</div> }
        </div>
      </div>
    </div>
  )
}

export default MyBookings
