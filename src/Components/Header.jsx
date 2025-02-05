import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Menu from './Menu/index'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogout } from "react-icons/md";
import  { AuthContext } from '../Utils/AuthProvider'

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleMenuClick = () => {
    setToggle(prev => !prev)
  }
  const handleMenuItemClick = () => {
    setToggle(prev => !prev)
  }
  
  return (
    <header>
      <Link to="/" className='site-logo' >#VanCamp</Link>
      <nav>
        <NavLink
          to="about"
          className={({ isActive }) => isActive ? "selected" : ""}
          >About</NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) => isActive ? "selected" : ""}
          >Vans</NavLink>
        {user? (<Menu>
          <Menu.Button onClick={handleMenuClick}><GiHamburgerMenu /></Menu.Button>
          <Menu.Dropdown toggle={toggle} onClick={handleMenuItemClick}>
            <Menu.Item><Link to='/profile'>Profile</Link></Menu.Item>
            <Menu.Item>{user?.role === 'host' && <Link
              to="host"
            >Host</Link>}</Menu.Item>
            <Menu.Item><Link to='/my-bookings'>My bookings</Link></Menu.Item>
            <button 
              className='logout-button'   onClick={handleLogout}>
                logout <MdOutlineLogout />
            </button>
          </Menu.Dropdown>
        </Menu>) : (<Link to='login'><CgProfile /></Link>)}
      </nav>
    </header>
  )
}

export default Header
