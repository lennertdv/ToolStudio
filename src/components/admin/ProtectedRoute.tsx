import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '@/src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !db) {
      setLoading(false);
      navigate('/admin/login');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(true); // Always true for now as per previous logic
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1e] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-[#0066cc] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">Verifying Information...</p>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};
