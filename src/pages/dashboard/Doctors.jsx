import DashboardLayout from '../../components/DashboardLayout';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, updateDoc, arrayUnion, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../fireabase";
import { useAuth } from "../../context/UseAuth";
import { toast } from 'react-toastify';

const Doctors = () => {
  const { currentUser } = useAuth();

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
  const [showCustomDepartment, setShowCustomDepartment] = useState(false);
  const [customDepartment, setCustomDepartment] = useState('');
  const [showDeptFilter, setShowDeptFilter] = useState(false);
  
  const deptFilterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (deptFilterRef.current && !deptFilterRef.current.contains(event.target)) {
        setShowDeptFilter(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deptFilterRef]);
  
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    department: '',
    phone: '',
    email: '',
    photo: "https://randomuser.me/api/portraits/lego/1.jpg",
    availability: true
  });

  const [formErrors, setFormErrors] = useState({});
  
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Function to check if doctor is currently available based on time
  const isDoctorAvailable = useCallback((doctor) => {
    if (!doctor.availability || !doctor.timings || !doctor.workingDays) {
      return false;
    }
    
    // Parse the doctor's working days
    const doctorDays = doctor.workingDays.split(', ').map(day => day.toLowerCase());
    
    const currentDayShort = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(currentTime).substring(0, 3);
    
    // Check if today is in doctor's working days
    const isWorkingDay = doctorDays.some(day => 
      day.toLowerCase() === currentDayShort.toLowerCase()
    );
    
    if (!isWorkingDay) return false;
    
    const [startTimeStr, endTimeStr] = doctor.timings.split(' - ');
    
    if (!startTimeStr || !endTimeStr) return false;
    
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    const startTimeParts = startTimeStr.match(/(\d+):(\d+)\s*([AP]M)/i);
    if (!startTimeParts) return false;
    
    let startHour = parseInt(startTimeParts[1]);
    const startMinute = parseInt(startTimeParts[2]);
    const startAmPm = startTimeParts[3].toUpperCase();
    
    if (startAmPm === 'PM' && startHour < 12) startHour += 12;
    if (startAmPm === 'AM' && startHour === 12) startHour = 0;
    
    const endTimeParts = endTimeStr.match(/(\d+):(\d+)\s*([AP]M)/i);
    if (!endTimeParts) return false;
    
    let endHour = parseInt(endTimeParts[1]);
    const endMinute = parseInt(endTimeParts[2]);
    const endAmPm = endTimeParts[3].toUpperCase();
    
    if (endAmPm === 'PM' && endHour < 12) endHour += 12;
    if (endAmPm === 'AM' && endHour === 12) endHour = 0;
    
    const startTimeMinutes = startHour * 60 + startMinute;
    const endTimeMinutes = endHour * 60 + endMinute;
    
    // Check if current time is within doctor's working hours
    return currentMinutes >= startTimeMinutes && currentMinutes <= endTimeMinutes;
  }, [currentTime]);
  
  useEffect(() => {
    const fetchDoctors = async () => {
      let isMounted = true;
      
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "users"));
        const doctorsList = [];
        const allDepartments = new Set();
        
        // Process all users
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          
          // Collect doctors from the data
          if (data.doctors && Array.isArray(data.doctors)) {
            const doctorsWithIds = data.doctors.map(doctor => ({
              ...doctor,
              id: doctor.id || Date.now() + Math.random().toString(36).substring(2, 9),
              currentlyAvailable: false
            }));
            
            doctorsList.push(...doctorsWithIds);
            
            // Extract unique departments
            data.doctors.forEach(doctor => {
              if (doctor.department) allDepartments.add(doctor.department);
            });
          }
          
          // Collect departments from user data
          if (data.departments && Array.isArray(data.departments)) {
            data.departments.forEach(dept => {
              if (dept) allDepartments.add(dept);
            });
          }
        });
        
        if (!isMounted) return;

        const doctorsWithAvailability = doctorsList.map(doctor => ({
          ...doctor,
          currentlyAvailable: isDoctorAvailable(doctor)
        }));
        
        setDoctors(doctorsWithAvailability);
        setFilteredDoctors(sortData(doctorsWithAvailability, sortConfig));
        
        const departmentsArray = Array.from(allDepartments)
          .filter(dept => dept && dept.trim() !== '')
          .sort();
          
        setDepartments(departmentsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors and departments: ", error);
        if (isMounted) {
          toast.error("Error loading data");
          setLoading(false);
        }
      }
      
      return () => {
        isMounted = false;
      };
    };

    fetchDoctors();
  }, [isDoctorAvailable, sortConfig]);

