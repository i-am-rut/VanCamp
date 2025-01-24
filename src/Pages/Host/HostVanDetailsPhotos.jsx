import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const HostVanDetailsPhotos = () => {

    const param = useParams()
    const [van, setVan] = useState({})
    console.log(param.id)

    useEffect(() => {
        fetch(`/api/host/vans/${param.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans[0]))
    }, [param.id])

  return (
    <div className='host-van-details-page-photos-container'>
        <img src={van.imageUrl} alt={`${van.name} van`} />
        <img src={van.imageUrl} alt={`${van.name} van`} />
        <img src={van.imageUrl} alt={`${van.name} van`} />
        <img src={van.imageUrl} alt={`${van.name} van`} />
        <img src={van.imageUrl} alt={`${van.name} van`} />
        <img src={van.imageUrl} alt={`${van.name} van`} />
    </div>
  )
}

export default HostVanDetailsPhotos
