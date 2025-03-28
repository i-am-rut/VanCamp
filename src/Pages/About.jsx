import React from 'react'
import image from "../images/about-page-image.png"
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="about-page-container">
        <img className='about-page-image' src={image} alt='A person sitting on top of a van and stargazing.' />
        <div className='about-page-content'>
            <h1>Don't squeeze in a sedan when you could relax in a van</h1>
            <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
            <p>Our team is full of van-life enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
        </div>
        <div className='about-page-cta'>
            <h2>Your destination is waiting.<br />Your van is ready.</h2>
            <Link className='link-button' to='/vans'>Explore our vans</Link>
        </div>
    </div>
  )
}

export default About
