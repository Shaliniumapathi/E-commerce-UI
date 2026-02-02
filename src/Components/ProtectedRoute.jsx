import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = useSelector((s) => s.user && s.user.token)
  if (!token) return <Navigate to="/login" replace />
  return children
}
