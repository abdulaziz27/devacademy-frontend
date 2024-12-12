import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const MenuDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div>
                <Outlet /> {/* Renders the nested routes */}
            </div>
        </div>
    );
};

export default MenuDashboard;