const handleDepartmentFilter = (department) => {
  setShowDeptFilter(false);
  setSelectedDepartment(department);
  setLoading(true);
  
  setTimeout(() => {
    try {
      if (department === 'All') {
        setFilteredDoctors(sortData([...doctors], sortConfig));
      } else {
        const filtered = doctors.filter(doctor => 
          doctor.department && 
          doctor.department.toLowerCase() === department.toLowerCase()
        );
        
        if (filtered.length > 0) {
          console.log(`Found ${filtered.length} doctors in department ${department}`);
          setFilteredDoctors(sortData(filtered, sortConfig));
        } else {
          console.log(`No doctors found in department ${department}`);
          setFilteredDoctors([]);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error filtering departments:", error);
      setFilteredDoctors([...doctors]);
      setLoading(false);
      toast.error("Error filtering departments");
    }
  }, 10);
};

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    const newConfig = { key, direction };
    setSortConfig(newConfig);
    
    const sortedDoctors = sortData([...filteredDoctors], newConfig);
    const uniqueDoctors = Array.from(new Map(sortedDoctors.map(doctor => [doctor.id, doctor])).values());
    setFilteredDoctors(uniqueDoctors);
  };

  const sortData = (data, config) => {
    if (!config.key || !Array.isArray(data)) return data;
    
    return [...data].sort((a, b) => {
      const valueA = (a[config.key] || '').toString().toLowerCase();
      const valueB = (b[config.key] || '').toString().toLowerCase();
      
      if (valueA < valueB) {
        return config.direction === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return config.direction === 'ascending' ? 1 : -1;
      }
      return a.id - b.id;
    });
  };

  const toggleAddDoctorModal = () => {
    setShowAddDoctorModal(!showAddDoctorModal);
  };

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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldMap = {
      'doctor-name': 'name',
      'doctor-department': 'department',
      'doctor-phone': 'phone',
      'doctor-email': 'email',
      'custom-department': 'customDepartment'
    };
    
    const field = fieldMap[id] || id;
    
    if (id === 'doctor-department') {
      if (value === 'custom') {
        setShowCustomDepartment(true);
        setNewDoctor({
          ...newDoctor,
          department: ''
        });
      } else {
        setShowCustomDepartment(false);
        setNewDoctor({
          ...newDoctor,
          department: value
        });
      }
    } else if (id === 'custom-department') {
      setCustomDepartment(value);
      setNewDoctor({
        ...newDoctor,
        department: value
      });
    } else if (id === 'doctor-phone') {
      const numericValue = value.replace(/\D/g, '').substring(0, 10);
      setNewDoctor({
        ...newDoctor,
        phone: numericValue
      });
    } else {
      setNewDoctor({
        ...newDoctor,
        [field]: value
      });
    }
  };

  // Modified Add Doctor form submission
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!newDoctor.name.trim()) errors.name = 'Name is required';
    
    if (showCustomDepartment) {
      if (!customDepartment.trim()) errors.department = 'Department name is required';
    } else if (!newDoctor.department) {
      errors.department = 'Department is required';
    }
    
    const phoneRegex = /^\d{10}$/;
    if (!newDoctor.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(newDoctor.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits';
    }
    
    if (!newDoctor.email.trim()) errors.email = 'Email is required';
    if (selectedDays.length === 0) errors.days = 'At least one working day is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
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
      id: Date.now(),
      name: newDoctor.name.trim(),
      department: newDoctor.department.trim(),
      phone: newDoctor.phone,
      email: newDoctor.email.trim(),
      photo: newDoctor.photo,
      availability: true,
      workingDays: workingDaysFormatted,
      timings: `${formatTime(startTime)} - ${formatTime(endTime)}`
    };
    
    // Add to doctors list
    const updatedDoctors = [...doctors, newDoctorObj];
    setDoctors(updatedDoctors);
    
    if (selectedDepartment === 'All' || selectedDepartment.toLowerCase() === newDoctorObj.department.toLowerCase()) {
      setFilteredDoctors([...filteredDoctors, newDoctorObj]);
    }
    
    try {
      const adminDocRef = doc(db, "users", currentUser.uid);
      
      const departmentExists = departments.some(
        dept => dept.toLowerCase() === newDoctorObj.department.toLowerCase()
      );
      
      if (showCustomDepartment && customDepartment.trim() && !departmentExists) {
        await updateDoc(adminDocRef, {
          departments: arrayUnion(customDepartment.trim()),
          doctors: arrayUnion(newDoctorObj)
        });
        
        const updatedDepartments = [...departments, customDepartment.trim()];
        setDepartments(updatedDepartments);
      } else {
        await updateDoc(adminDocRef, {
          doctors: arrayUnion(newDoctorObj)
        });
      }
      toast.success("Doctor added successfully");
      
      setNewDoctor({
        name: '',
        department: '',
        phone: '',
        email: '',
        photo: 'https://randomuser.me/api/portraits/lego/1.jpg',
        availability: true
      });
      setShowCustomDepartment(false);
      setCustomDepartment('');
      setSelectedDays([]);
      setStartTime('09:00');
      setEndTime('17:00');
      setFormErrors({});
      
      toggleAddDoctorModal();
    } catch (error) {
      console.log(error);
      toast.error("Error updating database: " + error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      const updatedDoctors = doctors.map(doctor => ({
        ...doctor,
        currentlyAvailable: isDoctorAvailable(doctor)
      }));
      
      setDoctors(updatedDoctors);
      
      if (selectedDepartment === 'All') {
        setFilteredDoctors(sortData(updatedDoctors, sortConfig));
      } else {
        const filtered = updatedDoctors.filter(doctor => 
          doctor.department && doctor.department.toLowerCase() === selectedDepartment.toLowerCase()
        );
        setFilteredDoctors(sortData(filtered, sortConfig));
      }
    }
  }, [currentTime, isDoctorAvailable]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="px-3 py-1 rounded-full bg-purple-100 text-sm font-medium text-purple-800 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {filteredDoctors.length} Doctors
            </motion.span>
            
            <div className="relative inline-block">
              <select
                id="department-filter"
                value={selectedDepartment}
                onChange={(e) => handleDepartmentFilter(e.target.value)}
                className="block appearance-none w-auto px-4 py-1.5 text-sm bg-white text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 pr-8"
              >
                <option value="All" className="text-gray-800">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="text-gray-800">{dept}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                  <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          
          <motion.button 
            onClick={toggleAddDoctorModal}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-md flex items-center gap-2 font-medium transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Doctor</span>
          </motion.button>
        </div>
        
        {/* Active Filters Display */}
        {selectedDepartment !== 'All' && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600 font-medium py-1">Active filters:</span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Department: {selectedDepartment}
              <button
                type="button"
                className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-purple-200 text-purple-700 hover:bg-purple-300 focus:outline-none"
                onClick={() => handleDepartmentFilter('All')}
              >
                <span className="sr-only">Remove filter</span>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          </div>
        )}

        {/* Doctors table */}
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
                  <AnimatePresence mode="wait">
                    {filteredDoctors.map((doctor, index) => (
                      <motion.tr 
                        key={`doctor-row-${doctor.id}`}
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
                          <div className="flex flex-col items-start">
                            <span
                              className={`inline-flex px-2 py-0.5 text-xs leading-4 font-medium rounded-full ${
                                doctor.currentlyAvailable
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {doctor.currentlyAvailable && (
                                <span className="relative -ml-0.5 mr-1 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                              )}
                              {doctor.currentlyAvailable ? 'Available Now' : 'Unavailable'}
                            </span>
                            
                            {!doctor.currentlyAvailable && doctor.availability && (
                              <span className="text-xs text-gray-500 mt-1 pl-1">
                                {isWorkingDayToday(doctor) ? 'Returns at next shift' : 'Not working today'}
                              </span>
                            )}
                          </div>
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
            <div className="py-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No doctors found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {selectedDepartment !== 'All' 
                  ? `There are no doctors in the ${selectedDepartment} department.` 
                  : 'No doctors have been added yet.'}
              </p>
              <div className="flex justify-center space-x-3">
                {selectedDepartment !== 'All' && (
                  <button
                    type="button"
                    onClick={() => handleDepartmentFilter('All')}
                    className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View All Departments
                  </button>
                )}
                <button
                  type="button"
                  onClick={toggleAddDoctorModal}
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Add New Doctor
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

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
                    required={!showCustomDepartment}
                  >
                    <option value="" disabled>Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                    <option value="custom">+ Add New Department</option>
                  </select>
                  
                  {showCustomDepartment && (
                    <input
                      type="text"
                      id="custom-department"
                      placeholder="Enter department name"
                      value={customDepartment}
                      onChange={handleInputChange}
                      className={`mt-2 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                        formErrors.department ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      required
                    />
                  )}
                  
                  {formErrors.department && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.department}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="doctor-phone" className="block text-sm font-medium text-gray-700">
                      Phone Number * <span className="text-xs text-gray-500">(10 digits)</span>
                    </label>
                    <input
                      type="tel"
                      id="doctor-phone"
                      className={`mt-1 block w-full rounded-md border-0 shadow-sm bg-gray-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-900 px-3 py-2 ${
                        formErrors.phone ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      placeholder="9876543210"
                      value={newDoctor.phone}
                      onChange={handleInputChange}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      {newDoctor.phone.length}/10 digits
                    </p>
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

                {/* Working Days */}
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

                {/* Timings */}
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

// Helper function to check if today is a doctor's working day
function isWorkingDayToday(doctor) {
  if (!doctor.workingDays) return false;
  
  const doctorDays = doctor.workingDays.split(', ').map(day => day.toLowerCase());
  const currentDayShort = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
    .format(new Date()).substring(0, 3).toLowerCase();
  
  return doctorDays.some(day => day.toLowerCase() === currentDayShort);
}

function formatTime(time) {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}

export default Doctors;