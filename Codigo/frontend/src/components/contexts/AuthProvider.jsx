import React, { createContext, useContext, useState } from 'react';

// Criar o contexto
const AuthContext = createContext();

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [userType, setUserType] = useState(() => localStorage.getItem('userType'));

  const login = (newToken, type) => {
    setToken(newToken);
    setUserType(type);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userType', type);
  };
  const register = (newToken, type) => {
    setToken(newToken);
    setUserType(type);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userType', type);
  };

  const logout = () => {
    setToken(null);
    setAuthToken(null)
    setUserType(null);
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ token, userType, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
