import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { loadScript } from '../Utils/LoadScript'
import logo192 from '../Utils/logo192.png'

const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    const navigate = useNavigate()
    const displayArray = bookings.reverse()
    const dateFormat = (str) => {
        const date = str.split('T')[0].split('-')
        const newDate = `${date[2]}-${date[1]}-${date[0]}`
        return newDate
    }

    const handlePayClick = async (bookingId) => {
        try {
          
          const { data } = await axios.post("https://vancamp-backend.onrender.com/api/transactions/create-order", { bookingId }, {withCredentials: true});
      
          if (!data.order) {
            alert("Error creating order. Please try again.");
            return;
          }
      
          //Load Razorpay script
          const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
          if (!res) {
            alert("Failed to load Razorpay. Check your connection.");
            return;
          }
      
          //Configure Razorpay Checkout
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
            amount: data.order.amount, 
            currency: "INR",
            name: "VanCamp",
            description: "Booking Payment",
            image: logo192,
            order_id: data.order.id,
            handler: async function (response) {
              try {
                // Verify payment with backend
                const verifyRes = await axios.post("https://vancamp-backend.onrender.com/api/transactions/verify-payment", {
                  bookingId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature
                }, {withCredentials: true});
                console.log(verifyRes)
                alert("Payment Successful!");
                window.location.reload(); // Refresh UI after successful payment
                navigate('/my-bookings/:id')
              } catch (err) {
                console.error("Payment verification failed:", err);
                alert("Payment verification failed. Please contact support.");
              }
            },
            prefill: {
              name: data.renterContact.name,
              email: data.renterContact.email,
              contact: data.renterContact.phone
            },
            theme: {
              color: "#3399cc"
            }
          };
      
          // Open Razorpay checkout modal
          const rzp = new window.Razorpay(options);
          rzp.open();
      
        } catch (error) {
          console.error("Error in payment:", error);
          alert("Payment failed. Please try again.");
        }
    }

    const vanCard = displayArray.map(booking => (
        <div key={booking._id} className='my-bookings-card'>
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
                    <button className={`pay-button ${booking.status === 'Cancelled' && 'display-none'} `} onClick={() => handlePayClick(booking._id)}>Pay Amount</button>
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
