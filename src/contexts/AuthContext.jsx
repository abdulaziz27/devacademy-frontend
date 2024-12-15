import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const storedUser = localStorage.getItem('user')
        if (token && storedUser) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (userData, token) => {
        setUser(userData)
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
