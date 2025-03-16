import DashboardLayout from '../../components/DashboardLayout';
import React from 'react';

const Staff = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Empty State */}
        <div className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-gray-100/20 p-8">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Staff Members Yet</h3>
            <p className="text-gray-500 mb-6">Start managing your hospital staff by adding new members.</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Add New Staff Member
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Staff;
