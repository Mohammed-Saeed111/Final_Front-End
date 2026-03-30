import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

/**
 * ProtectedRoute Component
 * Protects pages that require authentication
 * Redirects unauthenticated users to login page
 */
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { token } = useContext(AppContext)

  return token ? Element : <Navigate to="/login" replace />
}

export default ProtectedRoute
