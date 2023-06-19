import React, { createContext, useState, useEffect, useCallback } from "react";
import { ToastAlert } from "../utilis/ToastAlert";
// import { BASE_URL } from "../config";
import axios from "axios";
import {BASE_URL} from '../config.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([]);


  // User Login
  const login = (token, expirationTime, userObj) => {
    console.log("user", JSON.stringify(userObj));
    setToken(token);
    localStorage.setItem("userToken", token);
    localStorage.setItem("userExpTime", expirationTime);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userExpTime");
  }, []);


  const contextValue = {
    login,
    logout,
    isLoading,
    setIsLoading,
    userToken,
    user,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
