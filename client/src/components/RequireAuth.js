import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import PropTypes from "prop-types";

//Yian Chen
//Authentication and protected routes source: https://youtu.be/X8eAbu1RWZ4
/**
 * Function that ensures user is authenticated by getting info from context
 * @param {prop} children props
 * @returns children when auth.user else redirects user to login page
 */
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
