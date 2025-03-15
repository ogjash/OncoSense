import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import CircuitLine from '../components/CircuitLine';
import { toast } from 'react-toastify';
import React,{ useState } from 'react';
import { useAuth } from '../context/UseAuth';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    // Common fields
    email: '',
    password: '',
    confirmPassword: '',
    
    // Hospital Admin fields
    hospitalName: '',
    hospitalAddress: '',
    hospitalPhone: '',
    adminName: '',
    contactDetails: {
      phone: '',
    },
    departments: [],
    
    // Patient fields
    patientName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    bloodGroup: '',
    allergies: '',
    chronicConditions: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    }
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const departments = [
    "Emergency Medicine",
    "Internal Medicine",
    "Surgery",
    "Pediatrics",
    "Obstetrics & Gynecology",
    "Cardiology",
    "Orthopedics",
    "Neurology",
    "Oncology",
    "Radiology",
    "Laboratory",
    "Pharmacy",
    "Intensive Care Unit (ICU)",
    "Anesthesiology",
    "Dental",
    "Ophthalmology",
    "ENT",
    "Psychiatry",
    "Physical Therapy",
    "Nutrition & Dietetics"
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDepartmentToggle = (dept) => {
    if (!formData.departments.includes(dept)) {
      setFormData(prev => ({
        ...prev,
        departments: [...prev.departments, dept]
      }));
    }
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const removeDepartment = (dept) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.filter(d => d !== dept)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        role: role,
        ...(role === 'hospital' ? {
          hospitalName: formData.hospitalName,
          hospitalAddress: formData.hospitalAddress,
          hospitalPhone: formData.hospitalPhone,
          adminName: formData.adminName,
          contactDetails: formData.contactDetails,
          departments: formData.departments,
        } : {
          patientName: formData.patientName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          phone: formData.phone,
          bloodGroup: formData.bloodGroup,
          allergies: formData.allergies,
          chronicConditions: formData.chronicConditions,
          emergencyContact: formData.emergencyContact,
          address: formData.address,
        })
      };
  
      await signup(userData);
      toast.success('Account created successfully!');
      navigate(role === 'hospital' ? '/dashboard' : '/patients');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#170b2c] to-[#220046]">
      <CircuitLine />
      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-2xl mx-4"
      >
        {/* Card Background */}
        <div className="absolute inset-0 bg-secondary/40 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-lg shadow-primary/10"></div>
        
        {/* Content */}
        <div className="relative p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 text-gray-400 hover:text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
            <p className="text-gray-400">Join OncoSense today</p>
          </div>

          {/* Progress Steps - Only show in step 2 and beyond */}
          {step > 1 && (
            <div className="flex justify-between mb-8">
              {/* Show 2 steps for patients but 3 steps for hospitals */}
              {[...Array(role === 'hospital' ? 3 : 2)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 mx-1 rounded-full ${
                    i <= step - 2 ? 'bg-primary' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">Choose Your Account Type</h3>
                  <p className="text-gray-400">Select the type of account you want to create</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hospital Admin Option */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('hospital')}
                    className="p-6 bg-secondary/50 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors text-left"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Hospital Admin</h4>
                    </div>
                    <p className="text-gray-400 text-sm">Register your medical facility and manage appointments, staff, and patient records.</p>
                  </button>

                  {/* Patient Option */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('patient')}
                    className="p-6 bg-secondary/50 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors text-left"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Patient</h4>
                    </div>
                    <p className="text-gray-400 text-sm">Create your patient account to book appointments, view medical records, and track your health journey.</p>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && role === 'hospital' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-300 mb-2">
                    Hospital/Clinic Name
                  </label>
                  <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                    placeholder="Enter hospital/clinic name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hospital Address
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="hospitalAddress"
                      value={formData.hospitalAddress}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                      placeholder="Street Address"
                      required
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                        placeholder="City"
                        required
                      />
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                        placeholder="State"
                        required
                      />
                      <input
                        type="text"
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                        placeholder="ZIP Code"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="hospitalPhone" className="block text-sm font-medium text-gray-300 mb-2">
                    Hospital Phone
                  </label>
                  <input
                    type="tel"
                    name="hospitalPhone"
                    value={formData.hospitalPhone}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                    placeholder="Enter hospital phone number"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-primary text-primary hover:bg-primary/10 py-3 rounded-lg transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* NEW Step 3: Department Selection for Hospitals */}
            {step === 3 && role === 'hospital' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Select Departments</h3>
                  <p className="text-gray-400">Choose the departments available in your facility</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Available Departments
                  </label>
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setIsDropdownOpen(true);
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                        placeholder="Search departments..."
                      />
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <svg
                          className={`w-5 h-5 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-secondary/95 backdrop-blur-xl rounded-lg border border-primary/20 shadow-lg max-h-60 overflow-y-auto">
                        {filteredDepartments.map((dept) => (
                          <button
                            key={dept}
                            type="button"
                            onClick={() => handleDepartmentToggle(dept)}
                            className={`w-full px-4 py-2 text-left text-gray-300 hover:bg-primary/20 transition-colors ${
                              formData.departments?.includes(dept) ? 'bg-primary/10' : ''
                            }`}
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Selected Departments Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.departments?.map((dept) => (
                        <div
                          key={dept}
                          className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          <span>{dept}</span>
                          <button
                            type="button"
                            onClick={() => removeDepartment(dept)}
                            className="text-primary hover:text-primary-dark"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 border border-primary text-primary hover:bg-primary/10 py-3 rounded-lg transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && role === 'patient' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
            <div className="grid grid-cols-2 gap-4">
              <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                </label>
                <input
                  type="text"
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                  className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                      placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-300 mb-2">
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                      required
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-300 mb-2">
                      Allergies
                    </label>
                    <input
                      type="text"
                      id="allergies"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                      placeholder="Enter any allergies (if none, write 'None')"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="chronicConditions" className="block text-sm font-medium text-gray-300 mb-2">
                    Chronic Conditions
                </label>
                <input
                  type="text"
                    id="chronicConditions"
                    name="chronicConditions"
                    value={formData.chronicConditions}
                    onChange={handleChange}
                  className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                    placeholder="Enter any chronic conditions (if none, write 'None')"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-primary text-primary hover:bg-primary/10 py-3 rounded-lg transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {((step === 4 && role === 'hospital') || (step === 3 && role === 'patient')) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-white mb-0.5">
                    {role === 'hospital' ? 'Hospital Admin Details' : 'Emergency Contact & Address'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {role === 'hospital' 
                      ? 'Enter the details of the hospital administrator'
                      : 'Provide your emergency contact and address information'}
                  </p>
                </div>

                {role === 'hospital' ? (
                  <>
                      <div>
                        <label htmlFor="adminName" className="block text-xs font-medium text-gray-300 mb-1">
                          Administrator Name
                        </label>
                        <input
                          id="adminName"
                          name="adminName"
                          type="text"
                          value={formData.adminName}
                          onChange={handleChange}
                          className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                          placeholder="John Doe"
                          required
                        />
                      </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Contact Details
                      </label>
                      <div>
                        <input
                          type="tel"
                          name="contactDetails.phone"
                          value={formData.contactDetails.phone}
                          onChange={handleChange}
                          className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                          placeholder="Phone Number"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Emergency Contact Name
                        </label>
                        <input
                          type="text"
                          name="emergencyContact.name"
                          value={formData.emergencyContact.name}
                          onChange={handleChange}
                          className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                          placeholder="Emergency contact name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Relationship
                        </label>
                        <input
                          type="text"
                          name="emergencyContact.relationship"
                          value={formData.emergencyContact.relationship}
                          onChange={handleChange}
                          className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                          placeholder="Relationship with emergency contact"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Emergency Contact Phone
                        </label>
                        <input
                          type="tel"
                          name="emergencyContact.phone"
                          value={formData.emergencyContact.phone}
                          onChange={handleChange}
                          className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                          placeholder="Emergency contact phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleChange}
                          className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                          placeholder="Street address"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleChange}
                            className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                            placeholder="City"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleChange}
                            className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                            placeholder="State"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            name="address.zipCode"
                            value={formData.address.zipCode}
                            onChange={handleChange}
                            className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                            placeholder="ZIP Code"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                    id="email"
                    name="email"
                type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                    placeholder="Enter your email"
                required
              />
            </div>

            <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                    id="password"
                    name="password"
                type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                    placeholder="Create a password"
                required
              />
            </div>

            <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                    id="confirmPassword"
                    name="confirmPassword"
                type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-secondary/50 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 text-sm"
                    placeholder="Confirm your password"
                required
              />
            </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(role === 'hospital' ? 3 : 2)}
                    className="flex-1 border border-primary text-primary hover:bg-primary/10 py-2 rounded-lg transition-colors font-medium text-sm"
                  >
                    Back
                  </button>
            <button
              type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition-colors font-medium text-sm"
            >
              Create Account
            </button>
              </div>
              </motion.div>
            )}
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;