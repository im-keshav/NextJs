"use client"
import React, { useState } from 'react'

const page = () => {
 
    const [products, setproducts] = useState([])
    
    const fetchData = async() => {
        let res = await fetch('https://fakestoreapi.com/products')
        let data = await res.json()
        setproducts(data)
    }
    fetchData()

  return (
    <div className='p-6'>
        <h1>all products lists here</h1>
        <div>
            {products.map((elem ) => 
           ( <h1>{elem.title}</h1>)
            )}
            </div>
    </div>
  )
}

export default page