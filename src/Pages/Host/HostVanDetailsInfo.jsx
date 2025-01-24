import React from 'react'
import { useOutletContext } from 'react-router-dom'

const HostVanDetailsInfo = () => {
    
    const hostVan = useOutletContext()

  return (
    <div className='host-vans-details-info-container'>
        <p><span className='span-bold'>Name:</span> {hostVan.name}</p>
        <p><span className='span-bold'>Category:</span> {hostVan.type}</p>
        <p><span className='span-bold'>Description:</span> {hostVan.description}</p>
        {/* <p><span className='bold'>Visibility:</span> {}</p> */}
    </div>
  )
}

export default HostVanDetailsInfo
