import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from '@/src/lib/firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initAuth = async () => {
      const auth = await getAuth();
      if (!auth) {
        setLoading(false);
        navigate('/admin/login');
        return;
      }

      const { onAuthStateChanged } = await import('firebase/auth');
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate('/admin/login');
        }
        setLoading(false);
      });
    };

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
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
