import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GiSurferVan } from 'react-icons/gi'
import axios from 'axios'

const HostVans = () => {

    const [hostVans, setHostVans] = useState([])

    useEffect(() => {
        const getHostVans = async () => {
            try {
                const res = await axios.get('https://vancamp-backend.onrender.com/api/host/vans', { withCredentials: true })
                setHostVans(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getHostVans()
    }, [])

    const hostVanElement = hostVans.map(van => (
        <div key={van._id} className='host-vans-container'>
            <div className='host-van-card'>
                <Link className='host-van-link' to={`/host/vans/${van._id}`}>
                    <img src={van.images[0]} alt={`${van.name} van`} className='host-van-card-image' />
                    <div className='host-van-card-info'>
                        <h3>{van.name}</h3>
                        <p><span>&#8377;{van.basePrice}</span>/day</p>
                    </div>
                </Link>
                <Link className='host-van-edit-link' to={`/host/vans/edit/${van._id}`}>Edit</Link>
            </div>
        </div>
    ))

    return (
        <div className='host-vans-page-container'>
            <h1>Your listed vans</h1>
            {hostVans.length > 0 ? hostVanElement : <div className='my-bookings-page-no-booking-yet-banner-container'>
                <div className='svg-container'><GiSurferVan /></div>
                <h1>You have not added any van yet.</h1>
            </div>}
            <Link to='/host/vans/create-van' className='host-van-page-add-van-link'>+ Add new van</Link>
        </div>
    )
}

export default HostVans
