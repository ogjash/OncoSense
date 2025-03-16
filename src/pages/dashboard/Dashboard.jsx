import DashboardLayout from '../../components/DashboardLayout';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Sample data
const patientVisitData = [
  { name: 'Jan', inpatient: 65, outpatient: 35 },
  { name: 'Feb', inpatient: 59, outpatient: 42 },
  { name: 'Mar', inpatient: 80, outpatient: 55 },
  { name: 'Apr', inpatient: 81, outpatient: 56 },
  { name: 'May', inpatient: 56, outpatient: 67 },
  { name: 'Jun', inpatient: 55, outpatient: 70 },
  { name: 'Jul', inpatient: 40, outpatient: 90 },
];

const departmentData = [
  { name: 'Cardiology', value: 45 },
  { name: 'Neurology', value: 28 },
  { name: 'Oncology', value: 32 },
  { name: 'Orthopedics', value: 20 },
  { name: 'Pediatrics', value: 38 },
];

const doctorsList = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', availability: 'Available', avatar: 'SJ', patients: 48, color: 'bg-purple-600' },
  { id: 2, name: 'Dr. Robert Chen', specialty: 'Neurologist', availability: 'In Surgery', avatar: 'RC', patients: 36, color: 'bg-blue-500' },
  { id: 3, name: 'Dr. Emma Rodriguez', specialty: 'Oncologist', availability: 'Available', avatar: 'ER', patients: 52, color: 'bg-green-500' },
];

const upcomingAppointments = [
  { id: 1, time: '09:00 AM', patient: 'Michael Chen', doctor: 'Dr. Sarah Johnson', department: 'Cardiology' },
  { id: 2, time: '10:15 AM', patient: 'Rachel Green', doctor: 'Dr. Emma Rodriguez', department: 'Oncology' },
  { id: 3, time: '11:30 AM', patient: 'David Wilson', doctor: 'Dr. Robert Chen', department: 'Neurology' },
  { id: 4, time: '01:45 PM', patient: 'Sophia Martinez', doctor: 'Dr. Sarah Johnson', department: 'Cardiology' },
];

const appointmentsList = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com', date: '2023-10-15', time: '09:00 AM', doctor: 'Dr. Sarah Johnson', condition: 'Heart Checkup' },
  { id: 2, name: 'Emily Davis', email: 'emily.d@example.com', date: '2023-10-15', time: '10:30 AM', doctor: 'Dr. Robert Chen', condition: 'Neurological Assessment' },
  { id: 3, name: 'Michael Brown', email: 'mbrown@example.com', date: '2023-10-15', time: '01:15 PM', doctor: 'Dr. Emma Rodriguez', condition: 'Treatment Follow-up' },
  { id: 4, name: 'Sophia Wilson', email: 'sophia.w@example.com', date: '2023-10-16', time: '11:45 AM', doctor: 'Dr. Sarah Johnson', condition: 'Annual Checkup' },
  { id: 5, name: 'James Taylor', email: 'j.taylor@example.com', date: '2023-10-16', time: '02:30 PM', doctor: 'Dr. Robert Chen', condition: 'Headache Consultation' },
];

