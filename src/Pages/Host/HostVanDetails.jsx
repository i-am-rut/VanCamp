import React from 'react'
import { useParams } from 'react-router-dom'

const HostVanDetails = () => {

    const param = useParams()
    console.log(param)

  return (
    <h1>
      Host van details go here
    </h1>
  )
}

export default HostVanDetails
