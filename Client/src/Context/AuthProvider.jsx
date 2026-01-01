import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { ServerContext } from './ServerContext'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = Cookies.get('user_data')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch (error) {
        return null
      }
    }
  }


  );
  const login = (userData) => {
    setUser(userData)
    Cookies.set('user_data', JSON.stringify(userData), { expires: 1 })
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('user_data')
    navigate('/')
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
