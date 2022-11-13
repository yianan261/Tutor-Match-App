import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import PropTypes from "prop-types";

//Yian Chen
//Authentication and protected routes source: https://youtu.be/X8eAbu1RWZ4
function RequireAuth({ children }) {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.any.isRequired,
};
export default RequireAuth;
