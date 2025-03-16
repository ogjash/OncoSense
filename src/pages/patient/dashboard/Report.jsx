import React from 'react';
import PatientDashboardLayout from '../../../components/PatientDashboardLayout';

const PatientReport = () => {
  return (
    <PatientDashboardLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100/20 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Medical Reports</h1>
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
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          No medical reports available at this time. Reports will appear here once they are added to your records.
        </p>
      </div>
    </PatientDashboardLayout>
  );
};

export default PatientReport;
