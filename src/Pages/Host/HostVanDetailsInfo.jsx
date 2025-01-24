import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const HostVanDetailsInfo = () => {
    const param = useParams()
    const [van, setVan] = useState({})
    console.log(param.id)

    useEffect(() => {
        fetch(`/api/host/vans/${param.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans[0]))
    }, [param.id])

  return (
    <div className='host-vans-details-info-container'>
        <p><span className='span-bold'>Name:</span> {van.name}</p>
        <p><span className='span-bold'>Category:</span> {van.type}</p>
        <p><span className='span-bold'>Description:</span> {van.description}</p>
        {/* <p><span className='bold'>Visibility:</span> {}</p> */}
    </div>
  )
}

export default HostVanDetailsInfo
