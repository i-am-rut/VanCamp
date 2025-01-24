import React, { useEffect, useState } from 'react'
import { data, Link, useParams } from 'react-router-dom'

const HostVanDetails = () => {

    const param = useParams()
    const [hostVan, setHostVan] = useState(null)
    
    useEffect(() => {
        fetch(`/api/host/vans/${param.id}`)
            .then(res => res.json())
            .then(data => setHostVan(data.vans[0]))
    }, [param.id])


  return (
    <div className='host-van-details-page-container'>
        <Link to='/host/vans' className='back-nav-link'>&#8592; Back to all vans</Link>
        {hostVan? 
            (
                <div className='host-van-details-container'>
                    <div className='host-van-details-preview'>
                        <img src={hostVan.imageUrl} alt={`${hostVan.name} van`} className='host-van-details-image' />
                        <div className='host-van-details-info'>
                            <i className={`van-type ${hostVan.type}`}>{hostVan.type}</i>
                            <h2>{hostVan.name}</h2>
                            <p><span>${hostVan.price}</span>/day</p>
                        </div>
                    </div>
                </div> 
            ) : <h1>Loading...</h1>}        
    </div>
  )
}

export default HostVanDetails
