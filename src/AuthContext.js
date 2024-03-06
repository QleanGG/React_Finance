import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const hasTokenExpired = (exp) => {
  if (!exp) {
    return true;
  }
  const currentTime = Date.now() / 1000;
  return exp < currentTime;
};

const getUserFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (hasTokenExpired(decoded.exp)) {
        localStorage.removeItem("access_token");
        return null; //token is expired
      }
      const username = decoded.sub.username;
      return { username, token }; // Return both username and token
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }
  return;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUserFromToken());

  useEffect(() => {
    const checkTokenInterval = setInterval(() => {
      const user = getUserFromToken(); // Regularly check for token expiration
      if (!user) {
        setCurrentUser(null); // Log out the user if the token has expired
      }
    }, 60000); // Check every minute (60000ms)
    
    return () => clearInterval(checkTokenInterval); // Cleanup interval on component unmount
  }, []);

  const login = (token) => {
    localStorage.setItem("access_token", token);
    const userData = getUserFromToken(); // Get both username and token
    setCurrentUser(userData); // Set both username and token
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
