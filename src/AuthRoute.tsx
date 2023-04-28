import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface AuthRouteProps {
  children: ReactNode
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const isAuthenticated = localStorage.getItem('token')

  if (isAuthenticated) {
    return <Navigate to="/todo" />
  }

  return <>{children}</>
}

export default AuthRoute
