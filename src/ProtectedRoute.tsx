import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem('token')

  if (!isAuthenticated) {
    return <Navigate to="/signin" />
  }

  return <>{children}</>
}

export default ProtectedRoute
