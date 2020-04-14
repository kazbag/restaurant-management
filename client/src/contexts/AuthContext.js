import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setAuth] = useState(false);

  useEffect(() => {
    axios(`${serverUrl}/check`, {
      method: "POST",
      withCredentials: true,
    })
      .then((response) => {
        setAuth(true);
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
