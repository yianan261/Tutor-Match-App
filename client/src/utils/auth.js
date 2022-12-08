import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

//Yian Chen, Amanda Au-Yeung
/**
 * function that checks current user in session
 * @param {props} children
 * @returns AuthContext provider and children
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      await fetch("/api/getUser")
        .then((res) => res.json())
        .then((data) => {
          if (data.user !== null) {
            console.log("Data");
            setUser(data.user);
          } else {
            alert("Something went wrong, no user in session");
          }
        });
    };
    getCurrentUser();
  }, [user]);

  const login = (user) => {
    setUser(user);
  };

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
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

//function that returns current user
export const useAuth = () => {
  return useContext(AuthContext);
};
