import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './FirebaseConfig';

const auth = getAuth(app);

export const AuthWrapper = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (loggedIn === null) {
    return <div>Loading...</div>;
  }

  return loggedIn ? children : <Navigate to="/login" />;
};
