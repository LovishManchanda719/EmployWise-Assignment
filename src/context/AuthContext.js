import React, { createContext, useState, useContext, useEffect } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        navigate('/users');
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ token, loginUser, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);