// authContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a token is stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If a token is found, set the user
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    // Store the token in localStorage
    localStorage.setItem('token', token);
    // Set the user in the context
    setUser({ token });
  };

  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Remove the user from the context
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
