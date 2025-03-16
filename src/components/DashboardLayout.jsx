import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/UseAuth';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);

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

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/reservations', label: 'Reservations', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { path: '/doctors', label: 'Doctors', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { path: '/patients', label: 'Patients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { path: '/treatments', label: 'Treatments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { path: '/staff', label: 'Staff List', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
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
            <Link to="/dashboard" className="flex items-center ml-2">
              <span className="text-xl font-bold text-primary">QMatrix</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center lg:w-40">
            <h1 className="text-xl font-semibold text-gray-800 truncate">
              {location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1) || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex-1 lg:flex items-center justify-center max-w-[500px] mx-auto px-4">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full bg-gray-100/70 backdrop-blur-sm rounded-xl border-0 focus:ring-2 focus:ring-teal-500 py-3 pl-12 pr-4 text-gray-700 shadow-sm"
                placeholder="Search Anything"
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
            <div className="relative lg:hidden">
              <button 
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 sm:hidden"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              >
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
            </div>

            <div className="h-8 w-px bg-gray-100/30 hidden lg:block"></div>

            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-3 hover:bg-gray-100 p-1 lg:p-2 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-teal-200 group-hover:ring-teal-300 transition-all">
                  {currentUser?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {currentUser?.role === 'hospital' ? currentUser.adminName || 'Admin' : currentUser?.patientName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentUser?.role === 'hospital' ? 'Hospital Admin' : 'Patient'}
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

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

      {/* Sidebar - Updated with responsive behavior */}
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
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary">OncoSense</span>
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

              {/* Hospital Name Card */}
              <div className="px-4 mb-6">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg border border-red-100">
                  <h3 className="text-sm font-medium text-orange-900">
                    {currentUser?.role === 'hospital' ? currentUser.hospitalName : currentUser?.patientName || 'User'}
                  </h3>
                  {currentUser?.role === 'hospital' && (
                    <p className="text-xs text-orange-700 mt-1">
                      {currentUser.adminName ? `Admin: ${currentUser.adminName}` : 'Hospital Admin'}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation - Updated with larger text and spacing */}
              <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3.5 text-base font-medium rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-teal-700'
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 mr-4 ${
                        location.pathname === item.path ? 'text-teal-600' : 'text-gray-400'
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

export default DashboardLayout;