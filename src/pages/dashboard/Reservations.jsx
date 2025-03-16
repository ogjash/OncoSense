import DashboardLayout from '../../components/DashboardLayout';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, addHours, parseISO } from 'date-fns';
import { motion } from 'framer-motion'; // Add this import for animations

const Reservations = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day'); // 'day' or 'week'
  const [department, setDepartment] = useState('All');
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctor: '',
    time: '',
    purpose: '',
    progress: 'Confirmed'
  });
  
  // Mock data for demonstration
  const mockDoctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'];
  const mockDepartments = ['All', 'Oncology', 'Radiology', 'Surgery', 'General'];
  
  // Better time representation - using actual Date objects
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = new Date(currentDate);
    startTime.setHours(9, 0, 0, 0);
    
    for (let i = 0; i < 9; i++) {
      const slotTime = new Date(startTime);
      slotTime.setHours(startTime.getHours() + i);
      slots.push(slotTime);
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Function to check if a timeslot is a break time (1 PM)
  const isBreakTime = (timeSlot) => {
    return timeSlot.getHours() === 13;
  };
  
  useEffect(() => {
    // Simulated data fetching with more realistic data
    const mockAppointments = [
      { 
        id: 1, 
        patientName: 'John Doe', 
        doctor: 'Dr. Smith', 
        time: '10:00', 
        dateTime: new Date(currentDate).setHours(10, 0, 0, 0),
        purpose: 'Consultation', 
        progress: 'Confirmed',
        color: 'green'
      },
      { 
        id: 2, 
        patientName: 'Jane Smith', 
        doctor: 'Dr. Johnson', 
        time: '11:00',
        dateTime: new Date(currentDate).setHours(11, 0, 0, 0),
        purpose: 'Follow-up', 
        progress: 'In Progress',
        color: 'blue'
      },
      { 
        id: 3, 
        patientName: 'Robert Brown', 
        doctor: 'Dr. Williams', 
        time: '14:00', 
        dateTime: new Date(currentDate).setHours(14, 0, 0, 0),
        purpose: 'Test Results', 
        progress: 'Waiting',
        color: 'yellow'
      },
    ];
    
    // Filter by department if necessary
    const filtered = department === 'All' 
      ? mockAppointments 
      : mockAppointments.filter(apt => apt.department === department);
    
    setAppointments(filtered);
  }, [currentDate, department]);
  
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    const daysToAdd = viewMode === 'day' ? 1 : 7;
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? daysToAdd : -daysToAdd));
    setCurrentDate(newDate);
  };
  
  const formatDate = (date) => {
    return format(date, 'MMMM d, yyyy');
  };
  
  const formatTime = (date) => {
    return format(date, 'h:mm a');
  };
  
  const hasAppointment = (doctor, timeSlot) => {
    const hour = timeSlot.getHours();
    const formattedHour = `${hour}:00`;
    return appointments.find(app => app.doctor === doctor && app.time === formattedHour);
  };

  const handleAddAppointment = () => {
    const newId = appointments.length > 0 ? Math.max(...appointments.map(apt => apt.id)) + 1 : 1;
    
    const appointmentToAdd = {
      ...newAppointment,
      id: newId,
      dateTime: new Date(currentDate).setHours(parseInt(newAppointment.time.split(':')[0]), 0, 0, 0),
      progress: newAppointment.progress || 'Confirmed',
      color: newAppointment.progress === 'Confirmed' ? 'green' : 
             newAppointment.progress === 'In Progress' ? 'blue' : 'yellow'
    };
    
    setAppointments([...appointments, appointmentToAdd]);
    setShowModal(false);
    setNewAppointment({
      patientName: '',
      doctor: '',
      time: '',
      purpose: '',
      progress: 'Confirmed'
    });
  };
  
  const getWeekDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    
    // Start from Sunday of the current week
    const day = startDate.getDay();
    startDate.setDate(startDate.getDate() - day);
    
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(startDate.getTime()));
      startDate.setDate(startDate.getDate() + 1);
    }
    
    return dates;
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Get count of appointments per doctor for today
  const getDoctorAppointmentCount = (doctor) => {
    return appointments.filter(apt => apt.doctor === doctor).length;
  };

  // New responsive helper
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DashboardLayout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-6"
      >
        {/* Calendar Top Controls - made responsive */}
        <motion.div 
          variants={slideUp}
          className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-4 lg:p-6"
        >
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 md:flex-wrap mb-6">
            {/* Total Appointments */}
            <div className="bg-purple-50 px-4 py-2 rounded-lg w-full md:w-auto">
              <span className="text-purple-700 font-medium">Total Appointments: </span>
              <span className="text-purple-900 font-bold">{appointments.length}</span>
            </div>
            
            {/* Date Selection */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigateDate('prev')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <DatePicker
                selected={currentDate}
                onChange={date => setCurrentDate(date)}
                dateFormat="MMMM d, yyyy"
                className="border border-gray-300 rounded-md px-4 py-2 text-center text-gray-800 w-full max-w-[240px]"
              />
              
              <button 
                onClick={() => navigateDate('next')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* View & Filter Controls */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  className={`px-4 py-2 rounded-md ${viewMode === 'day' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
                  onClick={() => setViewMode('day')}
                >
                  Day
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${viewMode === 'week' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
                  onClick={() => setViewMode('week')}
                >
                  Week
                </button>
              </div>
              
              {/* Department Filter */}
              <div>
                <select 
                  className="border border-gray-300 rounded-md px-4 py-2 text-gray-800"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {mockDepartments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Calendar Grid with responsive overflow */}
          <div className="overflow-auto -mx-4 px-4">
            <div className="min-w-[800px]"> {/* Force minimum width for small screens */}
              <table className="min-w-full border-collapse">
                {/* Header row with doctors */}
                <thead>
                  <tr>
                    <th className="p-3 border bg-gray-50 w-24 text-gray-700">Time</th>
                    {viewMode === 'day' ? 
                      mockDoctors.map(doctor => (
                        <th key={doctor} className="p-3 border bg-gray-50">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border-2 border-purple-300 flex-shrink-0">
                                <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="font-semibold text-gray-800 text-sm md:text-lg">{doctor}</div>
                            </div>
                            <div className="text-xs text-gray-500">
                              Today's Appointments: {getDoctorAppointmentCount(doctor)}
                            </div>
                          </div>
                        </th>
                      ))
                      :
                      getWeekDates().map((date, index) => (
                        <motion.th 
                          key={index} 
                          className="p-3 border bg-gray-50 text-gray-700"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div>{format(date, 'EEE')}</div>
                          <div>{format(date, 'MMM d')}</div>
                        </motion.th>
                      ))
                    }
                  </tr>
                </thead>
                
                {/* Calendar body */}
                <tbody>
                  {timeSlots.map((timeSlot, index) => (
                    <motion.tr 
                      key={index} 
                      className={`border-b ${isBreakTime(timeSlot) ? 'relative' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-3 border-r bg-gray-50 text-center font-medium text-gray-700">
                        {formatTime(timeSlot)}
                      </td>
                      
                      {isBreakTime(timeSlot) && (
                        <td colSpan={viewMode === 'day' ? mockDoctors.length : 7} className="relative h-24">
                          <div className="absolute inset-0 bg-gray-100/50 overflow-hidden">
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#e5e7eb_10px,#e5e7eb_20px)]"></div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white px-6 py-2 rounded-full shadow z-20 flex items-center space-x-2">
                              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-lg font-medium text-gray-800">Lunch Break</span>
                            </div>
                          </div>
                        </td>
                      )}
                      
                      {!isBreakTime(timeSlot) && (
                        viewMode === 'day' ?
                          mockDoctors.map(doctor => {
                            const appointment = hasAppointment(doctor, timeSlot);
                            return (
                              <td key={`${doctor}-${index}`} className="p-2 border-r h-24 relative">
                                {appointment ? (
                                  <div className={`absolute inset-1 rounded-lg p-2 ${
                                    appointment.progress === 'Confirmed' ? 'bg-green-100 border-l-4 border-green-500 text-green-800' :
                                    appointment.progress === 'In Progress' ? 'bg-blue-100 border-l-4 border-blue-500 text-blue-800' :
                                    'bg-amber-100 border-l-4 border-amber-500 text-amber-800'
                                  }`}
                                  >
                                    <p className="font-medium">{appointment.patientName}</p>
                                    <p className="text-sm">{appointment.time}</p>
                                    <span className="text-xs px-2 py-1 bg-white rounded-full mt-1 inline-block shadow-sm text-gray-700">
                                      {appointment.purpose}
                                    </span>
                                    <span className="text-xs px-2 py-1 ml-1 rounded-full mt-1 inline-block" style={{
                                      backgroundColor: appointment.progress === 'Confirmed' ? '#d1fae5' : 
                                                      appointment.progress === 'In Progress' ? '#dbeafe' : '#fef3c7',
                                      color: appointment.progress === 'Confirmed' ? '#065f46' : 
                                             appointment.progress === 'In Progress' ? '#1e40af' : '#92400e'
                                    }}>
                                      {appointment.progress}
                                    </span>
                                  </div>
                                ) : (
                                  <div 
                                    className="w-full h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                      setNewAppointment({
                                        ...newAppointment,
                                        time: `${timeSlot.getHours()}:00`,
                                        doctor: doctor
                                      });
                                      setShowModal(true);
                                    }}
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                  </div>
                                )}
                              </td>
                            );
                          })
                          :
                          getWeekDates().map((date, dayIdx) => {
                            const dayAppointments = appointments.filter(apt => {
                              const aptDate = new Date(apt.dateTime);
                              return aptDate.getDate() === date.getDate() && 
                                     aptDate.getMonth() === date.getMonth() &&
                                     aptDate.getHours() === timeSlot.getHours();
                            });
                            
                            return (
                              <td key={dayIdx} className="p-2 border-r h-24 relative">
                                {dayAppointments.length > 0 ? (
                                  dayAppointments.map(apt => (
                                    <div
                                      key={apt.id} 
                                      className={`mb-1 p-1 rounded-lg text-xs ${
                                        apt.progress === 'Confirmed' ? 'bg-green-100 border-l-4 border-green-500 text-green-800' :
                                        apt.progress === 'In Progress' ? 'bg-blue-100 border-l-4 border-blue-500 text-blue-800' :
                                        'bg-amber-100 border-l-4 border-amber-500 text-amber-800'
                                      }`}
                                    >
                                      <p className="font-medium">{apt.patientName}</p>
                                      <p className="text-xs text-gray-700">{apt.doctor}</p>
                                    </div>
                                  ))
                                ) : (
                                  <div 
                                    className="w-full h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                      const newDate = new Date(date);
                                      newDate.setHours(timeSlot.getHours(), 0, 0, 0);
                                      setCurrentDate(newDate);
                                      setNewAppointment({
                                        ...newAppointment,
                                        time: `${timeSlot.getHours()}:00`
                                      });
                                      setShowModal(true);
                                    }}
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                  </div>
                                )}
                              </td>
                            );
                          })
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
        
        {/* Add New Reservation Button */}
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            onClick={() => setShowModal(true)}
          >
            Add New Reservation
          </button>
        </motion.div>
      </motion.div>
      
      {/* Modal for adding new appointment */}
      {showModal && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Appointment</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                  value={newAppointment.patientName}
                  onChange={e => setNewAppointment({...newAppointment, patientName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                  value={newAppointment.doctor}
                  onChange={e => setNewAppointment({...newAppointment, doctor: e.target.value})}
                >
                  <option value="">Select Doctor</option>
                  {mockDoctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                  value={newAppointment.time}
                  onChange={e => setNewAppointment({...newAppointment, time: e.target.value})}
                >
                  <option value="">Select Time</option>
                  {timeSlots.map((timeSlot, index) => (
                    <option key={index} value={`${timeSlot.getHours()}:00`}>
                      {formatTime(timeSlot)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                  value={newAppointment.purpose}
                  onChange={e => setNewAppointment({...newAppointment, purpose: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                  value={newAppointment.progress}
                  onChange={e => setNewAppointment({...newAppointment, progress: e.target.value})}
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Waiting">Waiting</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                onClick={handleAddAppointment}
                disabled={!newAppointment.patientName || !newAppointment.doctor || !newAppointment.time}
              >
                Save Appointment
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default Reservations;