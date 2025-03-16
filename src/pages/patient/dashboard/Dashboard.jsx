import React from 'react';
import PatientDashboardLayout from '../../../components/PatientDashboardLayout';

const PatientDashboard = () => {
  return (
    <PatientDashboardLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Patient Dashboard</h1>
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Welcome to your patient dashboard. Your health information and records will appear here.
        </p>
      </div>
    </PatientDashboardLayout>
  );
};

export default PatientDashboard;
