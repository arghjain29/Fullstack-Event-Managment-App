/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";



const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); // Add user state

  // On page load, if there's a token, decode it and set the user
  useEffect(() => {
    if (authToken) {
      const decodedUser = jwtDecode(authToken);
      setUser(decodedUser);
    }
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
    setUser(jwtDecode(token)); // Set user data when login
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null); // Clear user data on logout
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
