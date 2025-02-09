/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return authToken ? jwtDecode(authToken) : null;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  });

  // Sync token and user on changes
  useEffect(() => {
    if (authToken) {
      try {
        const decodedUser = jwtDecode(authToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
  }, [authToken]);

  const login = (token) => {
    try {
      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(jwtDecode(token));
    } catch (error) {
      console.error("Error decoding token:", error);
      logout(); // Clear everything if login fails
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
