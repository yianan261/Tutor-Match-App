import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

//Yian Chen
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("temp");

  //Todo: implement fetch to fetch user data from backend (express session),wrap in useEffect
  useEffect(() => {
    setUser("placeholder"); //temporary placement, this value should be replaced with user data from fetch
  }, []);
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };

  //wrapping children props in AuthContext Provider
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
