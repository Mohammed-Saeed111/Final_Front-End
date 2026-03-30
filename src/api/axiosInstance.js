import axios from 'axios'

// Base URL from .env
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor: auto-attach Authorization token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers['token'] = token
  return config
})

// Response error interceptor: preserve error details for better debugging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Create an error object that preserves response details
    const errorObj = new Error(
      error.response?.data?.message ||
      error.message ||
      'Server error'
    )
    
    // Attach response to the error object for better error handling
    errorObj.response = error.response
    errorObj.status = error.response?.status
    
    return Promise.reject(errorObj)
  }
)

export default axiosInstance
