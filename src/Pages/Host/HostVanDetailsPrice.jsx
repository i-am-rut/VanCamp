import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const HostVanDetailsPrice = () => {

    const param = useParams()
    const [van, setVan] = useState({})
    console.log(param.id)

    useEffect(() => {
        fetch(`/api/host/vans/${param.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans[0]))
    }, [param.id])

  return (
    <h3>
      ${van.price}<span className='span-normal'>/day</span>
    </h3>
  )
}

export default HostVanDetailsPrice
