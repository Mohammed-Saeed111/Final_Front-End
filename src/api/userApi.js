import axiosInstance from './axiosInstance'

// ─── Auth ─────────────────────────────────────────────────────────────────────

/** تسجيل مستخدم جديد - POST /api/user/register */
export const registerUser = async (name, email, password) => {
  const { data } = await axiosInstance.post('/api/user/register', { name, email, password })
  return data // { success, token }
}

/** تسجيل الدخول - POST /api/user/login */
export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post('/api/user/login', { email, password })
  return data // { success, token }
}

// ─── Profile ──────────────────────────────────────────────────────────────────

/** جلب بيانات المستخدم - GET /api/user/get-profile */
export const getProfile = async () => {
  const { data } = await axiosInstance.get('/api/user/get-profile')
  return data // { success, userData }
}

/**
 * تحديث الملف الشخصي مع دعم رفع الصورة - POST /api/user/update-profile
 * @param {Object} profileData - { name, phone, address, dob, gender }
 * @param {File|null} imageFile - صورة المستخدم (اختياري)
 */
export const updateProfile = async (profileData, imageFile = null) => {
  const formData = new FormData()

  formData.append('name', profileData.name || '')
  formData.append('phone', profileData.phone || '')
  formData.append('dob', profileData.dob || '')
  formData.append('gender', profileData.gender || 'Not Selected')
  formData.append('address', JSON.stringify({
    line1: profileData.address?.line1 || '',
    line2: profileData.address?.line2 || ''
  }))

  if (imageFile) formData.append('image', imageFile)

  const { data } = await axiosInstance.post('/api/user/update-profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

// ─── Appointments ─────────────────────────────────────────────────────────────

/** حجز موعد - POST /api/user/book-appointment */
export const bookAppointment = async (docId, slotDate, slotTime, docData) => {
  const { data } = await axiosInstance.post('/api/user/book-appointment', {
    docId, slotDate, slotTime, docData
  })
  return data
}

/** جلب مواعيد المستخدم - GET /api/user/appointments */
export const listAppointments = async () => {
  const { data } = await axiosInstance.get('/api/user/appointments')
  return data // { success, appointments }
}

/** إلغاء موعد - POST /api/user/cancel-appointment */
export const cancelAppointment = async (appointmentId) => {
  const { data } = await axiosInstance.post('/api/user/cancel-appointment', { appointmentId })
  return data // { success, message }
}

// ─── Payment ──────────────────────────────────────────────────────────────────

/** إنشاء طلب دفع Razorpay - POST /api/user/payment-razorpay */
export const paymentRazorpay = async (appointmentId) => {
  const { data } = await axiosInstance.post('/api/user/payment-razorpay', { appointmentId })
  return data // { success, order }
}

/** التحقق من الدفع - POST /api/user/verify-razorpay */
export const verifyRazorpay = async (razorpay_order_id) => {
  const { data } = await axiosInstance.post('/api/user/verify-razorpay', { razorpay_order_id })
  return data // { success, message }
}
