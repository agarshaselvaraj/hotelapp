// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if session storage 
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const login = (token) => {
    setIsLoggedIn(true);
    sessionStorage.setItem("token", token); // Store token 
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