const Dashboard = () => {
  const [visitTimeFilter, setVisitTimeFilter] = useState('monthly');
  const [departmentTimeFilter, setDepartmentTimeFilter] = useState('weekly');
  
  // Format current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Overview - Updated with lighter colors */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Activity Overview</h2>
              <div className="text-sm text-primary font-medium">View All</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Appointments - Lighter purple gradient */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-purple-200 to-purple-400 text-purple-900 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium opacity-90">Appointments</span>
                  <div className="w-8 h-8 rounded-lg bg-white/30 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold mt-2">42</div>
                <div className="text-xs opacity-90 flex items-center mt-1">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+8% from last week</span>
                </div>
              </motion.div>
              
              {/* Operations - Lighter blue gradient */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-200 to-blue-400 text-blue-900 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium opacity-90">Operations</span>
                  <div className="w-8 h-8 rounded-lg bg-white/30 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold mt-2">12</div>
                <div className="text-xs opacity-90 flex items-center mt-1">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+3% from last week</span>
                </div>
              </motion.div>
              
              {/* New Patients - Lighter green gradient */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-green-200 to-green-400 text-green-900 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium opacity-90">New Patients</span>
                  <div className="w-8 h-8 rounded-lg bg-white/30 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold mt-2">18</div>
                <div className="text-xs opacity-90 flex items-center mt-1">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+12% from last week</span>
                </div>
              </motion.div>
              
              {/* Beds Available - Lighter amber gradient */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-amber-200 to-amber-400 text-amber-900 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium opacity-90">Beds Available</span>
                  <div className="w-8 h-8 rounded-lg bg-white/30 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold mt-2">24</div>
                <div className="text-xs opacity-90 flex items-center mt-1">
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span>-5% from last week</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Patient Visit By Department */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Visit By Department</h2>
              <select 
                value={departmentTimeFilter}
                onChange={(e) => setDepartmentTimeFilter(e.target.value)}
                className="text-sm border-none bg-gray-100 rounded-lg py-1 px-2 text-gray-700 focus:ring-2 focus:ring-purple-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 'dataMax + 10']} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }}
                />
                <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Popular Doctors */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Popular Doctors</h2>
              <button className="text-sm text-primary font-medium">View All</button>
            </div>
            
            <div className="space-y-5">
              {doctorsList.map((doctor, index) => (
                <motion.div 
                  key={doctor.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${doctor.color} flex items-center justify-center text-white font-medium`}>
                      {doctor.avatar}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                      <div className="text-xs text-gray-500">{doctor.specialty}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      doctor.availability === 'Available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {doctor.availability}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{doctor.patients} patients</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Visits Chart (spans 2 columns) */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Patient Visits</h2>
              <select 
                value={visitTimeFilter}
                onChange={(e) => setVisitTimeFilter(e.target.value)}
                className="text-sm border-none bg-gray-100 rounded-lg py-1 px-2 text-gray-700 focus:ring-2 focus:ring-purple-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientVisitData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: 'none' }}
                />
                <Legend verticalAlign="top" height={40} />
                <Line type="monotone" dataKey="inpatient" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="outpatient" stroke="#82ca9d" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="flex items-center justify-center mt-4 gap-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-600">Inpatient</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">Outpatient</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
              <button className="text-sm text-primary font-medium">View All</button>
            </div>
            
            <div className="mb-5 pb-3 border-b border-gray-100">
              <div className="flex items-center"></div>
                <h3 className="text-lg text-purple-600 text-left">{formattedDate}</h3>
              </div>
                        
            <div className="space-y-6">
              {/* Time Points */}
              {upcomingAppointments.map((appointment, index) => (
                <motion.div 
                  key={appointment.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="flex items-start"
                >
                  
                  <div className="flex-grow flex items-center">
                    <div className={`h-3 w-3 rounded-full flex-shrink-0 ${
                      index % 2 === 0 ? 'bg-amber-400' : 'bg-green-400'
                    }`}></div>
                    
                    {/* Time range */}
                    <div className="mx-3 text-xs font-medium text-gray-500">
                      {appointment.time} - {
                        // Simple logic to calculate end time
                        (() => {
                          const [hour, minutesPart] = appointment.time.split(':');
                          const [minutes, period] = minutesPart.split(' ');
                          let newHour = parseInt(hour);
                          let newMinutes = parseInt(minutes) + (index % 2 === 0 ? 30 : 45);
                          
                          if (newMinutes >= 60) {
                            newHour += Math.floor(newMinutes / 60);
                            newMinutes = newMinutes % 60;
                          }
                          
                          // Handle period change
                          let newPeriod = period;
                          if (newHour >= 12) {
                            if (newHour > 12) newHour -= 12;
                            newPeriod = 'PM';
                          }
                          
                          return `${newHour}:${newMinutes.toString().padStart(2, '0')} ${newPeriod}`;
                        })()
                      }
                    </div>
                    
                    {/* Appointment info */}
                    <div className="bg-gray-50 rounded-lg py-3 px-4 flex-grow hover:bg-gray-100 transition-colors">
                      <div className="font-medium text-sm text-gray-900">{appointment.patient}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{appointment.doctor}</span>
                        <span className="mx-1.5 text-gray-300">•</span>
                        <span className="text-xs font-light text-gray-400">{appointment.department}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>

          {/* Bottom Row */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Appointment Activity</h2>
            <div className="flex items-center space-x-2">
              <button className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg">
                Add Appointment
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Doctor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {appointmentsList.map((appointment, index) => (
                  <motion.tr 
                    key={appointment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + (index * 0.05) }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{appointment.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{appointment.date}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.doctor}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {appointment.condition}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded-full hover:bg-gray-100 text-blue-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100 text-amber-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100 text-red-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;