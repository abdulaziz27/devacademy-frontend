import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const MenuDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MenuDashboard
