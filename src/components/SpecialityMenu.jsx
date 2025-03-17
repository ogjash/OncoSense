import React from 'react'
import { specialityData } from '../assets/images/assets'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 pb-4 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free</p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full sm:pl-56 lg:pl-0 overflow-scroll hide-scrollbar">
      {specialityData.map((item, index) => (
            <Link to={`/doctors/${item.speciality}`} key={index} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
                {/* <div className='flex items-center gap-4 p-4 bg-white shadow-md rounded-md'> */}
                <img src={item.image} alt="" className='w-16 sm:w-24 mb-2 rounded-full' />
                {/* <div> */}
                    <h2 className='text-lg font-semibold'>{item.speciality}</h2>
                    <p className='text-gray-600'>{item.doctors} Doctors</p>
                {/* </div> */}
                {/* </div> */}
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
