// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in sessionStorage on app load
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
  }, []);

  const login = (token) => {
    setIsLoggedIn(true);
    sessionStorage.setItem("token", token); // Store token in sessionStorage
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
