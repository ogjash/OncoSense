import DashboardLayout from '../../components/DashboardLayout';
import React from 'react';

const Treatments = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Empty State */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Treatments Recorded</h3>
            <p className="text-gray-500 mb-6">Start managing your patient treatments by adding new treatment records.</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Add New Treatment
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Treatments;