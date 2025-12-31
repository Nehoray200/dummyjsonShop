import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { ServerContext } from './ServerContext'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const login = (userData) => { setUser(userData) }
  const logout = () => {
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    if (!user) return
    console.log("i am logn now: " + user.password)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
