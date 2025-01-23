import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
        <h1>You got the travel plans, we got the travel bans.</h1>
        <p>Add adventure to your life by joining the #VanCamp movement. Rent the perfect van to make your perfect road trip.</p>
        <Link to='vans'>Find your van</Link>
    </div>
  )
}

export default Home