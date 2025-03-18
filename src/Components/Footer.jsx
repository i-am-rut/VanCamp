import React from 'react'
import { FaLinkedin, FaSquareGithub } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer>&#169; {new Date().getFullYear()} Amrut Patil <a target='_blank' rel='noopener noreferrer' href={"https://www.github.com/i-am-rut"} className='text-2xl' ><FaSquareGithub /></a>
      <a target='_blank' rel='noopener noreferrer' href= {"https://www.linkedin.com/in/i-am-rutpatil"} className='text-2xl' ><FaLinkedin /></a></footer>
  )
}

export default Footer
