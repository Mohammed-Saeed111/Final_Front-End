<<<<<<< HEAD
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { loginUser, registerUser } from '../api/userApi'

const Login = () => {
  const { token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  }, [token, navigate])

  // Clear form when switching between login and signup
  const handleStateChange = (newState) => {
    setState(newState)
    setName('')
    setEmail('')
    setPassword('')
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    if (state === 'Sign up' && !name) {
      toast.error('Please enter your name')
      return
    }

    try {
      setIsLoading(true)
      
      // Call register or login based on state
      const data = state === 'Sign up'
        ? await registerUser(name, email, password)
        : await loginUser(email, password)

      if (data.success) {
        // Save token to context (will be saved to localStorage automatically via useEffect)
        setToken(data.token)
        toast.success(state === 'Sign up' ? 'Account created successfully!' : 'Logged in successfully!')
        // Navigation will happen automatically via useEffect when token updates
      } else {
        toast.error(data.message || 'Authentication failed')
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast.error(error.response?.data?.message || 'Something went wrong, please try again')
    } finally {
      setIsLoading(false)
    }
=======
import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
<<<<<<< HEAD

        <p className='text-2xl font-semibold'>
          {state === 'Sign up' ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === 'Sign up' ? 'sign up' : 'log in'} to book appointment</p>
=======
        
        <p className='text-2xl font-semibold'>
          {state === 'Sign up' ? 'Create Account' : 'Login'}
        </p>
        <p>
          Please {state === 'Sign up' ? 'sign up' : 'log in'} to book appointment
        </p>
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f

        {state === 'Sign up' && (
          <div className='w-full'>
            <p>Full Name</p>
<<<<<<< HEAD
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='John Doe'
              required
=======
            <input 
              className='border border-zinc-300 rounded w-full p-2 mt-1' 
              type="text" 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              required 
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
<<<<<<< HEAD
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='your@email.com'
            required
=======
          <input 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            required 
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
<<<<<<< HEAD
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Enter your password'
            required
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className='bg-primary text-white w-full py-2 rounded-md text-base mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading 
            ? (state === 'Sign up' ? 'Creating Account...' : 'Logging in...') 
            : (state === 'Sign up' ? 'Create Account' : 'Login')}
=======
          <input 
            className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            required 
          />
        </div>

        <button className='bg-primary text-white w-full py-2 rounded-md text-base mt-4'>
          {state === 'Sign up' ? 'Create Account' : 'Login'}
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
        </button>

        {state === 'Sign up' ? (
          <p>
            Already have an account?{' '}
<<<<<<< HEAD
            <span 
              onClick={() => handleStateChange('Login')} 
              className='text-primary underline cursor-pointer'
            >
=======
            <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
<<<<<<< HEAD
            <span 
              onClick={() => handleStateChange('Sign up')} 
              className='text-primary underline cursor-pointer'
            >
=======
            <span onClick={() => setState('Sign up')} className='text-primary underline cursor-pointer'>
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
              Click here
            </span>
          </p>
        )}
<<<<<<< HEAD

=======
        
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
      </div>
    </form>
  )
}

<<<<<<< HEAD
export default Login
=======
export default Login
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
