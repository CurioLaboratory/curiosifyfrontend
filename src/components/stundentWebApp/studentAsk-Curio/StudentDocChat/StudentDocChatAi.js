import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack'; // Import pdfjs-dist
import './StudentDocChatAi.scss';
import axios from 'axios';

const StudentDocChatAi = ({ fileData }) => {
  const [documents, setDocuments] = useState(fileData ? [fileData] : []);
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const chatEndRef = useRef(null);
  const [pdfTexts, setPdfTexts] = useState([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    const fetchInitialText = async () => {
      if (fileData) {
        try {
          const initialText = await extractTextFromPdf(fileData);
          setPdfTexts([initialText]); // Set it as an array with the first item being the extracted text
        } catch (error) {
          console.error("Error extracting initial text:", error);
        }
      }
    };
  
    fetchInitialText(); // Call the async function
  }, [fileData]);

  const extractTextFromPdf = async (file) => {
    const pdfText = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        try {
          const typedarray = new Uint8Array(fileReader.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          const numPages = pdf.numPages;
          let text = '';

          for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            text += pageText + ' '; // Append text of each page
          }

         // console.log("Extracted Text: ", text); // Log the extracted text for debugging
          resolve(text.trim()); // Resolve promise with extracted text
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
          reject("Failed to extract text from the PDF.");
        }
      };
      fileReader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
    });

    return pdfText;
  };

  const handleFileUpload = async (event) => {
    const newDocument = event.target.files[0];
    if (newDocument) {
      try {
        const text = await extractTextFromPdf(newDocument);
        setPdfTexts([...pdfTexts, text]);
        setDocuments([...documents, newDocument]);
        resetFileInput();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleRemoveDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
    setPdfTexts(pdfTexts.filter((_, i) => i !== index));
  };

  const handleAskQuestion = () => {
    if (question) {
      setChatMessages([...chatMessages, { sender: "user", text: question }]);
      setQuestion("");
  
        // If no matching text found, prepare all relevant text from pdfTexts
        const relevantText = pdfTexts.map((text, index) => `pdf${index + 1}text: ${text}`).join('\n');
  
        callOpenAiAPI(question, relevantText).then(response => {
          setChatMessages(prevMessages => [
            ...prevMessages,
            { sender: "bot", text: response }
          ]);
        });
      
    }
  };
  

  const callOpenAiAPI = async (question, relevantText) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Question: ${question}\nContext: ${relevantText}`,
            },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer sk-fCTQ0PeogLBJ-iZswUO7dWtDx0z3AcbU1ywQWGq63MT3BlbkFJyk_Xb9X_AeGkG8_Ish7mUHE3JmhGV0yPr_ODirkLwA`, // Replace with your OpenAI API key
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "Oops! Something went wrong. Please try again.";
    }
  };

  const resetFileInput = () => {
    setFileInputKey(Date.now());
  };

  return (
    <div className="document-upload-page">
      <div className="document-section">
        <h2>Sources</h2>
        <div className="document-grid">
          {documents.map((doc, index) => (
            <div key={index} className="document-item">
              {/* <img
                src={URL.createObjectURL(doc)}
                alt={doc.name}
                className="document-thumbnail"
              /> */}
              <p>{doc.name}</p>
              <button onClick={() => handleRemoveDocument(index)}>Remove</button>
            </div>
          ))}
          <div className="upload-more">
            <input
              type="file"
              id="file-input"
              key={fileInputKey}
              hidden
              onChange={handleFileUpload}
            />
            <label htmlFor="file-input" className="upload-label">
              Upload More Files
            </label>
          </div>
        </div>
      </div>

      <div className="Docchat-Ai-chat-container">
        <div className="chat-area">
          {chatMessages.length === 0 ? (
            <div className="chat-suggestions">
              <h3>Start a conversation!</h3>
              <ul>
                <li onClick={() => setQuestion("Tell me about AI")}>
                  Tell me about AI
                </li>
                <li onClick={() => setQuestion("What is machine learning?")}>
                  What is machine learning?
                </li>
                <li onClick={() => setQuestion("How do neural networks work?")}>
                  How do neural networks work?
                </li>
              </ul>
            </div>
          ) : (
            chatMessages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.text}
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="question-section">
          <div className="question-input">
            <input
              type="text"
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleAskQuestion}>Ask</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDocChatAi;
