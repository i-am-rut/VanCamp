import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Booking = () => {
    const param = useParams() 
    const navigate = useNavigate() 
    const [van, setVan] = useState(null)
    const [message, setMessage] = useState('')
    const [done, setDone] = useState(true)
    const [error, setError] = useState('')
    const [availability, setAvailability] = useState({
        fromDate: '',
        tillDate: '',
        renterContact: ''
    })
    const bookingInfo = {
        vanId: param.id,
        fromDate: availability.fromDate,
        tillDate: availability.tillDate,
        renterContact: availability.renterContact,
        addOns: []
    }

    const dateConverter = (date) => {
        const parts = date.split('-')
        const newDate = `${parts[2]}-${parts[1]}-${parts[0]}`
        return newDate
    }


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
            } finally {
                setMessage('Got the van')
            }
        }
        getVan()
    }, [param.id])
    useEffect(() => {
        if (!availability.renterContact || availability.renterContact.length < 10) {
            setDone(false)
        }
        setDone(true)
    }, [availability])

    const handleCheckAvailability = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`https://vancamp-backend.onrender.com/api/bookings/availability/${param.id}?fromDate=${availability.fromDate}&tillDate=${availability.tillDate}`)
            if (res.data.available === true) {
                setMessage(`This van is available for booking between ${dateConverter(availability.fromDate)} and ${dateConverter(availability.tillDate)} preceed to book the van below`)
                setDone(false)
            }
            if (res.data.available === false) {
                setMessage('Van is already booked around selected dates')
                setDone(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleBookVan = async() => {
        const { vanId, fromDate, tillDate, renterContact } = bookingInfo

        try {
            const res = await axios.post('https://vancamp-backend.onrender.com/api/bookings/create', {
                vanId,
                startDate: fromDate,
                endDate: tillDate,
                renterContact,
                addOns: []
            })
            setMessage(`${res.message} Redirecting to your bookings in 3 seconds.`)
            setTimeout(() => {
                navigate('/my-bookings')
            }, 3000)
        } catch (error) {
            setError(error.message)
        }

    }

    return (
        <div className='van-booking-page-container'>
            <h1>Add booking Details:</h1>
            <div className='van-booking-container'>
                <div className='van-preview-card-container'>
                    {van && <div className='van-preview-card'>
                        <img className='booking-preview-image' src={van.images[0]} alt={`${van.name} Van`} />
                        <div className='booking-van-preview-info'>
                            <h2>{van.name}</h2>
                            <p><strong>&#8377;{van.basePrice}</strong>/day</p>
                        </div>
                    </div>}
                </div>
                <form className='booking-form'>
                    <label className='booking-form-title'>Check Van Availability:</label>
                    <div className='from-date-container'>
                        <label htmlFor="booking-from-date">From date:</label>
                        <input
                            id='booking-from-date'
                            type='date'
                            name='fromDate'
                            value={availability.fromDate}
                            onChange={(e) => setAvailability(prev => ({ ...prev, fromDate: e.target.value }))} />
                    </div>
                    <div className='till-date-container'>
                        <label htmlFor="booking-till-date">Till date:</label>
                        <input
                            id='booking-till-date'
                            type='date'
                            name='tillDate'
                            value={availability.tillDate}
                            onChange={(e) => setAvailability(prev => ({ ...prev, tillDate: e.target.value }))} />
                    </div>
                    <div className='contact-number-container'>
                        <label>Contact number:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="renterContact"
                            value={availability.renterContact}
                            pattern="[1-9][0-9]{9}"
                            required
                            inputMode='numeric'
                            placeholder='Contact number for van host'
                            onChange={(e) => setAvailability(prev => ({ ...prev, renterContact: e.target.value }))} />
                    </div>
                    <button
                        disabled={!done}
                        onClick={handleCheckAvailability}
                        className='booking-check-availability-button'>Check availability</button>
                </form>
                {message && <h4 className='booking-error-message'>{message}</h4>}
                <button
                    onClick={handleBookVan}
                    disabled={done}
                    className='book-van-button'>Book this van</button>
                {error && <h4>{error.message}</h4>}
            </div>
        </div>
    )
}

export default Booking
