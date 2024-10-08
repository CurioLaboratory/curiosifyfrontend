import React, { useState } from 'react';
import Select from 'react-select';
import StudentlibraryAssignment from './StudentlibraryAssigment';
import StudentlibraryFlashcard from './StudentlibraryFlashcard';
import StudentlibraryCourses from './StudentlibraryCourses';
import './Studentlibrary.scss'; // Ensure this SCSS file is linked

const classOptions = [
  { value: '9', label: 'Class 9' },
  { value: '10', label: 'Class 10' },
  { value: '11', label: 'Class 11' },
];

const Studentlibrary = () => {
  const [currentPage, setCurrentPage] = useState('Assigment');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleClassSelection = (selectedOptions) => {
    // Update state with selected class values
    setSelectedClasses(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Assigment':
        return (
          <StudentlibraryAssignment
            searchQuery={searchQuery}
            selectedClasses={selectedClasses}
          />
        );
      case 'Courses':
        return <StudentlibraryCourses />;
      case 'Flashcard':
        return <StudentlibraryFlashcard />;
      default:
        return <div className="content"><h1>Content Not Found</h1></div>;
    }
  };

  return (
    <div className="Student-library-container">
      <h1>Library</h1>
      <div className="tabs">
        <div
          className={currentPage === 'Assigment' ? 'tab active' : 'tab'}
          onClick={() => setCurrentPage('Assigment')}
        >
          Assignment
        </div>
        <div
          className={currentPage === 'Courses' ? 'tab active' : 'tab'}
          onClick={() => setCurrentPage('Courses')}
        >
          Courses
        </div>
        <div
          className={currentPage === 'Flashcard' ? 'tab active' : 'tab'}
          onClick={() => setCurrentPage('Flashcard')}
        >
          Flashcard
        </div>
      </div>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />
        <Select
          isMulti
          options={classOptions}
          className="filter-box"
          classNamePrefix="select"
          onChange={handleClassSelection}
          placeholder="Select Classes"
        />
      </div>
      {renderContent()}
    </div>
  );
};

export default Studentlibrary;
