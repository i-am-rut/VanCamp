import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <Link to="/" className='site-logo' >#VanCamp</Link>
        <nav>
            <NavLink 
              to="/host" 
              className={({isActive}) => isActive ? "selected" : ""}
            >Host</NavLink>
            <NavLink 
              to="/about"
              className={({isActive}) => isActive ? "selected" : ""}
            >About</NavLink>
            <NavLink 
              to="/vans" 
              className={({isActive}) => isActive ? "selected" : ""}
            >Vans</NavLink>
        </nav>
    </header>
  )
}

export default Header
