import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from './components/HomePage';
import Quiz from './components/quiz/Quiz';
import CreateQuiz from './components/quiz/CreateQuiz';
import Library from './components/library/Library';
import Events from './components/events/Events';
import ScanAI from './components/scanAI/ScanAI';
import StudentManagement from './components/studentManagement/StudentManagement';
import './App.scss';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path = "/quiz" element = {<Quiz />} />
      <Route path = "/createquiz" element = {<CreateQuiz />} />
      <Route path = "/library" element = {<Library />} />
      <Route path = "/events" element = {<Events />} />
      <Route path = "/scanai" element = {<ScanAI />} />
      <Route path = "/studentmanagement" element = {<StudentManagement />} />
    </Routes>
  </Router>
  );
}

export default App;
