import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // const authCtx = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem('userToken')

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
