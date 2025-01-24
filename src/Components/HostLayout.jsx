import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const HostLayout = () => {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    };

    return (
        <>
            <nav className='host-navbar-container'>
                <NavLink 
                    to='.' 
                    className="sub-navbar-elem"
                    end
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >Dashboard</NavLink>
                <NavLink 
                    to='income' 
                    className="sub-navbar-elem"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >Income</NavLink>
                <NavLink 
                    to='vans' 
                    className="sub-navbar-elem" 
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >Vans</NavLink>
                <NavLink 
                    to='reviews' 
                    className="sub-navbar-elem"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >Reviews</NavLink>
            </nav>
            <Outlet />
        </>
    );
};

export default HostLayout;
