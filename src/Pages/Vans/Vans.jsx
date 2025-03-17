import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const Vans = () => {
  const [vans, setVans] = useState([])
  const [searchParams, setSearchparams] = useSearchParams()

  const categoryFilter = searchParams.get("category")



  const getVans = async () => {
    try {
      const response = await fetch("https://vancamp-backend.onrender.com/api/vans", { method: "GET" })

      if (response.ok) {
        const data = await response.json()
        setVans(data)
      } else {
        const errorData = await response.json()
        console.log('Error:-', errorData)
      }
    } catch (error) {
      console.log('Request failed:', error)
    }
  }

  useEffect(() => {
    getVans()
  }, [categoryFilter])

  const vanElements = vans.map(van => (
    <div key={van._id} className='van-card-container'>
      <Link to={`/vans/${van._id}`}>
        <img src={van.images[0]} className='van-card-img' alt={`${van.name} van`} />
        <div className='van-card-info'>
          <h2>{van.name}</h2>
          <p><span>&#8377;{van.basePrice}</span>/day</p>
        </div>
        <i className={`van-type ${van.category}`}>{van.category}</i>
      </Link>
    </div>
  ))

  const vanCategories = [...new Set(vans.map(van => van.category))]
  const categoryFilterButtons = vanCategories.map(category =>
    <button
      key={category}
      className={`van-type ${categoryFilter === category && category} type-filter-button`}
      onClick={() => setSearchparams({ category: category })}
    >{category}</button>
  )

  return (
    <div className='vans-list-container'>
      <h1>Explore our van options</h1>
      <div className='filter-buttons-container'>
        {categoryFilterButtons}
        {categoryFilter &&
          <button
            className='van-type type-filter-button'
            onClick={() => setSearchparams({})}
          >Clear filter</button>}
      </div>
      <div className='vans-list filter-button'>
        {vans.length > 0 ? vanElements : <h1>Loading...</h1>}
      </div>
    </div>
  )
}

export default Vans
