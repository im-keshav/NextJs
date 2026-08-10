import React from 'react'

const page = async ({params}) => {
  let {id} = await params
  return (
    <div>this is nested dynamic page and id is {id}</div>
  )
}

export default page 