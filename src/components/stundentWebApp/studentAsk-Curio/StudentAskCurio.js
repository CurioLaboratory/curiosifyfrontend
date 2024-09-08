import React, { useState } from 'react';
import StudentAskCuriohome from './StudentAskCuriohome';
import StudentAiTutor from './StudentAiTutor/StudentAiTutor';
import StudentDocChat from './StudentDocChat/StudentDocChat';
import StudentDocChatAi from './StudentDocChat/StudentDocChatAi';
const StudentAskCurio=()=>{

const [currentPage, setCurrentPage] = useState('StudentAskCuriohome');
const [fileData, setFileData] = useState(null);

const renderContent = () => {
    switch (currentPage) {
      case 'StudentAskCuriohome':
        return <StudentAskCuriohome setCurrentPage={setCurrentPage}/>   
      case 'StudentAiTutor'  :
        return <StudentAiTutor/>
      case 'StudentDocChat' :
        return <StudentDocChat setCurrentPage={setCurrentPage}   setFileData={setFileData} />
      case 'StudentDocChatAi':
        return <StudentDocChatAi fileData={fileData} />
      default:
        return <div className="content"><h1>Content Not Found</h1></div>;
    }
};

return(
   <div>
   {renderContent()};
   </div>
);
}

export default StudentAskCurio;