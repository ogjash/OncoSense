import DashboardLayout from '../../components/DashboardLayout';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, addHours, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion'; // Updated import for animations

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
  const [formErrors, setFormErrors] = useState({});
  const [draggedAppointment, setDraggedAppointment] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  
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

  const handleAddAppointment = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!newAppointment.patientName.trim()) errors.patientName = 'Patient name is required';
    if (!newAppointment.doctor) errors.doctor = 'Doctor is required';
    if (!newAppointment.time) errors.time = 'Appointment time is required';
    if (!newAppointment.purpose.trim()) errors.purpose = 'Purpose is required';
    
    // If there are errors, show them and don't proceed
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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
    setFormErrors({});
  };
  
  // Drag and drop handlers
  const handleDragStart = (appointment) => {
    setDraggedAppointment(appointment);
  };

  const handleDragOver = (doctor, timeSlot) => {
    const hour = timeSlot.getHours();
    const formattedHour = `${hour}:00`;
    setDragTarget({doctor, time: formattedHour, dateTime: new Date(currentDate).setHours(hour, 0, 0, 0)});
  };

  const handleDrop = () => {
    if (draggedAppointment && dragTarget) {
      // Check if target slot is already occupied
      const isSlotOccupied = appointments.some(app => 
        app.id !== draggedAppointment.id && 
        app.doctor === dragTarget.doctor && 
        app.time === dragTarget.time
      );

      if (!isSlotOccupied) {
        const updatedAppointments = appointments.map(app => {
          if (app.id === draggedAppointment.id) {
            return {
              ...app,
              doctor: dragTarget.doctor,
              time: dragTarget.time,
              dateTime: dragTarget.dateTime
            };
          }
          return app;
        });
        
        setAppointments(updatedAppointments);
      }
    }
    
    // Reset drag state
    setDraggedAppointment(null);
    setDragTarget(null);
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
                            const hour = timeSlot.getHours();
                            const formattedHour = `${hour}:00`;
                            const isDropTarget = dragTarget && dragTarget.doctor === doctor && dragTarget.time === formattedHour;
                            
                            return (
                              <td 
                                key={`${doctor}-${index}`} 
                                className={`p-2 border-r h-24 relative transition-colors ${isDropTarget ? 'bg-purple-50' : ''}`}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  handleDragOver(doctor, timeSlot);
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  handleDrop();
                                }}
                              >
                                {appointment ? (
                                  <motion.div 
                                    draggable
                                    onDragStart={() => handleDragStart(appointment)}
                                    whileHover={{ scale: 1.02 }}
                                    className={`absolute inset-1 rounded-lg p-2 cursor-move ${
                                      appointment.progress === 'Confirmed' ? 'bg-green-100 border-l-4 border-green-500 text-green-800' :
                                      appointment.progress === 'In Progress' ? 'bg-blue-100 border-l-4 border-blue-500 text-blue-800' :
                                      'bg-amber-100 border-l-4 border-amber-500 text-amber-800'
                                    }`}
                                  >
                                    <div className="flex justify-between items-start">
                                      <p className="font-medium">{appointment.patientName}</p>
                                      <div className="cursor-pointer p-1 rounded hover:bg-white/50" title="Drag to reschedule">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 013 0m-3-3.5v3m0 4.5v3" />
                                        </svg>
                                      </div>
                                    </div>
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
                                  </motion.div>
                                ) : (
                                  <div 
                                    className="w-full h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer group"
                                    onClick={() => {
                                      setNewAppointment({
                                        ...newAppointment,
                                        time: `${timeSlot.getHours()}:00`,
                                        doctor: doctor
                                      });
                                      setShowModal(true);
                                    }}
                                  >
                                    <motion.div 
                                      whileHover={{ scale: 1.2, rotate: 90 }}
                                      transition={{ duration: 0.2 }}
                                      className="opacity-50 group-hover:opacity-100"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                      </svg>
                                    </motion.div>
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
      </motion.div>
      
      {/* Modal for adding new appointment - Styled like Doctor Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Add New Appointment</h2>
                <motion.button 
                  onClick={() => setShowModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              <form className="space-y-4" onSubmit={handleAddAppointment}>
                {/* Patient Name */}
                <div>
                  <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    id="patient-name"
                    className={`mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                      formErrors.patientName ? 'border-red-500 ring-1 ring-red-500' : ''
                    }`}
                    placeholder="John Doe"
                    value={newAppointment.patientName}
                    onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                    required
                  />
                  {formErrors.patientName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.patientName}</p>
                  )}
                </div>

                {/* Doctor field */}
                <div>
                  <label htmlFor="appointment-doctor" className="block text-sm font-medium text-gray-700">
                    Doctor *
                  </label>
                  <select
                    id="appointment-doctor"
                    className={`mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                      formErrors.doctor ? 'border-red-500 ring-1 ring-red-500' : ''
                    }`}
                    value={newAppointment.doctor}
                    onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                    required
                  >
                    <option value="" disabled>Select doctor</option>
                    {mockDoctors.map((doctor) => (
                      <option key={doctor} value={doctor}>{doctor}</option>
                    ))}
                  </select>
                  {formErrors.doctor && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.doctor}</p>
                  )}
                </div>

                {/* Time field */}
                <div>
                  <label htmlFor="appointment-time" className="block text-sm font-medium text-gray-700">
                    Time *
                  </label>
                  <select
                    id="appointment-time"
                    className={`mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                      formErrors.time ? 'border-red-500 ring-1 ring-red-500' : ''
                    }`}
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    required
                  >
                    <option value="" disabled>Select time</option>
                    {timeSlots
                      .filter(slot => !isBreakTime(slot))
                      .map((timeSlot, index) => (
                        <option key={index} value={`${timeSlot.getHours()}:00`}>
                          {formatTime(timeSlot)}
                        </option>
                      ))
                    }
                  </select>
                  {formErrors.time && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.time}</p>
                  )}
                </div>

                {/* Purpose field */}
                <div>
                  <label htmlFor="appointment-purpose" className="block text-sm font-medium text-gray-700">
                    Purpose *
                  </label>
                  <input
                    type="text"
                    id="appointment-purpose"
                    className={`mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                      formErrors.purpose ? 'border-red-500 ring-1 ring-red-500' : ''
                    }`}
                    placeholder="Consultation, Follow-up, etc."
                    value={newAppointment.purpose}
                    onChange={(e) => setNewAppointment({...newAppointment, purpose: e.target.value})}
                    required
                  />
                  {formErrors.purpose && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.purpose}</p>
                  )}
                </div>

                {/* Status field */}
                <div>
                  <label htmlFor="appointment-status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="appointment-status"
                    className="mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2"
                    value={newAppointment.progress}
                    onChange={(e) => setNewAppointment({...newAppointment, progress: e.target.value})}
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting">Waiting</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="flex justify-end space-x-3 pt-4 mt-4 border-t">
                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Add Appointment
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Dragging indicator - shows a floating element while dragging */}
      {draggedAppointment && (
        <div 
          className="fixed z-50 pointer-events-none"
          style={{ 
            left: `${window.event?.clientX + 15}px`, 
            top: `${window.event?.clientY + 15}px`,
            transform: 'translate(0, 0)'
          }}
        >
          <div className="bg-white rounded-lg p-3 shadow-xl border-2 border-purple-500 opacity-90">
            <div className="text-sm font-medium">{draggedAppointment.patientName}</div>
            <div className="text-xs text-gray-500">{draggedAppointment.time} • {draggedAppointment.purpose}</div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Reservations;