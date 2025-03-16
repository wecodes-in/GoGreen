import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from cookies when the app starts
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setUser({ token }); // Assuming token means user is logged in
    }
  }, []);

  const login = (userData, token) => {
    Cookies.set("authToken", token, { expires: 7 }); // Store token for 7 days
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("authToken"); // Remove token
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
