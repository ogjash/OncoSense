import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctors } from '../assets/images/assets.js';

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [speciality, docId]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply Browse through our extensive list of trusted doctors.</p>
      <div className='w-full flex gap-4 overflow-x-auto pt-5 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 min-w-[200px]' key={index}>
            <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <p className='w-2 h-2 rounded-full bg-green-500'></p><p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => { navigate("/alldoctors"); scrollTo(0, 0) }} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'>More</button>
    </div>
  );
};

export default RelatedDoctors;