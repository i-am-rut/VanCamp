import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadScript } from '../Utils/LoadScript';
import logo192 from '../Utils/logo192.png'
import { ShimmerContentBlock } from 'react-shimmer-effects';

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
    const [loading, setLoading] = useState(true)
    const param = useParams()
    const navigate = useNavigate()
    const dateFormat = (str) => {
        const date = str.split('T')[0].split('-')
        const newDate = `${date[2]}-${date[1]}-${date[0]}`
        return newDate
    }

    const url = process.env.NODE_ENV === "development"? "http://localhost5000" : "https://vancamp-backend.onrender.com"

    useEffect(() => {

        const getBooking = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${url}/api/bookings/${param.bookingId}`, {withCredentials: true})

                if(res.status === 200) {
                  setBooking(res.data)
                } else {
                  console.log("This:",res)
                }
            } catch (error) {
                console.log("error is:", error)
            } finally {
              setLoading(false)
            }

        }
        getBooking()
    },[param.bookingId])

    const handlePayClick = async (bookingId) => {
        try {
          
          const { data } = await axios.post(`${url}/api/transactions/create-order`, { bookingId }, {withCredentials: true});
      
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
                const verifyRes = await axios.post(`${url}/api/transactions/verify-payment`, {
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
          const response = await axios.patch(`${url}/api/bookings/cancel/${bookingId}`);
          
          console.log("Booking canceled successfully:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error canceling booking:", error.response?.data || error.message);
          throw error;
        }
    }
    
    return (
        <div className='booking-details-page-container'>
          <div className='my-bookings-note-section'>
            <p><strong>NOTES:</strong><br />1. You can make <strong>payment</strong> till <strong>1 day before your booking start date.</strong> If you fail to do so, the <strong>booking</strong> will be automatically <strong>cancelled.</strong> <br /><br /> 2. You can <strong>cancel your bookings</strong> only <strong>till the booking start date</strong> after that bookings will not be canceled.</p>
          </div>
          <div className='booking-details-page'>
            <div className='booking-details'>
              {loading? <ShimmerContentBlock
                          title
                          text
                          thumbnailWidth={150}
                        /> : <div className='booking-details-van-info'>
                <div className='booking-details-image-container'>
                  <img src={booking.vanId.images[0]} alt={`${booking.vanId.name} van`} />
                </div>
                <div className='van-info'>
                  <p><strong>Name: </strong>{booking.vanId.name}</p>
                  <p><strong>Price per day: </strong>&#8377;{booking.vanId.basePrice}</p>
                  <p><strong>Status: </strong>{booking.status}</p>
                </div>
              </div>}
              <div className='booking-details-booking-info-container'>
                <div className='booking-info-formatter'>
                  <strong>From Date: </strong>
                  <p>{dateFormat(booking.startDate)}</p>
                </div>
                <div className='booking-info-formatter'>
                  <strong>Till Date: </strong>
                  <p>{dateFormat(booking.endDate)}</p>
                </div>
                <div className='booking-info-formatter'>
                  <div className='booking-info-description-formatter'>
                    <strong>Base price: </strong>
                    <small>(price per day * number of days)</small>
                  </div>
                  <p>&#8377;{booking.price.basePrice}</p>
                </div>
                <div className='booking-info-formatter bottom-line'>
                  <strong>Addons: </strong>
                  <p>&#8377;{booking.price.addOnsPrice}</p>
                </div>
                <div className='booking-info-formatter'>
                  <div className='booking-info-description-formatter'>
                  <strong>Total price: </strong>
                  <small>(base price + addons)</small>
                  </div>
                  <p>&#8377;{booking.price.totalPrice}</p>
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
