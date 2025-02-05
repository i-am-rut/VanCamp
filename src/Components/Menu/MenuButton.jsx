import React from 'react'

const MenuButton = ({children, onClick}) => {
  return (
    <div className='menu-button' onClick={onClick}>
      {children}
    </div>
  )
}

export default MenuButton
