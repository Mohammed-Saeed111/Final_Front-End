import { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

/**
 * useAuthRedirect Hook
 * Automatically redirects unauthenticated users to login page
 * Can be used in individual page components for additional control
 * 
 * Usage:
 *   const { isAuthenticated } = useAuthRedirect()
 *   if (!isAuthenticated) return null // Component won't render until auth check completes
 */
export const useAuthRedirect = () => {
  const { token } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()

  // List of public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/about', '/contact', '/doctors']

  useEffect(() => {
    // Check if current route is public
    const isPublicRoute = publicRoutes.includes(location.pathname) || 
                          location.pathname.startsWith('/doctors/')

    // If route requires auth and user is not authenticated, redirect to login
    if (!isPublicRoute && !token) {
      navigate('/login', { replace: true, state: { from: location.pathname } })
    }
  }, [token, location.pathname, navigate])

  return {
    isAuthenticated: !!token,
    token,
  }
}

export default useAuthRedirect
