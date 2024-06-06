import React, { useState } from 'react';
import './HomePage.scss';
import Quiz from './quiz/Quiz';
import CreateQuiz from './quiz/CreateQuiz';
import Library from './library/Library';
import ScanAI from './scanAI/ScanAI';
import Events from './events/Events';
import StudentManagement from './studentManagement/StudentManagement';

const HomePage = () => {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="content">
            <h1>Hi Jane, Welcome back!</h1>
            <div className="widgets">
              <div className="widget">
                <h2>Weekly summary</h2>
                <p>Check back shortly for your weekly summary update!</p>
              </div>
              <div className="widget">
                <h2>Quiz Performance</h2>
                <p>You have no quizzes.</p>
                <button onClick={() => setCurrentPage('create-quiz')}>Create Quiz</button>
              </div>
              <div className="widget">
                <h2>Activity feed</h2>
                <p>No activity</p>
              </div>
              <div className="widget">
                <h2>Schedule</h2>
                <p>No Events Scheduled</p>
              </div>
            </div>
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
      case 'student-management':
        return <StudentManagement />;
      default:
        return <div className="content"><h1>Content Not Found</h1></div>;
    }
  };

  return (
    <div className="home-page">
      <div className="sidebar">
        <div className="logo">CURIOSIFY</div>
        <ul>
          <li onClick={() => { setSelectedMenu('home'); setCurrentPage('home'); }} className={selectedMenu === 'home' ? 'active' : ''}>
            <img src="/icons/home.png" alt="Home" /> Home
          </li>
          <li onClick={() => { setSelectedMenu('quiz'); setCurrentPage('quiz'); }} className={selectedMenu === 'quiz' ? 'active' : ''}>
            <img src="/icons/quiz.png" alt="Quiz" /> Quiz
          </li>
          <li onClick={() => { setSelectedMenu('library'); setCurrentPage('library'); }} className={selectedMenu === 'library' ? 'active' : ''}>
            <img src="/icons/library.png" alt="Library" /> Library
          </li>
          <li onClick={() => { setSelectedMenu('events'); setCurrentPage('events'); }} className={selectedMenu === 'events' ? 'active' : ''}>
            <img src="/icons/events.png" alt="Events" /> Events
          </li>
          <li onClick={() => { setSelectedMenu('scan-ai'); setCurrentPage('scan-ai'); }} className={selectedMenu === 'scan-ai' ? 'active' : ''}>
            <img src="/icons/scan-ai.png" alt="Scan AI" /> Scan AI
          </li>
          <li onClick={() => setSelectedMenu('flashcards')} className={selectedMenu === 'flashcards' ? 'active' : ''}>
            <img src="/icons/flashcards.png" alt="Flashcards" /> Flashcards
          </li>
          <li onClick={() => setSelectedMenu('create-content')} className={selectedMenu === 'create-content' ? 'active' : ''}>
            <img src="/icons/create-content.png" alt="Create content with Curio AI" /> Create content with Curio AI
          </li>
          <li onClick={() => { setSelectedMenu('student-management'); setCurrentPage('student-management'); }} className={selectedMenu === 'student-management' ? 'active' : ''}>
            <img src="/icons/student-management.png" alt="Student Management" /> Student Management
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
              <div className="profile-name">Jane H</div>
              <div className="dropdown-icon">▼</div>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <ul>
                    <li>Profile</li>
                    <li>Settings</li>
                    <li>Logout</li>
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
