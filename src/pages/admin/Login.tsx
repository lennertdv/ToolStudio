import React from 'react';
import { LoginForm } from '@/src/components/admin/LoginForm';
import { Navbar } from '@/src/components/Navbar';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f0f1e] flex flex-col pt-20">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-500 hover:text-[#0066cc] text-xs font-bold flex items-center justify-center gap-2 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Public Site
            </Link>
          </div>
        </div>
      </div>
      <div className="p-8 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        ToolStudio Architecture &copy; 2024 - Secure Admin Access
      </div>
    </div>
  );
};
