import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const AuthContext = createContext();

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setAuth] = useState(false);
  // default assign role as user, can be changed
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    axios(`${serverUrl}/check`, {
      method: "POST",
      withCredentials: true,
    })
      .then((response) => {
        // TODO: remove
        // console.log(response);
        setUserRole(response.data.user.role);
        setAuth(true);
      })
      .catch((err) => {
        setAuth(false);
      });
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuth, userRole, setUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
