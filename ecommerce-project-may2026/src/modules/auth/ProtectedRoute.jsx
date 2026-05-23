import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/"/>;
};

export default ProtectedRoute;
