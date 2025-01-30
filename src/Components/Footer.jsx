import React from 'react'

const Footer = () => {
  return (
    <footer>&#169; {new Date().getFullYear()} VanCamp. All rights reserved 
    <div style={{color: 'red', fontWeight: 'bold', fontSize: '1.5rem'}} className='disclaimer'>(This website is for makers educational purpose only)</div></footer>
  )
}

export default Footer
