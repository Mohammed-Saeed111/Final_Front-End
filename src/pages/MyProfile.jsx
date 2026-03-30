import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {
  const { userData, saveProfile } = useContext(AppContext)

  const [formData, setFormData] = useState({
    name: '', phone: '', address: { line1: '', line2: '' }, dob: '', gender: 'Not Selected', image: ''
  })
  const [isEdit, setIsEdit] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // تحميل بيانات المستخدم وتحديث formData في كل مرة
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        phone: userData.phone || '',
        address: { line1: userData.address?.line1 || '', line2: userData.address?.line2 || '' },
        dob: userData.dob || '',
        gender: userData.gender || 'Not Selected',
        image: userData.image || '',
      })
    }
  }, [userData])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    const { name, phone, address, dob, gender } = formData
    const success = await saveProfile({ name, phone, address, dob, gender }, imageFile)
    if (success) {
      setIsEdit(false)
      setImageFile(null)
      setImagePreview(null)
    }
  }

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      <label className={isEdit ? 'cursor-pointer w-36' : 'w-36'}>
        <img className='w-36 rounded' src={imagePreview || formData.image || assets.profile_pic} alt="profile" />
        {isEdit && <input type="file" accept="image/*" className='hidden' onChange={handleImageChange} />}
      </label>

      {isEdit
        ? <input className='bg-gray-50 text-3xl font-medium max-w-64 mt-4' type="text"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} />
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{formData.name}</p>
      }

      <hr className='bg-zinc-400 h-px border-none' />

      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>

          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData?.email}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit
            ? <input className='bg-gray-100 max-w-52' type="text" value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
            : <p className='text-blue-400'>{formData.phone || '---'}</p>
          }

          <p className='font-medium'>Address:</p>
          {isEdit
            ? <p>
                <input className='bg-gray-50' type="text" value={formData.address.line1}
                  onChange={e => setFormData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                <br />
                <input className='bg-gray-50' type="text" value={formData.address.line2}
                  onChange={e => setFormData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
              </p>
            : <p className='text-gray-500'>{formData.address.line1 || '---'}<br />{formData.address.line2}</p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>

          <p className='font-medium'>Gender:</p>
          {isEdit
            ? <select className='max-w-24 bg-gray-100' value={formData.gender}
                onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value }))}>
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            : <p className='text-gray-400'>{formData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>
          {isEdit
            ? <input className='max-w-32 bg-gray-100' type="date" value={formData.dob}
                onChange={e => setFormData(prev => ({ ...prev, dob: e.target.value }))} />
            : <p className='text-gray-400'>{formData.dob || '---'}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {isEdit
          ? <button
              className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
              onClick={handleSave}
            >
              Save information
            </button>
          : <button
              className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
        }
      </div>

    </div>
  )
}

export default MyProfile
