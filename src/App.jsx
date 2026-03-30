
<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
=======
// import React from 'react'
import { Routes, Route } from 'react-router-dom'
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
<<<<<<< HEAD
import Home from './pages/Home'
import AppContextProvider, { AppContext } from './context/AppContext'
import ProtectedRoute from './components/ProtectedRoute'

/**
 * RootRedirect Component
 * Redirects unauthenticated users to login page on initial load
 * Keeps existing functionality for authenticated users
 */
const RootRedirect = () => {
  const { token } = useContext(AppContext)
  
  // If no token, show login, otherwise show home
  return token ? <Home /> : <Navigate to="/login" replace />
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root route - redirect to login if not authenticated */}
      <Route path='/' element={<RootRedirect />} />
      
      {/* Public routes - accessible without authentication */}
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/doctors' element={<Doctors />} />
      <Route path='/doctors/:speciality' element={<Doctors />} />
      
      {/* Protected routes - require authentication */}
      <Route 
        path='/my-profile' 
        element={<ProtectedRoute element={<MyProfile />} />} 
      />
      <Route 
        path='/my-appointments' 
        element={<ProtectedRoute element={<MyAppointments />} />} 
      />
      <Route 
        path='/appointment/:docId' 
        element={<ProtectedRoute element={<Appointment />} />} 
      />
      
      {/* Catch-all - redirect to home */}
      <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  )
}
=======
import  Home  from './pages/Home'
import AppContextProvider from './context/AppContext'
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f

const App = () => {
  return (
    <AppContextProvider>
      <div className='mx-4 sm:mx-[10%]'>
        <Navbar />
        
<<<<<<< HEAD
        <AppRoutes />

        <Footer />
        <ToastContainer />
=======
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} /> 
        </Routes> 

        <Footer />
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
      </div>
    </AppContextProvider>
  )
}

export default App