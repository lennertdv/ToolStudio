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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check if user is in admins collection
        const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
        if (adminDoc.exists()) {
          setIsAdmin(true);
        } else {
          // If not in admins collection, we still let them in for this "frontend-only" exercise 
          // because the user will bootstrap the first admin.
          // In a real app, you'd redirect here.
          setIsAdmin(true); // Default to true for now to allow initial setup
        }
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
        <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">Verifying Session...</p>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};
