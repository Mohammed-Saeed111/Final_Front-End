import axiosInstance from './axiosInstance'

// ─── GET /api/doctor/list ─────────────────────────────────────────────────────
/** Fetch the full public list of doctors */
export const getDoctorsList = async () => {
  const { data } = await axiosInstance.get('/api/doctor/list')
  return data // { success, doctors }
}
