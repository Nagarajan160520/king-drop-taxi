import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  registerUser, 
  loginUser, 
  logoutUser,
  onAuthStateChange 
} from '../firebase/config';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await registerUser(
        userData.email, 
        userData.password, 
        userData.name, 
        userData.phone
      );
      
      if (result.success) {
        toast.success('Registration successful! Welcome to King Drop Taxi!');
        return { success: true, data: result.user };
      } else {
        setError(result.error);
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const message = error.message || 'Registration failed';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await loginUser(email, password);
      
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        return { success: true, data: result.user };
      } else {
        setError(result.error);
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const message = error.message || 'Login failed';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const result = await logoutUser();
      if (result.success) {
        toast.info('Logged out successfully');
      }
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};