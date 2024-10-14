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
import StudentLogin from './components/stundentWebApp/StudentLogin';
import StudentHome from './components/stundentWebApp/Studenthome';
import './App.scss';
import { AuthProvider } from './components/auth/AuthContext';
import { TeacherProtectedRoute, StudentProtectedRoute } from './components/auth/Protectedroutes'; // Adjust the path as necessary
import VerifyEmail from './components/auth/Verifyemail';
import QuizPage from './components/stundentWebApp/studentQuiz/Quizpage';
import { QuizProvider } from './components/stundentWebApp/QuizContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<TeacherProtectedRoute element={<HomePage />} />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/library" element={<Library />} />
          <Route path="/events" element={<Events />} />
          <Route path="/scanai" element={<ScanAI />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/studenthome" element={
            <StudentProtectedRoute element={
              <QuizProvider>
                <StudentHome />
              </QuizProvider>
            } />
          } />
          <Route path="/studentmanagement" element={<StudentManagement />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/take-quiz" element={<QuizPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
