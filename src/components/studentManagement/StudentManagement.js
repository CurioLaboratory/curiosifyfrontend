import React, { useState } from 'react';
import './StudentManagement.scss';

const StudentManagement = () => {
  const [batches, setBatches] = useState([]);
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [subject, setSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [showStudentList, setShowStudentList] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(null);

  const handleCreateBatch = () => {
    const newBatch = { id: Date.now(), name: batchName, subject: subject, students: [] };
    setBatches([...batches, newBatch]);
    setShowCreateBatch(false);
  };

  const handleAddStudent = (email) => {
    const updatedBatch = { ...currentBatch, students: [...currentBatch.students, { email, id: Date.now() }] };
    setBatches(batches.map(batch => (batch.id === currentBatch.id ? updatedBatch : batch)));
    setStudents(updatedBatch.students);
  };

  const handleDeleteStudent = (id) => {
    const updatedBatch = { ...currentBatch, students: currentBatch.students.filter(student => student.id !== id) };
    setBatches(batches.map(batch => (batch.id === currentBatch.id ? updatedBatch : batch)));
    setStudents(updatedBatch.students);
  };

  const handleBatchClick = (batch) => {
    setCurrentBatch(batch);
    setStudents(batch.students);
    setShowStudentList(true);
  };

  return (
    <div className="student-management">
      {showStudentList ? (
        <div className="student-list">
          <button onClick={() => setShowStudentList(false)}>Back</button>
          <h1>Batch - {currentBatch.name}</h1>
          <div className="student-add">
            <input type="text" placeholder="Email ID" onKeyDown={(e) => e.key === 'Enter' && handleAddStudent(e.target.value)} />
            <button onClick={() => handleAddStudent(document.querySelector('input').value)}>Add</button>
          </div>
          <div className="student-list">
            <table>
              <thead>
                <tr>
                  <th>Email ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.email}</td>
                    <td><button onClick={() => handleDeleteStudent(student.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          {showCreateBatch ? (
            <div className="create-batch">
              <button onClick={() => setShowCreateBatch(false)}>Back</button>
              <h1>Create batch list</h1>
              <input type="text" placeholder="Batch Name" value={batchName} onChange={(e) => setBatchName(e.target.value)} />
              <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              <button onClick={handleCreateBatch}>Next</button>
            </div>
          ) : (
            <div>
              {batches.length === 0 ? (
                <div className="no-batches">
                  <p>You haven't created any batch list yet</p>
                  <button onClick={() => setShowCreateBatch(true)}>Create batch list</button>
                </div>
              ) : (
                <div className="batch-list">
                  <button onClick={() => setShowCreateBatch(true)}>Create new batch</button>
                  <table>
                    <thead>
                      <tr>
                        <th>Batch</th>
                        <th>Subject</th>
                        <th>No. of Students</th>
                        <th>Created On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map(batch => (
                        <tr key={batch.id}>
                          <td>{batch.name}</td>
                          <td>{batch.subject}</td>
                          <td>{batch.students.length}</td>
                          <td>{new Date(batch.id).toLocaleDateString()}</td>
                          <td><button onClick={() => handleBatchClick(batch)}>View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
