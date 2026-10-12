import React from 'react'
import { useParams } from 'react-router-dom'
function User() {
    const params = useParams();
  return (
    <div className='bg-gray-400 text-xl text-white'>User: {params.userId}</div>
  )
}

export default User