import DashboardLayout from '../../components/DashboardLayout';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  
  // Add new state for new doctor
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    department: '',
    phone: '',
    email: '',
    photo: 'https://randomuser.me/api/portraits/lego/1.jpg', // Default placeholder avatar
    availability: true
  });
  const [formErrors, setFormErrors] = useState({});

  // Sample doctor data - In a real app, this would come from an API
  const sampleDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      photo: 'https://randomuser.me/api/portraits/women/45.jpg',
      department: 'Oncology',
      phone: '+91 98765 43210',
      email: 'sjohnson@oncosense.med',
      availability: true,
      workingDays: 'Mon, Wed, Fri',
      timings: '9:00 AM - 5:00 PM'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      department: 'Radiology',
      phone: '+91 87654 32109',
      email: 'mchen@oncosense.med',
      availability: true,
      workingDays: 'Mon, Tue, Thu',
      timings: '8:00 AM - 4:00 PM'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      department: 'Hematology',
      phone: '+91 76543 21098',
      email: 'erodriguez@oncosense.med',
      availability: false,
      workingDays: 'Tue, Thu, Sat',
      timings: '10:00 AM - 6:00 PM'
    },
    {
      id: 4,
      name: 'Dr. David Wilson',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
      department: 'Oncology',
      phone: '+91 65432 10987',
      email: 'dwilson@oncosense.med',
      availability: true,
      workingDays: 'Mon, Wed, Fri',
      timings: '9:00 AM - 5:00 PM'
    },
    {
      id: 5,
      name: 'Dr. Amanda Lee',
      photo: 'https://randomuser.me/api/portraits/women/90.jpg',
      department: 'Surgical Oncology',
      phone: '+91 54321 09876',
      email: 'alee@oncosense.med',
      availability: true,
      workingDays: 'Mon to Fri',
      timings: '8:00 AM - 4:00 PM'
    }
  ];

  // Initialize data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctors(sampleDoctors);
      setFilteredDoctors(sampleDoctors);
      
      // Extract unique departments
      const uniqueDepartments = [...new Set(sampleDoctors.map(doctor => doctor.department))];
      setDepartments(uniqueDepartments);
      
      setLoading(false);
    }, 800);
  }, []);

  // Handle department filter
  const handleDepartmentFilter = (department) => {
    setSelectedDepartment(department);
    
    if (department === 'All') {
      setFilteredDoctors(sortData(doctors, sortConfig));
    } else {
      const filtered = doctors.filter(doctor => doctor.department === department);
      setFilteredDoctors(sortData(filtered, sortConfig));
    }
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    
    // Apply sort to current filtered data
    const sortedData = sortData(filteredDoctors, { key, direction });
    setFilteredDoctors(sortedData);
  };

  // Sorting function
  const sortData = (data, config) => {
    if (!config.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === 'ascending' ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Toggle add doctor modal
  const toggleAddDoctorModal = () => {
    setShowAddDoctorModal(!showAddDoctorModal);
  };

  // Table row animation variants
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  // Button hover animation variants
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { 
      scale: 0.98 
    }
  };

  // Working days options
  const daysOfWeek = [
    { id: 'mon', label: 'M', fullName: 'Monday' },
    { id: 'tue', label: 'T', fullName: 'Tuesday' },
    { id: 'wed', label: 'W', fullName: 'Wednesday' },
    { id: 'thu', label: 'T', fullName: 'Thursday' },
    { id: 'fri', label: 'F', fullName: 'Friday' },
    { id: 'sat', label: 'S', fullName: 'Saturday' },
    { id: 'sun', label: 'S', fullName: 'Sunday' }
  ];
  
  // Toggle day selection
  const toggleDaySelection = (dayId) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter(day => day !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  // New function to handle form field changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Convert form field ids to object keys
    const fieldMap = {
      'doctor-name': 'name',
      'doctor-department': 'department',
      'doctor-phone': 'phone',
      'doctor-email': 'email'
    };
    
    const field = fieldMap[id] || id;
    
    setNewDoctor({
      ...newDoctor,
      [field]: value
    });
  };

  // New function to handle doctor form submission
  const handleAddDoctor = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!newDoctor.name.trim()) errors.name = 'Name is required';
    if (!newDoctor.department) errors.department = 'Department is required';
    if (!newDoctor.phone.trim()) errors.phone = 'Phone number is required';
    if (!newDoctor.email.trim()) errors.email = 'Email is required';
    if (selectedDays.length === 0) errors.days = 'At least one working day is required';
    
    // If there are errors, show them and don't proceed
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Format working days for display
    const daysMap = {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday'
    };
    
    const workingDaysFormatted = selectedDays
      .map(day => daysMap[day].substring(0, 3))
      .join(', ');
    
    // Create new doctor object
    const newDoctorObj = {
      id: doctors.length + 1, // Simple ID generation
      name: newDoctor.name,
      department: newDoctor.department,
      phone: newDoctor.phone,
      email: newDoctor.email,
      photo: newDoctor.photo,
      availability: true,
      workingDays: workingDaysFormatted,
      timings: `${formatTime(startTime)} - ${formatTime(endTime)}`
    };
    
    // Add to doctors list
    const updatedDoctors = [...doctors, newDoctorObj];
    setDoctors(updatedDoctors);
    
    // Update filtered list if the new doctor matches current filter
    if (selectedDepartment === 'All' || selectedDepartment === newDoctorObj.department) {
      setFilteredDoctors([...filteredDoctors, newDoctorObj]);
    }
    
    // Update departments list if it's a new department
    if (!departments.includes(newDoctorObj.department)) {
      setDepartments([...departments, newDoctorObj.department]);
    }
    
    // Reset form
    setNewDoctor({
      name: '',
      department: '',
      phone: '',
      email: '',
      photo: 'https://randomuser.me/api/portraits/lego/1.jpg',
      availability: true
    });
    setSelectedDays([]);
    setStartTime('09:00');
    setEndTime('17:00');
    setFormErrors({});
    
    // Close modal
    toggleAddDoctorModal();
  };

  return (
    <DashboardLayout>
      {/* Reduced top spacing from space-y-8 to space-y-4 */}
      <div className="space-y-4">
        {/* Header with Add Doctor button and counter badge only */}
        <div className="flex justify-end items-center">
          <div className="flex items-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mr-4 px-3 py-1 rounded-full bg-purple-100 text-sm font-medium text-purple-800 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {filteredDoctors.length} Doctors
            </motion.span>
            
            <motion.button 
              onClick={toggleAddDoctorModal}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 font-medium transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Doctor</span>
              <motion.span
                initial={{ opacity: 0, rotate: -90, x: -5 }}
                animate={{ opacity: 1, rotate: 0, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Department tabs - with smooth animations */}
        <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-1 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-1 min-w-max">
              <motion.button
                onClick={() => handleDepartmentFilter('All')}
                className={`py-2.5 px-5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedDepartment === 'All'
                    ? 'bg-purple-100 text-purple-800'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                whileHover={{ scale: selectedDepartment === 'All' ? 1 : 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                All Departments
              </motion.button>
              
              {departments.map((dept) => (
                <motion.button
                  key={dept}
                  onClick={() => handleDepartmentFilter(dept)}
                  className={`py-2.5 px-5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedDepartment === dept
                      ? 'bg-purple-100 text-purple-800'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: selectedDepartment === dept ? 1 : 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {dept}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors table - with animations */}
        <motion.div 
          className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="py-20 flex flex-col justify-center items-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600"
              ></motion.div>
              <p className="mt-4 text-gray-500">Loading doctors...</p>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('name')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Name</span>
                        <motion.div animate={{ rotate: sortConfig.direction === 'ascending' ? 0 : 180 }}>
                          {sortConfig.key === 'name' && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 15l7-7 7 7" 
                              />
                            </svg>
                          )}
                        </motion.div>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Working Days
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Timings
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredDoctors.map((doctor, index) => (
                      <motion.tr 
                        key={doctor.id} 
                        custom={index}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <motion.div 
                              className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden"
                              whileHover={{ scale: 1.1 }}
                            >
                              <img className="h-10 w-10 rounded-full object-cover" src={doctor.photo} alt={doctor.name} />
                            </motion.div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            {doctor.department}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{doctor.phone}</div>
                          <div className="text-sm text-gray-500">{doctor.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doctor.workingDays}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doctor.timings}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              doctor.availability
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {doctor.availability ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <motion.button 
                              whileHover={{ scale: 1.1 }} 
                              whileTap={{ scale: 0.95 }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.1 }} 
                              whileTap={{ scale: 0.95 }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"
              >
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </motion.div>
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-lg font-medium text-gray-900 mb-2"
              >
                No doctors found
              </motion.h3>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-gray-500"
              >
                Try selecting a different department or add a new doctor.
              </motion.p>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6"
              >
                <button 
                  onClick={toggleAddDoctorModal}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Your First Doctor
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Doctor Modal - with enhanced animations */}
      <AnimatePresence>
        {showAddDoctorModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) toggleAddDoctorModal();
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
                <h2 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Add New Doctor</h2>
                <motion.button 
                  onClick={toggleAddDoctorModal} 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              <form className="space-y-4" onSubmit={handleAddDoctor}>
                {/* Name field */}
                <div>
                  <label htmlFor="doctor-name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="doctor-name"
                    className={`mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                      formErrors.name ? 'border-red-500 ring-1 ring-red-500' : ''
                    }`}
                    placeholder="Dr. John Doe"
                    value={newDoctor.name}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                {/* Department field */}
                <div>
                  <label htmlFor="doctor-department" className="block text-sm font-medium text-gray-700">
                    Department *
                  </label>
                  <select
                    id="doctor-department"
                    className={`mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                      formErrors.department ? 'border-red-500 ring-1 ring-red-500' : ''
                    }`}
                    value={newDoctor.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                    <option value="New Department">Add New Department</option>
                  </select>
                  {formErrors.department && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.department}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="doctor-phone" className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="doctor-phone"
                      className={`mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                        formErrors.phone ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      placeholder="+91 98765 43210"
                      value={newDoctor.phone}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="doctor-email" className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="doctor-email"
                      className={`mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                        formErrors.email ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      placeholder="doctor@example.com"
                      value={newDoctor.email}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Working Days - Updated with circle icons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Days *
                  </label>
                  <div className="flex justify-between">
                    {daysOfWeek.map(day => (
                      <motion.button
                        type="button"
                        key={day.id}
                        onClick={() => toggleDaySelection(day.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          selectedDays.includes(day.id) 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        title={day.fullName}
                      >
                        {day.label}
                      </motion.button>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {selectedDays.length > 0 
                      ? `Selected: ${selectedDays.map(id => daysOfWeek.find(day => day.id === id).fullName).join(', ')}` 
                      : 'Select working days by clicking on the circles'}
                  </div>
                  {formErrors.days && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.days}</p>
                  )}
                </div>

                {/* Timings - Updated with start/end time inputs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timings *
                  </label>
                  <div className="flex items-center">
                    <div className="flex-1">
                      <label htmlFor="start-time" className="block text-xs text-gray-500 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        id="start-time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div className="px-4 py-2 text-gray-500">
                      to
                    </div>
                    
                    <div className="flex-1">
                      <label htmlFor="end-time" className="block text-xs text-gray-500 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        id="end-time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Working hours: {startTime && endTime ? `${formatTime(startTime)} - ${formatTime(endTime)}` : 'Select start and end times'}
                  </p>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-2 text-sm text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md font-medium"
                    >
                      Upload
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end space-x-3 pt-4 mt-4 border-t">
                  <motion.button
                    type="button"
                    onClick={toggleAddDoctorModal}
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
                    Add Doctor
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

// Helper function to format time from 24-hour to 12-hour format
function formatTime(time) {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${formattedHour}:${minutes} ${ampm}`;
}

export default Doctors;