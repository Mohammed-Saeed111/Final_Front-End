import { createContext, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
} from '../api/userApi'
import { getDoctorsList } from '../api/doctorApi'
import { doctors as assetsDoctor } from '../assets/assets'

const AppContext = createContext()

const AppContextProvider = (props) => {
  const currencySymbol = '$'

  // ─── Auth State ─────────────────────────────────────────────────────────────
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [userData, setUserData] = useState(null)

  // ─── Doctors (from assets with images) ──────────────────────────────────────
  const [doctors, setDoctors] = useState(assetsDoctor)

  /** Initialize doctors from assets (already includes images) */
  const fetchDoctors = useCallback(() => {
    setDoctors(assetsDoctor)
  }, [])

  // ─── User Profile ─────────────────────────────────────────────────────────────
  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await getProfile()
      if (data.success) {
        setUserData(data.userData)
      } else {
        // token expired or invalid – clear it and force re-login
        toast.error(data.message)
        localStorage.removeItem('token')
        setToken('')
      }
    } catch {
      toast.error('Failed to load profile')
    }
  }, [])

  /** Save changes to the user profile (with optional image upload) */
  const saveProfile = async (profileData, imageFile = null) => {
    try {
      const data = await updateProfile(profileData, imageFile)
      if (data.success) {
        toast.success(data.message)
        await fetchUserProfile()
        return true
      }
      toast.error(data.message)
      return false
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update profile')
      return false
    }
  }

  // ─── Appointments ─────────────────────────────────────────────────────────────
  /** Book a new appointment */
  const handleBookAppointment = async (docId, slotDate, slotTime, docData) => {
    try {
      const data = await bookAppointment(docId, slotDate, slotTime, docData)
      if (data.success) { toast.success(data.message); return true }
      toast.error(data.message)
      return false
    } catch {
      toast.error('Failed to book appointment')
      return false
    }
  }

  /** Fetch the current user's appointments */
  const fetchAppointments = async () => {
    try {
      const data = await listAppointments()
      if (data.success) return data.appointments
      toast.error(data.message)
      return []
    } catch {
      toast.error('Failed to load appointments')
      return []
    }
  }

  /** Cancel an appointment */
  const handleCancelAppointment = async (appointmentId) => {
    try {
      const data = await cancelAppointment(appointmentId)
      if (data.success) { toast.success(data.message); return true }
      toast.error(data.message)
      return false
    } catch {
      toast.error('Failed to cancel appointment')
      return false
    }
  }

  // ─── Payment ──────────────────────────────────────────────────────────────────
  /** Open the Razorpay payment window */
  const handlePayment = async (appointmentId) => {
    try {
      const data = await paymentRazorpay(appointmentId)
      if (!data.success) return toast.error(data.message)

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        handler: async (response) => {
          const verify = await verifyRazorpay(response.razorpay_order_id)
          if (verify.success) toast.success(verify.message)
          else toast.error(verify.message)
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch {
      toast.error('Payment failed')
    }
  }

  // ─── Auth Helpers ─────────────────────────────────────────────────────────────
  /** Logout */
  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUserData(null)
  }

  // ─── Effects ──────────────────────────────────────────────────────────────────
  // Always load doctors on mount (public endpoint – no token needed)
  useEffect(() => {
    fetchDoctors()
  }, [fetchDoctors])

  // Load user profile whenever the token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      fetchUserProfile()
    }
  }, [token, fetchUserProfile])

  // ─── Context Value ────────────────────────────────────────────────────────────
  const value = {
    // state
    token, setToken,
    userData, setUserData,
    doctors,
    currencySymbol,
    // functions
    fetchDoctors,
    fetchUserProfile,
    saveProfile,
    handleBookAppointment,
    fetchAppointments,
    handleCancelAppointment,
    handlePayment,
    logout,
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
export { AppContext }
