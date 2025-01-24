import React from 'react'
import { useOutletContext } from 'react-router-dom'

const HostVanDetailsPrice = () => {

  const hostVan = useOutletContext()
  console.log(hostVan)


  return (
    <h3>
      ${hostVan.price}<span className='span-normal'>/day</span>
    </h3>
  )
}

export default HostVanDetailsPrice
