import React from 'react';
import { LoginForm } from '@/src/components/admin/LoginForm';
import { Navbar } from '@/src/components/Navbar';

export const AdminLogin: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f0f1e] flex flex-col pt-20">
      <div className="flex-grow flex items-center justify-center p-4">
        <LoginForm />
      </div>
      <div className="p-8 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        ToolStudio Architecture &copy; 2024 - Secure Admin Access
      </div>
    </div>
  );
};
