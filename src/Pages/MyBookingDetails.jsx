import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadScript } from '../Utils/LoadScript';
import logo192 from '../Utils/logo192.png'

const MyBookingDetails = () => {
    const [booking, setBooking] = useState({
        price: {
          basePrice: 6800,
          addOnsPrice: 0,
          totalPrice: 6800
        },
        _id: "679de94a637c66015722a7f7",
        vanId: {
          longTermDiscounts: {
            weekly: 0,
            monthly: 0
          },
          _id: "679905ddec1dd917b81ad66d",
          name: "Beach Bum",
          description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.",
          images: [
            "https://res.cloudinary.com/dyjphgkf9/image/upload/v1738081756/vancamp/vfiovjj9lhb6gvceom2d.png"
          ],
          basePrice: 1700,
          location: "Pune",
          category: "rugged",
          insuranceDetails: "",
          hostId: "6796a404694d1099d7ab274a",
          availability: [],
          addOns: [],
          seasonalPricing: [],
          reviews: [],
          __v: 0
        },
        renterId: {
          location: "",
          _id: "6798f21fec1dd917b81ad666",
          name: "Udit Deshmukh",
          email: "deshmukhudit711@gmail.com",
          password: "$2a$10$Wu52T.DZvmjrHXDqSnKMieBvH4qusnNR/ZmIVqo5H/axAKqe63g7a",
          role: "host",
          wishlist: [],
          createdAt: "2025-01-28T15:05:03.037Z",
          updatedAt: "2025-01-28T15:05:03.037Z",
          __v: 0
        },
        renterContact: 9625970028,
        startDate: "2025-02-17T00:00:00.000Z",
        endDate: "2025-02-20T00:00:00.000Z",
        addOns: [],
        status: "Pending",
        createdAt: "2025-02-01T09:28:42.968Z",
        updatedAt: "2025-02-01T09:28:42.968Z",
        __v: 0
      })
    const param = useParams()
    const navigate = useNavigate()
    const dateFormat = (str) => {
        const date = str.split('T')[0].split('-')
        const newDate = `${date[2]}-${date[1]}-${date[0]}`
        return newDate
    }

    useEffect(() => {

        const getBooking = async () => {
            try {
                const res = await axios.get(`https://vancamp-backend.onrender.com/api/bookings/${param.bookingId}`)

                if(res.ok) {
                    setBooking(res.data)
                }
            } catch (error) {
                console.log("error is:", error)
            }

        }
        getBooking()
    },[param.bookingId])


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

    const handleCancelClick = async (bookingId) => {
        try {
          const response = await axios.patch(`https://vancamp-backend.onrender.com/api/bookings/cancel/${bookingId}`);
          
          console.log("Booking canceled successfully:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error canceling booking:", error.response?.data || error.message);
          throw error;
        }
    }
    
    return (
        <div className='booking-details-page-container'>
            <div className='booking-details-page'>
                <div className='booking-details'>
                    <div className='temp'>
                        <img src='https://res.cloudinary.com/dyjphgkf9/image/upload/v1738081756/vancamp/vfiovjj9lhb6gvceom2d.png' alt={`${booking.vanId.name} van`} style={{width: "15rem"}} />
                        <div>
                            <p><strong>Name: </strong>{booking.vanId.name}</p>
                            <p><strong>Price per day: </strong>{booking.vanId.basePrice}</p>
                            <p><strong>Status: </strong>{booking.status}</p>
                            <p><strong>From Date: </strong>{dateFormat(booking.startDate)}</p>
                            <p><strong>Till Date: </strong>{dateFormat(booking.endDate)}</p>
                            <p><strong>Base price: </strong>{booking.price.basePrice}</p>
                            <p>(price per day * number of days)</p>
                            <p><strong>Addons: </strong>{booking.price.addOnsPrice}</p>
                            <p><strong>Total price: </strong>{booking.price.totalPrice}</p>
                            <p>(base price + addons)</p>
                        </div>
                    </div>
                        <div className='my-bookings-card-buttons-container'>
                        {booking.status === 'Pending' && <button className='pay-button' onClick={() => handlePayClick(booking._id)}>Pay Amount</button>}
                        {(booking.status === 'Confirmed' || booking.status === 'Pending') && <button className='cancel-booking-button'
                        onClick={handleCancelClick}>Cancel booking</button>}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MyBookingDetails
