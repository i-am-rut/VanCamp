import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Menu from './Menu/index'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
  return (
    <header>
      <Link to="/" className='site-logo' >#VanCamp</Link>
      <nav>
        <Link to='/logout'>Logout <MdOutlineLogout /></Link>
        <NavLink
          to="host"
          className={({ isActive }) => isActive ? "selected" : ""}
        >Host</NavLink>
        <NavLink
          to="about"
          className={({ isActive }) => isActive ? "selected" : ""}
        >About</NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) => isActive ? "selected" : ""}
        >Vans</NavLink>
        <Link to='login'><CgProfile /></Link>
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
