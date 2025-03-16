import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/UseAuth';
import React, { useState } from 'react';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { path: '/appointment', label: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { path: '/doctor-schedule', label: 'Doctor Schedule', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 right-0 left-64 bg-white border-b border-gray-100/20 h-20 z-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="h-full grid grid-cols-3 items-center px-8">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1) || 'Dashboard'}
            </h1>
          </div>
          
          <div className="justify-self-center w-full max-w-2xl px-4">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-100/70 backdrop-blur-sm rounded-xl border-0 focus:ring-2 focus:ring-purple-500 py-3 pl-12 pr-4 text-gray-700 shadow-sm"
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
          <div className="justify-self-end flex items-center space-x-6">
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              >
                <span className="sr-only">View notifications</span>
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-3 w-96 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="py-1 divide-y divide-gray-100">
                    <div className="px-5 py-3 bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">Notifications</p>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                      <div className="px-5 py-4 hover:bg-gray-50 transition-colors">
                        <p className="text-sm text-gray-700">No new notifications</p>
                      </div>
                    </div>
                    <div className="px-5 py-3 bg-gray-50">
                      <button className="text-sm text-purple-600 hover:text-purple-800 w-full text-left font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vertical divider - Ultra subtle */}
            <div className="h-8 w-px bg-gray-100/30"></div>

            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-purple-200 group-hover:ring-purple-300 transition-all">
                  {currentUser?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {currentUser?.role === 'hospital' ? currentUser.adminName || 'Admin' : currentUser?.patientName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentUser?.role === 'hospital' ? 'Hospital Admin' : 'Patient'}
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="origin-top-right absolute right-0 mt-3 w-64 rounded-xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50/50">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Your Profile
                    </div>
                  </Link>
                  <Link to="/settings" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </div>
                  </Link>
                  <div className="border-t border-gray-50/50"></div>
                  <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors hover:text-red-600">
                    <div className="flex items-center">
                      <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Updated with nearly invisible border and larger navigation text */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-[1px_0_3px_0_rgba(0,0,0,0.02)] border-r border-gray-100/20">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">OncoSense</span>
            </Link>
          </div>

          {/* Hospital Name Card */}
          <div className="px-4 mb-6">
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <h3 className="text-sm font-medium text-purple-900">
                {currentUser?.role === 'hospital' ? currentUser.hospitalName : currentUser?.patientName || 'User'}
              </h3>
              {currentUser?.role === 'hospital' && (
                <p className="text-xs text-purple-700 mt-1">
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
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-700'
                }`}
              >
                <svg
                  className={`w-6 h-6 mr-4 ${
                    location.pathname === item.path ? 'text-purple-700' : 'text-gray-400'
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
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-24 p-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;