import React from 'react'
import { useOutletContext } from 'react-router-dom'

const HostVanDetailsPhotos = () => {

    const hostVan = useOutletContext()

  return (
    <div className='host-van-details-page-photos-container'>
        <img src={hostVan.imageUrl} alt={`${hostVan.name} van`} />
        <img src={hostVan.imageUrl} alt={`${hostVan.name} van`} />
        <img src={hostVan.imageUrl} alt={`${hostVan.name} van`} />
        <img src={hostVan.imageUrl} alt={`${hostVan.name} van`} />
        <img src={hostVan.imageUrl} alt={`${hostVan.name} van`} />
        <img src={hostVan.imageUrl} alt={`${hostVan.name} van`} />
    </div>
  )
}

export default HostVanDetailsPhotos
