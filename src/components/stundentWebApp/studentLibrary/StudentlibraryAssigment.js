import React, { useState } from 'react';
import './Studentlibrary.scss'; // Ensure this SCSS file is linked

const StudentlibraryAssignment = ({ searchQuery, selectedClasses }) => {
  const [assignments, setAssignments] = useState([
    { title: "Linear Equations", subject: "Maths", class: "9" },
    { title: "Cell structure and function", subject: "Biology", class: "10" },
    { title: "Atomic structure", subject: "Chemistry", class: "11" },
    { title: "Linear Equations", subject: "Maths", class: "9" },
    { title: "Cell structure and function", subject: "Biology", class: "10" },
    { title: "Atomic structure", subject: "Chemistry", class: "11" },
    { title: "Linear Equations", subject: "Maths", class: "9" },
    { title: "Cell structure and function", subject: "Biology", class: "10" },
    { title: "Atomic structure", subject: "Chemistry", class: "11" },
    { title: "Linear Equations", subject: "Maths", class: "9" },
    { title: "Cell structure and function", subject: "Biology", class: "10" },
    { title: "Atomic structure", subject: "Chemistry", class: "11" },
    // Add more assignments as needed
  ]);

  const [menuVisible, setMenuVisible] = useState(null); // Index of the assignment with open menu

  // Filter assignments based on search query and selected classes
  const filteredAssignments = assignments.filter(assignment =>
    (selectedClasses.length === 0 || selectedClasses.includes(assignment.class)) &&
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle the deletion of an assignment
  const handleDelete = (index) => {
    const updatedAssignments = [...assignments];
    updatedAssignments.splice(index, 1); // Remove the selected assignment
    setAssignments(updatedAssignments);
    setMenuVisible(null); // Hide the menu after deletion
  };

  // Function to handle showing the menu
  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index); // Toggle the menu visibility
  };

  return (
    <div className="Studentlibrary-scrollable-container">
      <div className="Studentlibrary-assignment-grid">
        {filteredAssignments.map((assignment, index) => (
          <div key={index} className="assignment-card">
            <div className="card-header">
              <div className="icon">
                📄 {/* Default document icon emoji */}
              </div>
              <div className="header-content">
                <div className="title">{assignment.title}</div>
                <div className="details">
                  <p><strong>Subject:</strong> {assignment.subject}</p>
                  <p><strong>Class:</strong> {assignment.class}</p>
                </div>
              </div>
              <div className="menu-dots" onClick={() => toggleMenu(index)}>
                <span>⋮</span> {/* Three dots */}
              </div>

              {/* Conditionally render the context menu if menuVisible is the current index */}
              {menuVisible === index && (
                <div className="context-menu">
                  <button onClick={() => handleDelete(index)}>Delete</button>
                  <button>Publish</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentlibraryAssignment;
