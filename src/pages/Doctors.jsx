<<<<<<< HEAD
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const SPECIALITIES = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

=======
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
<<<<<<< HEAD
  const [showFilter, setShowFilter] = useState(false)

  const filteredDoctors = speciality
    ? doctors.filter((doc) => doc.speciality === speciality)
=======

  // فلترة الأطباء مباشرة بدون setState في useEffect
  const filteredDoctors = speciality
    ? doctors.filter(doc => doc.speciality === speciality)
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
    : doctors

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

<<<<<<< HEAD
        {/* Mobile filter toggle */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
=======
        {/* زر إظهار وإخفاء قائمة الفلترة (الهواتف) */}
        <button
          className='py-1 px-3 border rounded text-sm transition-all sm:hidden'
          onClick={() => {}}
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
        >
          Filters
        </button>

<<<<<<< HEAD
        {/* Speciality sidebar */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden'} sm:flex`}>
          {SPECIALITIES.map((spec) => (
            <p
              key={spec}
=======
        {/* قائمة التخصصات */}
        <div className='flex-col gap-4 text-sm text-gray-600 hidden sm:flex'>
          {[
            'General physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'Gastroenterologist'
          ].map((spec, i) => (
            <p
              key={i}
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
              onClick={() =>
                speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === spec ? 'bg-indigo-50 text-black' : ''
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

<<<<<<< HEAD
        {/* Doctor cards grid */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filteredDoctors.map((item) => (
            <div
              key={item._id}
=======
        {/* كروت الأطباء */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filteredDoctors.map((item, index) => (
            <div
              key={index}
>>>>>>> 89b34ae6b2302e7acd10e20fa5da75938723240f
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500'
            >
              <img className='bg-blue-50 w-full' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Doctors