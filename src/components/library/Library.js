import React, { useState, useEffect } from 'react';
import './Library.scss';

const Library = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateResource, setShowCreateResource] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('assignments');
  const [filterClass, setFilterClass] = useState('');

  useEffect(() => {
    // Simulating a fetch request to the backend with dummy data
    setTimeout(() => {
      const dummyData = [
        { id: 1, title: 'Linear Equations', subject: 'Maths', class: 9 },
        { id: 2, title: 'Cell structure and function', subject: 'Biology', class: 10 },
        { id: 3, title: 'Atomic structure', subject: 'Chemistry', class: 11 },
      ];
      setResources(dummyData);
      setLoading(false);
    }, 10); // Simulating network delay
  }, []);

  const handleFilterChange = (event) => {
    setFilterClass(event.target.value);
  };

  const filteredResources = resources.filter(resource =>
    filterClass ? resource.class.toString() === filterClass : true
  );

  const renderNoResources = () => (
    <div className="no-resources">
      <p>You don't have any resources</p>
      <button className="create-resource-button" onClick={() => setShowCreateResource(true)}>+ Create a resource</button>
    </div>
  );

  const renderResources = () => (
    <div className="resources">
      <div className="resources-header">
        <h1>Library</h1>
        <button className="create-resource-button" onClick={() => setShowCreateResource(true)}>+ Create a resource</button>
      </div>
      <div className="filters">
        <input type="text" placeholder="Search for topic of the subject" />
        <select onChange={handleFilterChange} value={filterClass}>
          <option value="">Filter by class</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>
      </div>
      <div className="tabs">
        <button className={selectedTab === 'assignments' ? 'active' : ''} onClick={() => setSelectedTab('assignments')}>Assignments</button>
        <button className={selectedTab === 'courses' ? 'active' : ''} onClick={() => setSelectedTab('courses')}>Courses</button>
      </div>
      <div className="resources-content">
        {filteredResources.map(resource => (
          <div className="resource-card" key={resource.id}>
            <h3>{resource.title}</h3>
            <p>Subject: {resource.subject}</p>
            <p>Class: {resource.class}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateResource = () => (
    <div className="create-resource">
      <div className="create-resource-header">
        <h1>Manual Resources</h1>
        <button className="upload-button" onClick={() => setShowUploadModal(true)}>Upload</button>
        <button className="ask-ai-button">Ask AI</button>
      </div>
      <form>
        <div className="form-group">
          <label>Enter Note title</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <div className="rich-text-editor-toolbar">
            <button type="button"><i className="fas fa-undo"></i></button>
            <button type="button"><i className="fas fa-redo"></i></button>
            <select>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
            <select>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
            </select>
            <button type="button"><i className="fas fa-bold"></i></button>
            <button type="button"><i className="fas fa-italic"></i></button>
            <button type="button"><i className="fas fa-underline"></i></button>
            <button type="button"><i className="fas fa-align-left"></i></button>
            <button type="button"><i className="fas fa-align-center"></i></button>
            <button type="button"><i className="fas fa-align-right"></i></button>
            <button type="button"><i className="fas fa-align-justify"></i></button>
            <button type="button"><i className="fas fa-list-ul"></i></button>
            <button type="button"><i className="fas fa-list-ol"></i></button>
          </div>
          <textarea placeholder="Start noting..."></textarea>
        </div>
        <div className="form-actions">
          <button type="button">Share</button>
          <button type="button">Save</button>
        </div>
      </form>
    </div>
  );

  const renderUploadModal = () => (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Upload resources</h2>
        <form>
          <div className="form-group">
            <label>Upload a file</label>
            <input type="file" />
          </div>
          <div className="form-group">
            <label>Enter a title</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Summary</label>
            <textarea></textarea>
          </div>
          <div className="form-group">
            <label>Class</label>
            <select>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setShowUploadModal(false)}>Cancel</button>
            <button type="button" onClick={() => setShowUploadModal(false)}>Upload</button>
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="library-page">
      {showCreateResource ? renderCreateResource() : (resources.length === 0 ? renderNoResources() : renderResources())}
      {showUploadModal && renderUploadModal()}
    </div>
  );
};

export default Library;
