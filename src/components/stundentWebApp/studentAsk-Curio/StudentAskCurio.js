import React, { useState } from 'react';
import StudentAskCuriohome from './StudentAskCuriohome';
import StudentAiTutor from './StudentAiTutor/StudentAiTutor';
import StudentDocChat from './StudentDocChat/StudentDocChat';
import StudentDocChatAi from './StudentDocChat/StudentDocChatAi';
import StudentAiTutorAichat from './StudentAiTutor/StudentAiTutorAichat';
const StudentAskCurio=()=>{

const [currentPage, setCurrentPage] = useState('StudentAskCuriohome');
const [fileData, setFileData] = useState(null);
const [Aichattitle, setAichattitle] = useState({
  subject: "",
  language: "",
  class: "",
  topic: ""
});


const renderContent = () => {
    switch (currentPage) {
      case 'StudentAskCuriohome':
        return <StudentAskCuriohome setCurrentPage={setCurrentPage}/>   
      case 'StudentAiTutor'  :
        return <StudentAiTutor setCurrentPage={setCurrentPage} setAichattitle={setAichattitle}/>
      case 'StudentDocChat' :
        return <StudentDocChat setCurrentPage={setCurrentPage}   setFileData={setFileData} />
      case 'StudentDocChatAi':
        return <StudentDocChatAi fileData={fileData} />
      case 'StudentAiTutorAichat':
        return <StudentAiTutorAichat Aichattitle={Aichattitle} />
      default:
        return <div className="content"><h1>Content Not Found</h1></div>;
    }
};

return(
   <div>
   {renderContent()}
   </div>
);
}

export default StudentAskCurio;