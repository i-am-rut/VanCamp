import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Menu from './Menu/index'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogout } from "react-icons/md";
import  { AuthContext } from '../Utils/AuthProvider'

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }
  
  return (
    <header>
      <Link to="/" className='site-logo' >#VanCamp</Link>
      <nav>
        {user?.role === 'host' && <NavLink
          to="host"
          className={({ isActive }) => isActive ? "selected" : ""}
        >Host</NavLink>}
        <NavLink
          to="about"
          className={({ isActive }) => isActive ? "selected" : ""}
        >About</NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) => isActive ? "selected" : ""}
        >Vans</NavLink>
        {user ? ( 
          <button className='logout-button'  onClick={handleLogout}>
              logout <MdOutlineLogout />
          </button> 
        ) : (
          <Link to='login'><CgProfile /></Link>
        )}
        <Menu>
          <Menu.Button><GiHamburgerMenu /></Menu.Button>
          <Menu.Dropdown>
            <Link to='/host'>Host</Link>
            <Link to='/about'>About</Link>
            <Link to='/vans'>Vans</Link>
            <Link to='/logout'>Logout <MdOutlineLogout /></Link>
          </Menu.Dropdown>
        </Menu>
      </nav>
    </header>
  )
}

export default Header
