import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, getUserData, auth, ensureUserDocument } from '../services/authService';
import { getRedirectResult } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for redirect result on mount
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("Logged in via redirect:", result.user.email);
          await ensureUserDocument(result.user);
        }
      } catch (error) {
        // Specifically catch 'missing initial state' or other redirect errors
        console.error("Error handling redirect result:", error.code, error.message);
        if (error.code === 'auth/auth-domain-config-required' || error.code === 'auth/operation-not-allowed') {
          // These are configuration issues
        }
      }
    };
    handleRedirect();

    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        // ensureUserDocument handles role upgrades (e.g. auto-admin for banhdaidung@gmail.com)
        const data = await ensureUserDocument(firebaseUser);
        setUserData(data);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userData,
    loading,
    setUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
