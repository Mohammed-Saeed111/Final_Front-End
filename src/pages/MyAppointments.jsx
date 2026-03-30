import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { fetchAppointments, handleCancelAppointment, handlePayment } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  // جلب المواعيد عند تحميل الصفحة
  const loadAppointments = async () => {
    const data = await fetchAppointments()
    setAppointments(data)
  }

  useEffect(() => { loadAppointments() }, [])

  const onCancel = async (appointmentId) => {
    const success = await handleCancelAppointment(appointmentId)
    if (success) loadAppointments() // إعادة تحميل القائمة بعد الإلغاء
  }

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>

      <div>
        {appointments.length === 0 && (
          <p className='text-gray-500 mt-6'>No appointments found.</p>
        )}

        {appointments.map((item) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={item._id}>

            {/* صورة الطبيب */}
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData?.image} alt={item.docData?.name} />
            </div>

            {/* بيانات الموعد */}
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData?.name}</p>
              <p>{item.docData?.speciality}</p>

              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData?.address?.line1}</p>
              <p className='text-xs'>{item.docData?.address?.line2}</p>

              <p className='text-sm mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{' '}
                {item.slotDate} | {item.slotTime}
              </p>
            </div>

            <div></div>

            {/* أزرار الدفع والإلغاء */}
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => handlePayment(item._id)}
                  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                >
                  Pay Online
                </button>
              )}

              {item.payment && (
                <p className='text-sm text-center sm:min-w-48 py-2 border border-green-500 text-green-500 rounded'>
                  Paid
                </p>
              )}

              {!item.cancelled
                ? <button
                    onClick={() => onCancel(item._id)}
                    className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                  >
                    Cancel appointment
                  </button>
                : <p className='text-sm text-center sm:min-w-48 py-2 border border-red-400 text-red-400 rounded'>
                    Appointment cancelled
                  </p>
              }
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
