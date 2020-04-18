import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setAuth] = useState(false);

  useEffect(() => {
    axios(`${serverUrl}/check`, {
      method: "POST",
      withCredentials: true,
    })
      .then((response) => {
        console.log("elo");
        setAuth(true);
      })
      .catch((err) => {
        console.log("elo2");
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
