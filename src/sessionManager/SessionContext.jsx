import React, { createContext, useContext, useEffect, useState } from "react";
import { checkNullOrEmpty, getLocalItem } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const SessionContext = createContext(null);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  // Set initial language from localStorage
  useEffect(() => {
    let token = getLocalItem("token");
    if (!checkNullOrEmpty(token)) {
      setToken(token);
    }
  }, [navigate]);

  const logout = () => {
    setToken("");
    localStorage.clear();
  };

  return (
    <SessionContext.Provider
      value={{
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
