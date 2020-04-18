import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setAuth] = useState(false);

  useEffect(() => {
    axios(`http://localhost:3001/check`, {
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
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
