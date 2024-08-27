import React, { useState, useEffect } from 'react';
import './Library.scss';
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../auth/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Library = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateResource, setShowCreateResource] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('assignments');
  const [filterClass, setFilterClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshResources, setRefreshResources] = useState(true);
  const [selectedResource, setSelectedResource] = useState(null);
  const [newResTitle, setNewResTitle] = useState("");
  const [newResSubject, setNewResSubject] = useState("");
  const [newResClassLevel, setNewResClassLevel] = useState(9);
  const [newResDate, setNewResDate] = useState(Date.now());
  const [user, setUser] = useState("");
  const { getUser } = useAuth();

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  useEffect(() => {
    const getAllResources = async () => {
      const response = await axiosInstance.get("/library/getallresource");
      setResources(response.data);
      setLoading(false);
    }

    getAllResources();
  }, [refreshResources]);

  const handleFilterChange = (event) => {
    setFilterClass(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredResources = resources.filter(resource =>
    (filterClass ? resource.classLevel.toString() === filterClass : true) &&
    (searchTerm ? resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  const handleSave = async (e) => {
    e.preventDefault();
    if (newResTitle !== "" && newResSubject !== "") {
      const newResource = await axiosInstance.post("/library/createmanualresource", {
        title: newResTitle,
        subject: newResSubject,
        classLevel: newResClassLevel,
        date: newResDate,
        createdBy: user._id
      });
      toast.success("Resource Added!", {
        position: "top-right",
        autoClose: 1000
      });
      setShowCreateResource(false);
      setRefreshResources(!refreshResources);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      const deletedResource = await axiosInstance.delete(`/library/deleteresource/${resourceId}`);
      toast.error("Resource Deleted!", {
        position: "top-right",
        autoClose: 1000
      });
      setRefreshResources(!refreshResources);
    } catch (error) {
      console.log(error);
    }
  }

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
  }

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
        <input
          type="text"
          placeholder="Search for topic or subject"
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
          <div className="card-lib" key={resource._id} onClick={() => handleResourceSelect(resource)}>
            <div className="card-icon">
              <img className="event-delete-button" src="/icons/file.png" alt="Quiz" />
            </div>
            <div className="card-content">
              <h3 className="card-title">{resource.title}</h3>
              <p className="card-subject"> {resource.subject}</p>
              <p className="card-class">Class: {resource.classLevel} </p>
            </div>
            <div className="card-options">
              <img
                className="event-delete-button icon-options"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteResource(resource._id);
                }}
                src="/icons/dustbin.png"
                alt="Delete"
              />
            </div>
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
          <input type="text" value={newResTitle} onChange={(e) => setNewResTitle(e.target.value)} />
          <label>Enter Class Level</label>
          <select onChange={(e) => setNewResClassLevel(parseInt(e.target.value, 10))} value={newResClassLevel}>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
        </div>
        <div className="form-group">
          <div className="rich-text-editor-toolbar">
            <button type="button"><FontAwesomeIcon icon={faUndo} /></button>
            <button type="button"><FontAwesomeIcon icon={faRedo} /></button>
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
          <textarea placeholder="Start noting..." onChange={(e) => setNewResSubject(e.target.value)} value={newResSubject}></textarea>
        </div>
        <div className="form-actions">
          <button type="button">Share</button>
          <button type="button" onClick={handleSave}>Save</button>
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

  const renderSelectedResource = () => (
    <div className="selected-resource">
      {/* <button onClick={() => setSelectedResource(null)}>Back to Library</button> */}
      <button className="back-button-res" onClick={() => setSelectedResource(null)}>← Back</button>
      <h2>{selectedResource.title}</h2>
      {/* Add more details about the selected resource here */}
    </div>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="library-page">
      {selectedResource ? renderSelectedResource() :
        (showCreateResource ? renderCreateResource() :
          (resources.length === 0 ? renderNoResources() : renderResources())
        )
      }
      {showUploadModal && renderUploadModal()}
      <ToastContainer />
    </div>
  );
};

export default Library;