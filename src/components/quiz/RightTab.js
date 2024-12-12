import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useAuth } from "../auth/AuthContext";
import Card from "react-bootstrap/Card";
import "./Righttab.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressSteps from "./Loader";
const RightTab = (props) => {
  const [quizData, setQuizData] = useState([]);
  const [quizAiData, setAiQuizData] = useState({});
  const [quizuploadData, setuploadQuizData] = useState({});
  const { getUser } = useAuth();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("manualQuizData")) || [];
    setQuizData(data);
  }, [props.refreshLocalQuiz]);

  useEffect(() => {
    if (props.activeTab === "Text/AI") {
      const data = JSON.parse(localStorage.getItem("textAiTabQuiz")) || {};
      // console.log("Loaded textAiTabQuiz data:", data);
      setAiQuizData(data);
       //console.log(quizAiData);
    }
  }, [props.aiQuizGenerated]);
  
  useEffect(() => {
    if (props.activeTab === "Upload") {
      const data = JSON.parse(localStorage.getItem("uploadTabQuiz")) || {};
      console.log("Loaded uploadTabQuiz data:", data);
      setuploadQuizData(data);
      console.log("set"+quizuploadData);
    }
  }, [props.uploadQuizGenerated]);

  const handleReset = async () => {
    toast.success("Quiz Reset successfully!", {
      position: "top-right",
      autoClose: 1000,
    });
    // alert('Quiz Reset successfully!');
    if (props.activeTab === "Manual") {
      localStorage.removeItem("manualQuizData");
      setQuizData([]);
    }
   else if (props.activeTab === "Text/AI") {
      localStorage.removeItem("textAiTabQuiz");
      setAiQuizData({});
    }
   else if (props.activeTab === "Upload") {
      localStorage.removeItem("uploadTabQuiz");
      setuploadQuizData({});
    }
  };

  const handleDownload= async ()=>{
    if(props.activeTab==="Manual"){
      if (quizData.length === 0) {
        toast.info("No questions to Download!", {
          position: "top-right",
          autoClose: 1000,
        });
        // alert('No questions to publish!');
        return;
      }

      const formattedQuestions = quizData.questions.map((item) => ({
        question: item.question,          
        options: item.options || [],       
        correctAnswer: item.answer,        
      }));
      
      const finalOutput = { questions: formattedQuestions }; 

      try {
        // Send a POST request to generate and download the PDF
        const response = await axiosInstance.post(`/quiz/downloadfile`, finalOutput, {
          responseType: "blob", // Important: Ensures the response is treated as binary data
        });
    
        if (response.status !== 200) {
          throw new Error("Failed to generate quiz from external API");
        }
    
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });
    
        // Create a download link dynamically
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "questions.pdf";
        link.click();
    
        // Cleanup the object URL
        window.URL.revokeObjectURL(link.href);
    
        toast.success("PDF downloaded successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error downloading quiz:", error.message);
        toast.error("Error downloading quiz. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }
    else if(props.activeTab === "Text/AI"){
      if (Object.keys(quizAiData).length === 0 || quizAiData.totalQuestions === 0) { //Object.keys(quizAiData).length === 0
        toast.info("No questions to download!", {
          position: "top-right",
          autoClose: 1000,
        });
        // alert('No questions to publish!');
        return;
      }

      const formattedQuestions = quizAiData.questions.map((item) => ({
        question: item.question,          
        options: item.options || [],       
        correctAnswer: item.answer,        
      }));
      
      const finalOutput = { questions: formattedQuestions }; 

      try {
        // Send a POST request to generate and download the PDF
        const response = await axiosInstance.post(`/quiz/downloadfile`, finalOutput, {
          responseType: "blob", // Important: Ensures the response is treated as binary data
        });
    
        if (response.status !== 200) {
          throw new Error("Failed to generate quiz from external API");
        }
    
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });
    
        // Create a download link dynamically
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "questions.pdf";
        link.click();
    
        // Cleanup the object URL
        window.URL.revokeObjectURL(link.href);
    
        toast.success("PDF downloaded successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error downloading quiz:", error.message);
        toast.error("Error downloading quiz. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      }
      
      console.log(finalOutput);
      
    }
    else if(props.activeTab === "Upload"){
      if (Object.keys(quizuploadData).length === 0 || quizuploadData.totalQuestions === 0) { //Object.keys(quizAiData).length === 0
        toast.info("No questions to publish!", {
          position: "top-right",
          autoClose: 1000,
        });
        // alert('No questions to publish!');
        return;
      }

      const formattedQuestions = quizuploadData.questions.map((item) => ({
        question: item.question,          
        options: item.options || [],       
        correctAnswer: item.answer,        
      }));
      
      const finalOutput = { questions: formattedQuestions }; 

      try {
        // Send a POST request to generate and download the PDF
        const response = await axiosInstance.post(`/quiz/downloadfile`, finalOutput, {
          responseType: "blob", // Important: Ensures the response is treated as binary data
        });
    
        if (response.status !== 200) {
          throw new Error("Failed to generate quiz from external API");
        }
    
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "application/pdf" });
    
        // Create a download link dynamically
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "questions.pdf";
        link.click();
    
        // Cleanup the object URL
        window.URL.revokeObjectURL(link.href);
    
        toast.success("PDF downloaded successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error downloading quiz:", error.message);
        toast.error("Error downloading quiz. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }
  }
  const handlePublish = async () => {
    // console.log(quizData[0]);
    const user = getUser();
    if (props.activeTab === "Manual") {
      if (quizData.length === 0) {
        toast.info("No questions to publish!", {
          position: "top-right",
          autoClose: 1000,
        });
        // alert('No questions to publish!');
        return;
      }
      const publishedQuiz = {
        title: quizData[0].title,
        date: new Date().toLocaleDateString(),
        classLevel: quizData[0].classLevel,
        subject: quizData[0].subject,
        language: quizData[0].language,
        totalQuestions: quizData.length,
        questions: quizData.map((item) => ({
          question: item.question,
          options: item.options,
          answer: item.answer,
        })),
        createdBy: user.email,
        collegeName:user.collegeName,
      };
     // console.log("Published Quiz Data:", publishedQuiz);
   

      const response = await axiosInstance.post(
        "/quiz/createmanualquiz",
        publishedQuiz
      );
      // console.log(response.data.addedQuiz._id)
       //Upadate acttivity feed for user publish quiz
       const userdetail = JSON.parse(localStorage.getItem("user")); // Parse the stored string into an object

       if (userdetail) {
         const UserActivitydetail = {
           userId: userdetail.id,
           email: userdetail.email,
           type: "quiz",
           title: publishedQuiz.title
         };
         
         const UpdateActivityFeed = async () => {
           try {
             const response = await axiosInstance.post("/useractivityFeed/addActivity", UserActivitydetail); // For submitting the quiz
             console.log(response);
           } catch (error) {
             console.error('Error Updating Activity Feed', error);
           }
         };
       
         UpdateActivityFeed();
       } else {
         console.error('User not found in localStorage');
       }
       //

      if (response.status === 201) {
        toast.success("Quiz published successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        // alert('Quiz published successfully!');
        localStorage.removeItem("manualQuizData");
        setQuizData([]);
      }

      if (response.status === 203) {
        alert(response.data.message);
      }
    }
    
    if (props.activeTab === "Text/AI") {
      if (Object.keys(quizAiData).length === 0 || quizAiData.totalQuestions === 0) { //Object.keys(quizAiData).length === 0
        toast.info("No questions to publish!", {
          position: "top-right",
          autoClose: 1000,
        });
        // alert('No questions to publish!');
        return;
      }
      const response = await axiosInstance.post(
        "/quiz/createAIquiz",
        quizAiData
      );

      if (response.status !== 201) {
        // Check for status code 201 for successful creation
        throw new Error("Failed to save quiz in the backend database");
      }

      const savedQuizData = await response.data;
  
       //Upadate acttivity feed for user publish quiz
       const userdetail = JSON.parse(localStorage.getItem("user")); // Parse the stored string into an object

       if (userdetail) {
         const UserActivitydetail = {
           userId: userdetail.id,
           email: userdetail.email,
           type: "quiz",
           title: quizAiData.title
         };
       
         //console.log(UserActivitydetail);
       
         const UpdateActivityFeed = async () => {
           try {
             const response = await axiosInstance.post("/useractivityFeed/addActivity", UserActivitydetail); // For submitting the quiz
             console.log(response);
           } catch (error) {
             console.error('Error Updating Activity Feed', error);
           }
         };
       
         UpdateActivityFeed();
       } else {
         console.error('User not found in localStorage');
       }
       //

      if (response.status === 201) {
        toast.success("Quiz published successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        // alert('Quiz published successfully!');
        localStorage.removeItem("textAiTabQuiz");
        setAiQuizData({});
      }

      if (response.status === 203) {
        alert(response.data.message);
      }

      console.log("Quiz generated and saved successfully:", savedQuizData);
      return;
    }
    if (props.activeTab === "Upload") {
      if (Object.keys(quizuploadData).length === 0 || quizuploadData.totalQuestions === 0) { //Object.keys(quizAiData).length === 0
        toast.info("No questions to publish!", {
          position: "top-right",
          autoClose: 1000,
        });
        // alert('No questions to publish!');
        return;
      }
      const response = await axiosInstance.post(
        "/quiz/createAIquiz",
        quizuploadData
      );

      if (response.status !== 201) {
        // Check for status code 201 for successful creation
        throw new Error("Failed to save quiz in the backend database");
      }

      const savedQuizData = await response.data;

    //Upadate acttivity feed for user publish quiz
    const userdetail = JSON.parse(localStorage.getItem("user")); // Parse the stored string into an object

    if (userdetail) {
      const UserActivitydetail = {
        userId: userdetail.id,
        email: userdetail.email,
        type: "quiz",
        title: quizuploadData.title
      };
    
      //console.log(UserActivitydetail);
    
      const UpdateActivityFeed = async () => {
        try {
          const response = await axiosInstance.post("/useractivityFeed/addActivity", UserActivitydetail); // For submitting the quiz
          console.log(response);
        } catch (error) {
          console.error('Error Updating Activity Feed', error);
        }
      };
    
      UpdateActivityFeed();
    } else {
      console.error('User not found in localStorage');
    }
    //

      if (response.status === 201) {
        toast.success("Quiz published successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        // alert('Quiz published successfully!');
        localStorage.removeItem("uploadTabQuiz");
        setuploadQuizData({});
      }

      if (response.status === 203) {
        alert(response.data.message);
      }

      console.log("Quiz generated and saved successfully:", savedQuizData);
      return;
    }
    toast.info("No questions to publish!", {
      position: "top-right",
      autoClose: 1000,
    });
    // alert('No questions to publish!');
    return;
  };

  return (
    <>
      <div className="top">
        <div>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
        <h3> Review your Quiz</h3>
        <div className="Download-publish">
          <button
            type="button"
            className="publish-button"
            onClick={handleDownload}
          >
           Download
          </button>
          <button
            type="button"
            className="publish-button"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
        
      </div>
      <div className="quiz-data-display">
        <Card className="text-center cardBody">
          <Card.Body>
            <Card.Title className="cardTitle ">
              {/* <h1>Title : {quizData[0].title}</h1> */}
            </Card.Title>
            <Card.Text>
              {props.activeTab === "Manual" && (
                <div>
                  {quizData.map((item, index) => (
                    <div key={index} className="cardQues">
                      <h3>
                        {index + 1}. {item.question}
                      </h3>
                      <ul>
                        {item.options.map((option, optionIndex) => (
                          <li
                            key={optionIndex}
                            style={{
                              color: option === item.answer ? "green" : "black",
                            }}
                          >
                            {String.fromCharCode(65 + optionIndex)}: {option}
                          </li>
                        ))}
                      </ul>
                      <p>Correct Answer: {item.answer}</p>
                      <p>Created on: {item.date}</p>
                    </div>
                  ))}
                </div>
              )}
              {props.loading&&props.activeTab === "Text/AI" ? (
               <div className="loader-animation"><ProgressSteps/></div> 
              ) : (
                props.activeTab === "Text/AI" &&
                quizAiData.totalQuestions && (
                  <div>
                    {quizAiData.questions.map((item, index) => (
                      <div key={index} className="cardQues">
                        <h3>
                          {index + 1}. {item.question}
                        </h3>
                        {item.type === "Multiple Single Choice" && (
                          <ul>
                            {item.options.map((option, optionIndex) => (
                              <li
                                key={optionIndex}
                                
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.type === "Subjective" && (
                          <p>
                            -------------
                          </p>
                        )}
                        {item.type === "Formula Based" && (
                          <p>
                            -------------
                          </p>
                        )}
                        {item.type === "True/False" && (
                          <p>
                            -------------
                          </p>
                        )}
                        
                      </div>
                    ))}
                  </div>
                )
                
                
              )}
               {props.loading&&props.activeTab === "Upload" ? (
                 <div className="loader-animation"><ProgressSteps/></div> 
              ) : (
                props.activeTab === "Upload" &&
                quizuploadData.questions && (
                  <div>
                    {quizuploadData.questions.map((item, index) => (
                      <div key={index} className="cardQues">
                        <h3>
                          {index + 1}. {item.question}
                        </h3>
                        {item.type === "Multiple Single Choice" && (
                          <ul>
                            {item.options.map((option, optionIndex) => (
                              <li
                                key={optionIndex}
                                
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.type === "Subjective" && (
                          <p>
                            -------------
                          </p>
                        )}
                        {item.type === "Formula Based" && (
                          <p>
                            -------------
                          </p>
                        )}
                        {item.type === "True/False" && (
                          <p>
                            -------------
                          </p>
                        )}
                        
                      </div>
                    ))}
                  </div>
                )
              )}
            </Card.Text>
          </Card.Body>
        </Card>
        <ToastContainer />
      </div>
    </>
  );
};

export default RightTab;
