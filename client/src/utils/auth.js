import { useState, createContext, useContext} from "react";
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

  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     await fetch("/getUser")
  //     .then(res=>{ console.log(res);
  //       return res.json()})
  //     .then(data=>{
  //      if (data.user !== null){
  //        setUser(data.user);
  //      }
  //     })
  //  }
  //  getCurrentUser();
  //  console.log("user in get user", user);
  // }, [user]);

  const login = (user) => {
    setUser(user);
  }

  const logout = async () => {
    await fetch("/logout", {
      method: "POST"
    })
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
  render: PropTypes.any.isRequired,
};

//function that returns current user
export const useAuth = () => {
  return useContext(AuthContext);
};
