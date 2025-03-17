import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UseAuth';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PatientDashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const notificationsRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: 'Appointment Reminder',
      message: 'Dr. Smith appointment tomorrow at 10:00 AM',
      time: '1 hour ago',
      read: false
    },
    {
      id: 2,
      title: 'Lab Results Available',
      message: 'Your blood test results are now available',
      time: '3 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'Medication Reminder',
      message: 'Remember to take your medication as prescribed',
      time: '1 day ago',
      read: true
    }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobileView(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Modified navigation items for patient
  const navItems = [
    { path: '/patient/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/patient/appointment', label: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { path: '/patient/doctors', label: 'Doctors', icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { path: '/patient/report', label: 'Medical Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { path: '/patient/chatbot', label: 'Chatbot', icon: 'M12 3c1.88 0 3.67.72 5 2.05 1.33 1.33 2.05 3.12 2.05 5 0 1.87-.73 3.66-2.05 5-1.33 1.33-3.12 2.05-5 2.05-.62 0-1.24-.08-1.84-.23l-4.76 1.36c-.31.09-.64 0-.88-.24-.24-.24-.33-.57-.24-.88l1.36-4.76c-.15-.6-.23-1.22-.23-1.84 0-1.88.72-3.67 2.05-5C8.33 3.72 10.12 3 12 3zm7 7c0-1.36-.52-2.66-1.46-3.61C16.56 5.34 15.27 4.81 14 4.54v2.02c.44.13.87.31 1.27.55.47.28.89.64 1.26 1.01.37.37.73.79 1.01 1.26.4.67.62 1.39.68 2.12H20c-.02-.52-.11-1.02-.26-1.5h-.02zm-9.5-2.5c0-.41.34-.75.75-.75h1.5c.41 0 .75.34.75.75v1.5c0 .41-.34.75-.75.75h-1.5c-.41 0-.75-.34-.75-.75v-1.5zM15.25 9c0-.41.34-.75.75-.75h1.5c.41 0 .75.34.75.75v1.5c0 .41-.34.75-.75.75H16c-.41 0-.75-.34-.75-.75V9zm-5 4c0-.41.34-.75.75-.75h1.5c.41 0 .75.34.75.75v1.5c0 .41-.34.75-.75.75h-1.5c-.41 0-.75-.34-.75-.75v-1.5z' }
  ];

  const toggleProfileMenu = () => {
    
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className={`fixed top-0 right-0 left-0 bg-white border-b border-gray-100/20 h-16 lg:h-20 lg:left-64 z-30 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]`}>
        <div className="h-full flex items-center justify-between px-4 lg:px-8">
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            
            {/* Logo for mobile */}
            <Link to="/patient/dashboard" className="flex items-center ml-2">
              <span className="text-xl font-bold text-primary">OncoSense</span>
            </Link>
          </div>

          {/* Header content with fixed structure */}
          <div className="hidden lg:flex items-center min-w-[180px]">
            <h1 className="text-xl font-semibold text-gray-800">
              {location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1) || 'Dashboard'}
            </h1>
          </div>
          
          {/* Search bar with fixed position */}
          <div className="flex-1 hidden lg:flex items-center justify-center max-w-2xl mx-auto px-4">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full bg-gray-100/70 backdrop-blur-sm rounded-xl border-0 focus:ring-2 focus:ring-indigo-500 py-3 pl-12 pr-4 text-gray-700 shadow-sm"
                placeholder="Search Medical Records"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right section with notification and profile */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            {/* Search button for mobile */}
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              
              {/* Notifications dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className={`px-4 py-3 hover:bg-gray-50 border-l-4 ${notification.read ? 'border-transparent' : 'border-indigo-500'}`}
                          >
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <p className="text-sm text-gray-500">No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button className="w-full text-center text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                        Mark all as read
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Vertical divider - Ultra subtle - Hide on mobile */}
            <div className="h-8 w-px bg-gray-100/30 hidden lg:block"></div>

            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-3 hover:bg-gray-100 p-1 lg:p-2 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-indigo-200 group-hover:ring-indigo-300 transition-all">
                  {currentUser?.email?.charAt(0)?.toUpperCase() || 'P'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {currentUser?.patientName || 'Patient'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Patient
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Profile dropdown */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser?.patientName || 'Patient Name'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {currentUser?.email || 'patient@example.com'}
                      </p>
                    </div>
                    <Link to="/patient/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                    <Link to="/patient/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100 mt-1"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Updated with responsive behavior and patient theme */}
      <AnimatePresence>
        {(isMobileMenuOpen || !isMobileView) && (
          <motion.div 
            className={`fixed inset-y-0 left-0 w-64 bg-white shadow-[1px_0_3px_0_rgba(0,0,0,0.02)] border-r border-gray-100/20 z-30 transform ${isMobileView ? 'lg:transform-none lg:opacity-100' : ''}`}
            initial={isMobileView ? { x: -320, opacity: 0 } : { x: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={isMobileView ? { x: -320, opacity: 0 } : {}}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col h-full overflow-y-auto">
              {/* Logo */}
              <div className="p-4 flex items-center justify-between">
                <Link to="/patient/dashboard" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-indigo-600">OncoSense</span>
                </Link>
                {isMobileView && (
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Patient Name Card */}
              <div className="px-4 mb-6">
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                  <h3 className="text-sm font-medium text-indigo-900">
                    {currentUser?.patientName || 'Patient Name'}
                  </h3>
                  <p className="text-xs text-indigo-700 mt-1">
                    Patient ID: {currentUser?.patientId || 'P00123'}
                  </p>
                </div>
              </div>

              {/* Navigation - Updated for patient with indigo theme */}
              <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3.5 text-base font-medium rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-700'
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 mr-4 ${
                        location.pathname === item.path ? 'text-indigo-700' : 'text-gray-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                ))}
              </nav>
              
              {/* Additional patient resources */}
              <div className="px-4 py-4 border-t border-gray-100">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Resources
                </h3>
                <Link
                  to="/patient/help"
                  className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Help Center
                </Link>
                <Link
                  to="/patient/contact"
                  className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-lg"
                >
                  <svg className="w-5 h-5 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Doctor
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Responsive padding and margins */}
      <div className={`pt-16 lg:pt-24 pb-8 px-4 lg:px-8 ${!isMobileView ? 'lg:ml-64' : ''} min-h-screen`}>
        <div className="max-w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardLayout;
