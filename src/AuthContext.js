import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const getUserFromToken = () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const username = decoded.sub.username;
      return { username, token }; // Return both username and token
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUserFromToken()); // Call getUserFromToken here

  const login = (token) => {
    localStorage.setItem('access_token', token);
    const userData = getUserFromToken(); // Get both username and token
    setCurrentUser(userData); // Set both username and token
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setCurrentUser(null); 
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
