import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../../context/AppContext'
import PatientDashboardLayout from '../../../components/PatientDashboardLayout';
const AllDoctors = () => {

    const {speciality} = useParams();
    const [filterDoc, setFilterDoc]= useState([])
    const navigate = useNavigate();
    const {doctors} = useContext(AppContext);

    const applFilter =() =>{
        if(speciality){
            setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
        } else{
            setFilterDoc(doctors)
        }
    }

    useEffect(()=>{
        applFilter()
    },[speciality, doctors])
  return (
    <PatientDashboardLayout>
    <div className='ml-2'>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row text-gray-800 items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600' >
            <p onClick={()=>speciality==="General physician"?navigate('/doctors'):navigate('/patient/alldoctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General Physician"?"bg-indigo-100 text-black":""}`}>General Physician</p>
            <p onClick={()=>speciality==="Gynecologist"?navigate('/doctors'):navigate('/patient/alldoctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynaecologist"?"bg-indigo-100 text-black":""}`}>Gynaecologist</p>
            <p onClick={()=>speciality==="Dermatologist"?navigate('/doctors'):navigate('/patient/alldoctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist"?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
            <p onClick={()=>speciality==="Pediatricians"?navigate('/doctors'):navigate('/patient/alldoctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians"?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
            <p onClick={()=>speciality==="Neurologist"?navigate('/doctors'):navigate('/patient/alldoctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist"?"bg-indigo-100 text-black":""}`}>Neurologist</p>
            <p onClick={()=>speciality==="Gastroenterologist"?navigate('/doctors'):navigate('/patient/alldoctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
            <p onClick={()=>speciality==="Emergency Medicine"?navigate('/doctors'):navigate('/patient/alldoctors/Emergency Medicine')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Emergency Medicine"?"bg-indigo-100 text-black":""}`}>Emergency Medicine</p>
            <p onClick={()=>speciality==="Surgery"?navigate('/doctors'):navigate('/patient/alldoctors/Surgery')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Surgery"?"bg-indigo-100 text-black":""}`}>Surgery</p>
            <p onClick={()=>speciality==="Cardiology"?navigate('/doctors'):navigate('/patient/alldoctors/Cardiology')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Cardiology"?"bg-indigo-100 text-black":""}`}>Cardiology</p>
            <p onClick={()=>speciality==="Oncology"?navigate('/doctors'):navigate('/patient/alldoctors/Oncology')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Oncology"?"bg-indigo-100 text-black":""}`}>Oncology</p>
            <p onClick={()=>speciality==="Radiology"?navigate('/doctors'):navigate('/patient/alldoctors/Radiology')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Radiology"?"bg-indigo-100 text-black":""}`}>Radiology</p>
            <p onClick={()=>speciality==="Anesthesiology"?navigate('/doctors'):navigate('/patient/alldoctors/Anesthesiology')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Anesthesiology"?"bg-indigo-100 text-black":""}`}>Anesthesiology</p>
            <p onClick={()=>speciality==="ENT"?navigate('/doctors'):navigate('/patient/alldoctors/ENT')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="ENT"?"bg-indigo-100 text-black":""}`}>ENT</p>

        </div>
        <div className='w-full grid grid-cols-auto gap-4 ml-4 mb-4 mr-4 gap-y-6'>
            {
            filterDoc.map((item, index)=>(
            <div onClick={()=>navigate(`/patient/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 rounded-full bg-green-500'></p><p >Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
            </div>
        ))}
        </div>
      </div>
    </div>
    </PatientDashboardLayout>
  )
}

export default AllDoctors
