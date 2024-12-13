import React, { createContext, useContext, useState, useEffect } from 'react'
import { getUserProfile } from '../api'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            if (token) {
                const response = await getUserProfile()
                setUser(response.data)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            setError(error)
            localStorage.removeItem('accessToken')
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (userData, token) => {
        try {
            localStorage.setItem('accessToken', token)
            setUser(userData)
            await checkAuth()
        } catch (error) {
            Swal.fire('Error', 'Failed to login. Please try again.', 'error')
            throw error
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem('accessToken')
            setUser(null)
            Swal.fire('Success', 'Logged out successfully', 'success')
        } catch (error) {
            console.error('Logout failed:', error)
            Swal.fire('Error', 'Failed to logout. Please try again.', 'error')
        }
    }

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        checkAuth,
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <ClipLoader size={50} color="#4fa94d" loading={loading} />
        </div>
    )
    if (error) return <div>Error: {error.message}</div>

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
