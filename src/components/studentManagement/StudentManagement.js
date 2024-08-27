import React, { useEffect, useState } from 'react';
import './StudentManagement.scss';
import axiosInstance from "../../axiosInstance";

const StudentManagement = () => {
  const [batches, setBatches] = useState([]);
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [subject, setSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [showStudentList, setShowStudentList] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(null);
  const [refreshBatches, setRefreshBatches] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  useEffect(() => {
    const getAllBatches = async () => {
      const response = await axiosInstance.get("/studentManagement/getAllBatches");
      if (response.status === 200) {
        setBatches(response.data.allBatches);
        setLoading(false);
      }
    };

    getAllBatches();
  }, [refreshBatches]);

  const handleCreateBatch = async () => {
    // const newBatch = { id: Date.now(), name: batchName, subject: subject, students: [] };
    const response = await axiosInstance.post("/studentManagement/createBatch", {
      batchName,
      subject,
      dateCreated: Date.now()
    });

    if (response.status === 201) {
      setBatchName("");
      setSubject("");
      setShowCreateBatch(false);
      setRefreshBatches(!refreshBatches);
    }
    // setBatches([...batches, newBatch]);
  };

  const handleAddStudent = async () => {
    // const updatedBatch = { ...currentBatch, students: [...currentBatch.students, { email, id: Date.now() }] };
    // setBatches(batches.map(batch => (batch.id === currentBatch.id ? updatedBatch : batch)));
    // setStudents(updatedBatch.students);
    try {
      const response = await axiosInstance.post(`/studentManagement/addEmail/${currentBatch._id}`, {
        studentEmail
      });
      if (response.status === 200) {
        setError("");
        getBatch(currentBatch._id);
        setStudentEmail("");
      }
    } catch (error) {
      if (error.response.status === 406 || error.response.status === 404 || error.response.status === 409) {
        setError(error.response.data.message);
      }
    }
  };

  const handleDeleteStudent = async (email) => {
    // const updatedBatch = { ...currentBatch, students: currentBatch.students.filter(student => student.id !== id) };
    // setBatches(batches.map(batch => (batch.id === currentBatch.id ? updatedBatch : batch)));
    // setStudents(updatedBatch.students);
    try {
      const response = await axiosInstance.post(`/studentManagement/deleteEmail/${currentBatch._id}`, {
        studentEmail: email
      });

      if (response.status === 201) {
        getBatch(currentBatch._id);
      }
    } catch (error) {
      setError("Error deleting the student.");
    }
  };

  const handleBatchClick = (batchId) => {
    if (getBatch(batchId)) setShowStudentList(true);
  };

  const getBatch = async (batchId) => {
    const response = await axiosInstance.get(`/studentManagement/getBatch/${batchId}`);
    if (response.status === 200) {
      setCurrentBatch(response.data.batch);
      setStudents(response.data.batch.students);
      return true;
    }
    return false;
  }

  const formatDate = (dateString) => {
    const date = new Date(Number(dateString));

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        handleAddStudent();
        break;
      default:
        if (error.length !== 0) setError("");
        break;
    }
  }

  return (
    <div className="student-management">
      {showStudentList ? (
        <div className="student-list">
          <button onClick={() => setShowStudentList(false)}>Back</button>
          <h1>Batch - {currentBatch?.name}</h1>
          {error.length !== 0 && <div id='error-msg'>{error}</div>}
          <div className="student-add">
            <input type="text" placeholder="Email ID" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} onKeyDown={handleKeyDown} />
            <button onClick={handleAddStudent}>Add</button>
          </div>
            {students.length === 0 ? (
              <div>
                No students added!
              </div>
            ) : (
              <div className="student-list">
              <table>
                <thead>
                  <tr>
                    <th>Email ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.email}</td>
                      <td><button onClick={() => handleDeleteStudent(student.email)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
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
              { loading ? <div>
                Loading...
              </div> : 
            <>
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
                        <tr key={batch._id}>
                          <td>{batch.name}</td>
                          <td>{batch.subject}</td>
                          <td>{batch.students.length}</td>
                          <td>{formatDate(batch.dateCreated)}</td>
                          <td><button onClick={() => handleBatchClick(batch._id)}>View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
            }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
