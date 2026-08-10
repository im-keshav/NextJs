import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>

    <div>this is home page</div>
    </ProtectedRoute>
  )
}

export default page