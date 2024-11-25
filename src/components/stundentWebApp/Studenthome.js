import React, { useEffect, useState } from 'react';
import '../HomePage.scss';
import { useAuth } from '../auth/AuthContext';
import Studentquiz from './studentQuiz/Studentquiz';
import StudentAskCurio from './studentAsk-Curio/StudentAskCurio';
import Studentevents from './studentEvents/Studentevents';
import Studentflashcard from './studentFlashcard/Studentflashcard';
import Studentscanai from './studentScanai/Studentscanai';
import Studentlibrary from './studentLibrary/Studentlibrary';
import QuizPage from './studentQuiz/Quizpage';
import SubmittedQuizPage from './studentQuiz/Submittedquiz';
import StudentDashboard from './studentdashboard/StudentDashboard';
import { useQuiz } from './QuizContext';
const StudentHome = () => {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const {completedQuiz,setCompletedQuiz}= useQuiz();
    const { selectedQuiz, setSelectedQuiz } = useQuiz();
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
                    <div className="content">
                        <h1>Hi {user?.name}, Welcome back!</h1>
                        <StudentDashboard />
                    </div>
                );
            case 'Studentquiz':
                return (
                    <Studentquiz 
                        takequiz={setCurrentPage} 
                        setSelectedQuiz={setSelectedQuiz}
                        setCompletedQuiz={setCompletedQuiz}
                    />
                );
            case 'take-quiz':
                return (
                    <QuizPage 
                       selectedQuiz={selectedQuiz}
                        setCurrentPage={setCurrentPage} 
                    />
                );
            case 'completed-quiz':
                return <SubmittedQuizPage completedQuiz={completedQuiz} />;
            case 'Studentlibrary':
                return <Studentlibrary />;
            case 'Studentevents':
                return <Studentevents />;
            case 'Studentscanai':
                return <Studentscanai />;
            case 'Studentflashcard':
                return <Studentflashcard />;
            case 'StudentAskCurio':
                return <StudentAskCurio />;
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
                    <li onClick={() => { setSelectedMenu('Studentquiz'); setCurrentPage('Studentquiz'); toggleSidebar(); }} className={selectedMenu === 'Studentquiz' ? 'active' : ''}>
                        <img src="/icons/quiz.png" alt="Quiz" /> Quiz
                    </li>
                    <li onClick={() => { setSelectedMenu('Studentlibrary'); setCurrentPage('Studentlibrary'); toggleSidebar(); }} className={selectedMenu === 'Studentlibrary' ? 'active' : ''}>
                        <img src="/icons/library.png" alt="Library" /> Library
                    </li>
                    <li onClick={() => { setSelectedMenu('Studentevents'); setCurrentPage('Studentevents'); toggleSidebar(); }} className={selectedMenu === 'Studentevents' ? 'active' : ''}>
                        <img src="/icons/events.png" alt="Events" /> Events
                    </li>
                    <li onClick={() => { setSelectedMenu('Studentflashcard'); setCurrentPage('Studentflashcard'); }} className={selectedMenu === 'Studentflashcard' ? 'active' : ''}>
                        <img src="/icons/flashcards.png" alt="Flashcards" /> Flashcards
                    </li>
                    <li onClick={() => { setSelectedMenu('StudentAskCurio'); setCurrentPage('StudentAskCurio'); }} className={selectedMenu === 'StudentAskCurio' ? 'active' : ''}>
                        <img src="/icons/create-content.png" alt="Ask Curio AI" /> Ask Curio AI
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
                                        <li>Profile</li>
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
};

export default StudentHome;
