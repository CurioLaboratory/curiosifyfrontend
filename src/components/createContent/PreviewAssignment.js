import React, { useState, useEffect } from "react";

const PreviewAssignment = ({ assignment,loading }) => {
    if (loading) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
      }
    if (!assignment || Object.keys(assignment).length === 0) {
        return (
            <div>No Assignment Generated</div>
        ); // Render nothing if assignment is empty
    }

    return (
        
        <div style={{ lineHeight: '1.5', fontSize:'15px' , marginLeft:'15px' }}>
            {/* Assignment Title */}
            <h2>Assignment Title: {assignment["Assignment Title"] }</h2>

            {/* Objective */}
            <p><strong>Objective:</strong> {assignment.Objective }</p>

            {/* Grading */}
            <p><strong>Grading:</strong></p>
            <ul style={{ margin: '10px 0' }}>
                {/* Assuming that grading text is complex, keeping it in a single list item */}
                <li>{assignment.Grading}</li>
            </ul>

            {/* Instructions */}
            <p><strong>Instructions:</strong></p>
            <ol style={{ margin: '10px 0' }}>
                {assignment.Instructions?.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </div>
    );
};

export default PreviewAssignment;
