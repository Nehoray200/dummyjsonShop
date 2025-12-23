import React,{createContext, useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import ServerContext from './ServerContext'

const AuthContext = createContext()

const AuthProvider = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const {server} = useContext(ServerContext)
    
  return (
    <div>AuthProvider</div>
  )
}

export default AuthProvider