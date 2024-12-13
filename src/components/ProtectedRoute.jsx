import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ClipLoader } from 'react-spinners'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading, error } = useAuth()
    const location = useLocation()

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <ClipLoader size={50} color="#4fa94d" loading={loading} />
        </div>
    )
    if (error) return <div>Error: {error.message}</div>

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute
