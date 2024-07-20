// import React, { useState, useEffect } from 'react';
// import './ScanAI.scss';

// const ScanAI = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('Assignments');

//   useEffect(() => {
//     // Simulating a fetch request to the backend with dummy data
//     setTimeout(() => {
//       const dummyAssignments = [
//         { id: 1, topic: 'Thermodynamics', class: 11, submissions: 300, markingScheme: false },
//         { id: 2, topic: 'Evolution', class: 12, submissions: 400, markingScheme: true },
//         { id: 3, topic: 'Metals and Nonmetals', class: 10, submissions: 150, markingScheme: false },
//         { id: 4, topic: 'Atomic structure', class: 11, submissions: 250, markingScheme: true },
//       ];

//       const dummyExams = [
//         { id: 1, topic: 'Thermodynamics', class: 11, submissions: 300 },
//         { id: 2, topic: 'Evolution', class: 12, submissions: 400 },
//         { id: 3, topic: 'Metals and Nonmetals', class: 10, submissions: 150 },
//         { id: 4, topic: 'Atomic structure', class: 11, submissions: 250 },
//       ];

//       setAssignments(dummyAssignments);
//       setExams(dummyExams);
//       setLoading(false);
//     }, 10); // Simulating network delay
//   }, []);

//   const renderNoData = () => (
//     <div className="no-data">
//       <p>No data found</p>
//     </div>
//   );

//   const renderData = (data, type) => (
//     <table>
//       <thead>
//         <tr>
//           <th>TOPIC</th>
//           <th>CLASS</th>
//           <th>NO. OF SUBMISSIONS</th>
//           {type === 'Assignments' && <th>MARKING SCHEME</th>}
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map(item => (
//           <tr key={item.id}>
//             <td>{item.topic}</td>
//             <td>{item.class}</td>
//             <td>{item.submissions}</td>
//             {type === 'Assignments' && (
//               <td>{item.markingScheme ? 'Not required' : <button onClick={() => setShowUploadModal(true)}>Upload</button>}</td>
//             )}
//             <td>
//               <button onClick={() => console.log('Scan', item.id)}>Scan</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   const renderUploadModal = () => (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h2>Upload marking scheme</h2>
//         <form>
//           <div className="form-group">
//             <label>Upload a file</label>
//             <input type="file" />
//           </div>
//           <div className="form-actions">
//             <button type="button" onClick={() => setShowUploadModal(false)}>Cancel</button>
//             <button type="button" onClick={() => setShowUploadModal(false)}>Upload</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="scan-ai-page">
//       <div className="scan-ai-header">
//         <h1>Scan AI</h1>
//         <p>Get started with Scan AI and elevate your assessment process</p>
//         <div className="upload-buttons">
//           <button className="upload-button">Upload a Answer sheet</button>
//           <button className="upload-button">Upload marking scheme</button>
//         </div>
//         <button className="scan-button">Scan</button>
//       </div>
//       <div className="tabs">
//         <button className={selectedTab === 'Assignments' ? 'active' : ''} onClick={() => setSelectedTab('Assignments')}>Assignments</button>
//         <button className={selectedTab === 'Exams' ? 'active' : ''} onClick={() => setSelectedTab('Exams')}>Exams</button>
//       </div>
//       <div className="data-table">
//         {selectedTab === 'Assignments' ? (
//           assignments.length === 0 ? renderNoData() : renderData(assignments, 'Assignments')
//         ) : (
//           exams.length === 0 ? renderNoData() : renderData(exams, 'Exams')
//         )}
//       </div>
//       {showUploadModal && renderUploadModal()}
//     </div>
//   );
// };

// export default ScanAI;

import React, { useState, useEffect } from 'react';
import './ScanAI.scss';

const ScanAI = () => {
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Assignments');

  useEffect(() => {
    setTimeout(() => {
      const dummyAssignments = [
        { id: 1, topic: 'Thermodynamics', class: 11, submissions: 300, markingScheme: false },
        { id: 2, topic: 'Evolution', class: 12, submissions: 400, markingScheme: true },
        { id: 3, topic: 'Metals and Nonmetals', class: 10, submissions: 150, markingScheme: false },
        { id: 4, topic: 'Atomic structure', class: 11, submissions: 250, markingScheme: true },
      ];

      const dummyExams = [
        { id: 1, topic: 'Thermodynamics', class: 11, submissions: 300 },
        { id: 2, topic: 'Evolution', class: 12, submissions: 400 },
        { id: 3, topic: 'Metals and Nonmetals', class: 10, submissions: 150 },
        { id: 4, topic: 'Atomic structure', class: 11, submissions: 250 },
      ];

      setAssignments(dummyAssignments);
      setExams(dummyExams);
      setLoading(false);
    }, 1000);
  }, []);

  const renderNoData = () => (
    <div className="no-data">
      <p>No data found</p>
    </div>
  );

  const renderData = (data, type) => (
    <table>
      <thead>
        <tr>
          <th>TOPIC</th>
          <th>CLASS</th>
          <th>NO. OF SUBMISSIONS</th>
          {type === 'Assignments' && <th>MARKING SCHEME</th>}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.topic}</td>
            <td>{item.class}</td>
            <td>{item.submissions}</td>
            {type === 'Assignments' && (
              <td>{item.markingScheme ? 'Not required' : <button onClick={() => setShowUploadModal(true)}>Upload</button>}</td>
            )}
            <td>
              <button onClick={() => console.log('Scan', item.id)}>Scan</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderUploadModal = () => (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Upload marking scheme</h2>
        <form>
          <div className="form-group">
            <label>Upload a file</label>
            <input type="file" />
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
    <div className="scan-ai-page">
      <div className="scan-ai-header">
        <h1>Scan AI</h1>
        <p className='p1' >Get started with Scan AI and elevate your assessment process</p>
        <p className='p2'>Upload a Answer sheet</p>
        <img className="event-card-img" src='./icons/maksheet.png' alt="Upload" />
        <p className='p3'>Upload marking scheme</p>
        <img className="event-card-img" src='./icons/markingScheme.png' alt="Upload" />
        <button className="scanbutton">Scan</button>

      </div>
      <div className="tabs">
        <button className={selectedTab === 'Assignments' ? 'active' : ''} onClick={() => setSelectedTab('Assignments')}>Assignments</button>
        <button className={selectedTab === 'Exams' ? 'active' : ''} onClick={() => setSelectedTab('Exams')}>Exams</button>
      </div>
      <div className="data-table">
        {selectedTab === 'Assignments' ? (
          assignments.length === 0 ? renderNoData() : renderData(assignments, 'Assignments')
        ) : (
          exams.length === 0 ? renderNoData() : renderData(exams, 'Exams')
        )}
      </div>
      {showUploadModal && renderUploadModal()}
    </div>
  );
};

export default ScanAI;
