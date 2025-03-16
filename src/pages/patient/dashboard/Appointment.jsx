import React from 'react';
import PatientDashboardLayout from '../../../components/PatientDashboardLayout';

const PatientAppointment = () => {
  return (
    <PatientDashboardLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointments</h1>
        <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          No appointments scheduled. Your upcoming appointments will appear here once scheduled.
        </p>
      </div>
    </PatientDashboardLayout>
  );
};

export default PatientAppointment;
