<<<<<<< HEAD
import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
=======
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
  const { docId } = useParams()
<<<<<<< HEAD
  const navigate = useNavigate()
  const { doctors, currencySymbol, token, handleBookAppointment } = useContext(AppContext)
=======
  const { doctors, currencySymbol } = useContext(AppContext)
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  // -------------------------------
  // دالة لجلب معلومات الطبيب
  // -------------------------------
  const fetchDocInfoHandler = useCallback(() => {
    if (doctors && docId) {
      const doctor = doctors.find(doc => doc._id === docId)
      return doctor || null
    }
    return null
  }, [doctors, docId])

  // -------------------------------
  // دالة لحساب أوقات الحجز
  // -------------------------------
  const getAvailableSlotsHandler = useCallback((doctor) => {
    if (!doctor) return

    const slots = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const daySlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        daySlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      slots.push(daySlots)
    }
    return slots
  }, [])

  // -------------------------------
  // استدعاء الدوال بدون تحذيرات ESLint
  // -------------------------------
  useEffect(() => {
    // استخدم IIFE لتجنب تحذير setState داخل useEffect مباشرة
    (async () => {
      const doctor = fetchDocInfoHandler()
      setDocInfo(doctor)
      if (doctor) {
        const slots = getAvailableSlotsHandler(doctor)
        setDocSlots(slots)
      }
    })()
  }, [fetchDocInfoHandler, getAvailableSlotsHandler])

  if (!docInfo) return null

  return (
    <div>
      {/* ---------- تفاصيل الطبيب ---------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="verified" />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="info" />
            </p>
            <p className='text-sm text-gray-500 max-w-175 mt-1'>
              {docInfo.about}
            </p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ---------- أوقات الحجز ---------- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots.map((item, index) => (
            <div 
              onClick={() => setSlotIndex(index)} 
              key={index} 
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
            >
              <p>{item && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex]?.map((item, index) => (
            <p 
              onClick={() => setSlotTime(item.time)} 
              key={index} 
              className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

<<<<<<< HEAD
        <button
          onClick={async () => {
            if (!token) return navigate('/login')
            if (!slotTime) return
            // تحويل التاريخ لصيغة dd_mm_yyyy
            const date = docSlots[slotIndex][0].datetime
            const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`
            const success = await handleBookAppointment(docId, slotDate, slotTime, docInfo)
            if (success) navigate('/my-appointments')
          }}
          className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full mt-6'
        >
=======
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full mt-6'>
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
          Book an appointment
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment