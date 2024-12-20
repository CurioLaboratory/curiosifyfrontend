import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import AdminHome from './adminHome/AdminHome';
import '../HomePage.scss';
const AdminDashboard=()=>{
    const [selectedMenu, setSelectedMenu] = useState('home');
    const [currentPage, setCurrentPage] = useState('home');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const { getUser, logout } = useAuth();
    useEffect(() => {
        setUser(getUser());
    }, []);
    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <AdminHome/>
                );
    
            default:
                return <div className="content"><h1>Content Not Found</h1></div>;
        }
    };
    return (
        <div className="home-page">
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="logo"><img src="/icons/logo.png" alt="Logo" /></div>
            <ul>
                <li onClick={() => { setSelectedMenu('home'); setCurrentPage('home'); toggleSidebar(); }} className={selectedMenu === 'home' ? 'active' : ''}>
                    <img src="/icons/home.png" alt="Home" /> Home
                </li>
                <li onClick={() => { setSelectedMenu('FeesCollection'); setCurrentPage('FeesCollection'); toggleSidebar(); }} className={selectedMenu === 'FeesCollection' ? 'active' : ''}>
                    <img src="/icons/quiz.png" alt="FeesCollection" /> Fees Collection
                </li>
                <li onClick={() => { setSelectedMenu('StudentDetails'); setCurrentPage('StudentDetails'); toggleSidebar(); }} className={selectedMenu === 'StudentDetails' ? 'active' : ''}>
                    <img src="/icons/library.png" alt="StudentDetails" /> Student Details
                </li>
                <li onClick={() => { setSelectedMenu('StaffInformation'); setCurrentPage('StaffInformation'); toggleSidebar(); }} className={selectedMenu === 'StaffInformation' ? 'active' : ''}>
                    <img src="/icons/events.png" alt="StaffInformation" /> Staff Information
                </li>
                <li onClick={() => { setSelectedMenu('DocumentManagement'); setCurrentPage('DocumentManagement'); }} className={selectedMenu === 'DocumentManagement' ? 'active' : ''}>
                    <img src="/icons/flashcards.png" alt="DocumentManagement" /> Document Management
                </li>
            </ul>
        </div>
        <div className="main-content">
            <div className="header">
                <div className="profile">
                    <span className="icon-bell" onClick={() => setShowNotifications(!showNotifications)}>🔔</span>
                    {showNotifications && (
                        <div className="notifications-dropdown">
                            <h4>Notifications</h4>
                            <p>No new notifications</p>
                        </div>
                    )}
                    <div className="profile-info" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                        <div className="profile-icon">JH</div>
                        <div className="profile-name">{user?.name}</div>
                        <div className="dropdown-icon">▼</div>
                        {showProfileMenu && (
                            <div className="profile-dropdown">
                                <ul>
                                    <li  onClick={()=>setCurrentPage('account-settings')}>Profile</li>
                                    <li>Settings</li>
                                    <li onClick={logout}><a href="/">Logout</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {renderContent()}
        </div>
    </div>
    );
}
export default AdminDashboard;