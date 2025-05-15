
import React, { createContext, useState } from 'react';

// Create Authentication context
export const AuthContext = createContext();

// Create a provider component for the Auth context
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    restEndpoint: 'https://api.example.com', // Default API endpoint
    isAuthenticated: false,
    user: null,
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
