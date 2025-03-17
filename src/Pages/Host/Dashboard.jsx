import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { GiSurferVan } from 'react-icons/gi';
import { FaStar } from "react-icons/fa";
import { AuthContext } from '../../Utils/AuthProvider';
import { ShimmerButton } from 'react-shimmer-effects';


const Dashboard = () => {
  const [hostVans, setHostVans] = useState([])
  const [earnings, setEarnings] = useState(null);
  const [filter, setFilter] = useState("total"); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext)
  const url = process.env.NODE_ENV === "development"? "http://localhost5000" : "https://vancamp-backend.onrender.com"

  useEffect(() => {
    const fetchEarnings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}/api/host/earnings?filter=${filter}`, { credentials: "include" });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch earnings");
        setEarnings(data);
      } catch (err) {
        setError(err.message);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [filter, error]);

  useEffect(() => {
    const getHostVans = async () => {
      try {
        const res = await axios.get(`${url}/api/host/vans`, { withCredentials: true })
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
        <div className='host-van-link'>
            <img src={van.images[0]} alt={`${van.name} van`} className='host-van-card-image' />
            <div className='host-van-card-info'>
                <h3>{van.name}</h3>
                <p><span>&#8377;{van.basePrice}</span>/day</p>
            </div>
        </div>
      </div>
    </div>
  ))


  return (
    <div>
      <Link to='income' className='dashboard-income-section'>
        <h2>Welcome {user?.name.split(' ')[0]}!</h2>
        <div className="host-income-page-filter-container">
          <label className="host-income-filter-title">Income:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded host-income-filter-selector"
          >
            <option value="total">Total</option>
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        {loading? <ShimmerButton size="lg" /> : <h1>&#8377;{earnings?.totalEarnings}</h1>}
      </Link>
      <Link to='reviews' className='dashboard-review-section'>
        <h2>Review score</h2>
        <div className='dashboard-review-section-star-rating-container'>
          <FaStar />
          <p>(5.0/5)</p>
        </div>
      </Link>
      <Link to='vans' className='dashboard-vans-section'>
        <h1>Your listed vans</h1>
        {hostVans.length > 0 ? hostVanElement : <div className='my-bookings-page-no-booking-yet-banner-container'>
            <div className='svg-container'><GiSurferVan /></div>
            <h1>You have not added any van yet.</h1>
        </div>}
      </Link>
    </div>
  )
}

export default Dashboard
