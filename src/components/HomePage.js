import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import Quiz from './quiz/Quiz';
import CreateQuiz from './quiz/CreateQuiz';
import Library from './library/Library';
import ScanAI from './scanAI/ScanAI';
import Events from './events/Events';
import StudentManagement from './studentManagement/StudentManagement';
import { useAuth } from './auth/AuthContext';
import Grid from './Grid';
import FlashCard from './flashCard/FlashCard';
import CreateFlashCard from './flashCard/CreateFlashCard';
import CreateContent from './createContent/Createcontent';
import Create_assigment from './createContent/Create_assigment'
import Createcourses from './createContent/Createcourses';
import ModulePage from './createContent/ModulePage';
const HomePage = () => {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState();
  const [chapterModuleData,setChapterModuleData]=useState({});

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
            <Grid />
          </div>
        );
      case 'quiz':
        return <Quiz onCreateQuiz={() => setCurrentPage('create-quiz')} />;
      case 'create-quiz':
        return <CreateQuiz />;
      case 'library':
        return <Library />;
      case 'events':
        return <Events />;
      case 'scan-ai':
        return <ScanAI />;
      case 'flashcards':
        return <FlashCard onCreateFlashCards={() => setCurrentPage('create-flashcards')} />
      case 'create-flashcards':
        return <CreateFlashCard setCurrentPage={setCurrentPage} />;
      case 'create-content':
        return <CreateContent onCreateAssigment={()=>setCurrentPage('create-assigment')} OnCreateCourses={()=>setCurrentPage('create-courses')}/>
      case 'create-assigment':
        return <Create_assigment/>  
      case 'create-courses':
        return <Createcourses setCurrentPage={setCurrentPage} setChapterModuleData={setChapterModuleData}/>    
      case 'create-content-module':
        return <ModulePage chapterModuleData={chapterModuleData} />;  
      case 'student-management':
        return <StudentManagement />;
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
          <li onClick={() => { setSelectedMenu('quiz'); setCurrentPage('quiz'); toggleSidebar(); }} className={selectedMenu === 'quiz' ? 'active' : ''}>
            <img src="/icons/quiz.png" alt="Quiz" /> Quiz
          </li>
          <li onClick={() => { setSelectedMenu('library'); setCurrentPage('library'); toggleSidebar(); }} className={selectedMenu === 'library' ? 'active' : ''}>
            <img src="/icons/library.png" alt="Library" /> Library
          </li>
          <li onClick={() => { setSelectedMenu('events'); setCurrentPage('events'); toggleSidebar(); }} className={selectedMenu === 'events' ? 'active' : ''}>
            <img src="/icons/events.png" alt="Events" /> Events
          </li>
          <li onClick={() => { setSelectedMenu('scan-ai'); setCurrentPage('scan-ai'); }} className={selectedMenu === 'scan-ai' ? 'active' : ''}>
            <img src="/icons/scan-ai.png" alt="Scan AI" /> Scan AI
          </li>
          <li onClick={() => { setSelectedMenu('flashcards'); setCurrentPage('flashcards'); }} className={selectedMenu === 'flashcards' ? 'active' : ''}>
            <img src="/icons/flashcards.png" alt="Flashcards" /> Flashcards
          </li>
          <li onClick={() => {setSelectedMenu('create-content');setCurrentPage('create-content');}} className={selectedMenu === 'create-content' ? 'active' : ''}>
            <img src="/icons/create-content.png" alt="Create content with Curio AI" /> Create content with Curio AI
          </li>
          <li onClick={() => { setSelectedMenu('student-management'); setCurrentPage('student-management'); }} className={selectedMenu === 'student-management' ? 'active' : ''}>
            <img src="/icons/student-management.png" alt="Student Management" /> Student Management
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          {/* <div className="hamburger" onClick={toggleSidebar}>
            {isSidebarOpen ? '✖' : '☰'}
          </div> */}
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

export default HomePage;
