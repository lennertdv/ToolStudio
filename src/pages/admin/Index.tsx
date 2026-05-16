import React from 'react';
import { Dashboard } from '@/src/components/admin/Dashboard';
import { ProtectedRoute } from '@/src/components/admin/ProtectedRoute';

export const AdminIndex: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0f0f1e] text-gray-300 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Dashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
};
