import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const HostLayout = () => {
  return (
    <>
      <nav className='host-navbar-container'>
        <Link to='/host/dashboard' className='sub-navbar-elem'>Dashboard</Link>
        <Link to='/host/income' className='sub-navbar-elem'>Income</Link>
        <Link to='/host/vans' className='sub-navbar-elem' >Vans</Link>
        <Link to='/host/reviews' className='sub-navbar-elem'>Reviews</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default HostLayout
