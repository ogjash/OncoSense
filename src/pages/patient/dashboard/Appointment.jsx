import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AppContext} from '../../../context/AppContext';
import RelatedDoctors from '../../../components/RelatedDoctors';
import { assets } from '../../../assets/images/assets';
import PatientDashboardLayout from '../../../components/PatientDashboardLayout';

const Appointment = () => {
    const {doctors} = useContext(AppContext);
    const currencySymbol = doctors?.currencySymbol || '₹';
    
    const { docId } = useParams();
    console.log("Current docId:", docId); // Verify parameter exists
    
    console.log("Doctors data:", doctors); // Verify doctors array
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId);
        setDocInfo(docInfo);
    };

    const getAvailableSlots = async() =>{
        setDocSlots([]);

        let today = new Date();
        for(let i = 0; i < 7; i++){
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if(today.getDate() === currentDate.getDate()){
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while(currentDate < endTime){
                let formattedTime = currentDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
                timeSlots.push({
                    dateTime: new Date(currentDate),
                    time: formattedTime
                });

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]));
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlots();
    }, [doctors]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    if (!docInfo) return <p className='text-black min-h-screen flex items-center justify-center text-4xl'>Loading...</p>;

    return docInfo && (
        <PatientDashboardLayout>
        <div className='flex flex-col items-center gap-8 p-6'>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='w-full bg-primary sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>
                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {docInfo.name} 
                        <img className='w-5' src={assets.verified_icon} alt="" /> 
                    </p>
                    <div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>
                    <div className='mt-4'>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>
                            About <img src="./assets/images/info_icon.png" alt="" />
                        </p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>
                        Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
                    </p>
                </div>
            </div>
            <div className='w-full max-w-4xl'>
                <p className='font-medium text-gray-700 text-lg'>Booking Slots</p>
                <div className='flex gap-3 items-center overflow-x-auto mt-4'>
                    {
                        docSlots.length && docSlots.map((item, index) => (
                            <div onClick={() => setSlotIndex(index)} className={`text-center py-3 px-4 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-500 text-white' : 'border text-gray-400 border-gray-200'}`} key={index}>
                                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                <p>{item[0] && item[0].dateTime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex gap-3 items-center overflow-x-auto mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light px-5 py-2 rounded-full cursor-pointer hide-scrollbar ${item.time === slotTime ? 'bg-blue-500 text-white' : 'text-gray-600 border border-gray-200'}`} key={index}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>
                <div className='text-center mt-6'>
                    <button className='bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full'>Book an Appointment</button>
                </div>
            </div>
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
        </PatientDashboardLayout>
    );
};

export default Appointment;