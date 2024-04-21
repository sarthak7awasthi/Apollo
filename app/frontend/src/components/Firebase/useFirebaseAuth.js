// useFirebaseAuth.js
import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import app from './FirebaseConfig';

const auth = getAuth(app);

export function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Clean up subscription on unmount
  }, []);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthError('');
    } catch (error) {
      console.error('Authentication error:', error.message);
      setAuthError(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return {
    user,
    loading,
    authError,
    signIn,
    logOut
  };
}
