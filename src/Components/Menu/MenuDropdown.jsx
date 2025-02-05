import React from 'react'

const MenuDropdown = ({children, toggle, onClick}) => {
  const style = toggle? ' ' : 'display-none'
  return (
    <div className={`menu-dropdown ${style}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default MenuDropdown
