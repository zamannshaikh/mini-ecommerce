import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const user = useSelector((state) => state.userReducer.data);
  console.log("AuthWrapper user:", user);

  return user ? children : <Navigate to="/login" replace />;
};

export default AuthWrapper;
