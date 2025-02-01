import axios from 'axios'
import React, {useEffect, useState} from 'react'

const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    // const vanCard = <div className='my-booking-card'>
    //     <p><strong></strong></p>
    // </div>
    
    const getUserBookings = async () => {
        try {
            const res = await axios.get('https://vancamp-backend.onrender.com/api/bookings/renter')
            if (res.message === "No available bookings") {
                setBookings([])
            }
            console.log("Response => ",res)
        } catch (error) {
            console.log("Get user bookings error:", error.message)
        }
    }

    useEffect(() => {
        getUserBookings()
    }, [])

    console.log("Bookings ==>", bookings)
  return (
    <div className='my-bookings-page-container'>
      <div className='my-bookings-container'>
        <div className='my-bookings-note-section'>
            <p><strong>NOTES:</strong><br />1. You can make <strong>payment</strong> till <strong>1 day before your booking start date.</strong> If you fail to do so, the <strong>booking</strong> will be automatically <strong>canceled.</strong> <br /><br /> 2. You can <strong>cancel your bookings</strong> only <strong>till the booking start date</strong> after that bookings will not be canceled.</p>
        </div>
        {/* {bookings? <div className='my-bookings-no-bookings-case'>Looks like you have no bookings</div>:"b" } */}
      </div>
    </div>
  )
}

export default MyBookings
