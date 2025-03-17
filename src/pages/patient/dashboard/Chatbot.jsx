import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PatientDashboardLayout from "../../../components/PatientDashboardLayout";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize your Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // Call Gemini API to get a response
      const result = await model.generateContent(`Act like a doctor ${userInput}`);
      const response = await result.response;
      console.log(response);
      // Add Gemini's response to the chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: "Sorry, there was an error processing your request." },
      ]);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Function to clear the chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  // Scroll to the bottom of the chat messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <PatientDashboardLayout>
      <div className="container mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl font-bold text-center mb-4">Chatbot</h1>

        <div className="chat-container rounded-lg shadow-md p-4 bg-white">
          <div className=" overflow-y-auto h-[50vh] mb-4">

            {chatHistory.length === 0 ? (
              <div className="text-center flex items-center justify-center text-gray-500">Start typing to chat...</div>
            ) : (
              chatHistory.map((message, index) => (
                <div key={index} className={`message ${message.type === "user" ? "bg-blue-100 text-right" : "bg-green-100 text-left"} p-2 rounded-lg mb-2`}>
                  {message.message}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          {isLoading && (
            <div className="text-center mb-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex mt-4">
          <input
            type="text"
            className="flex-grow px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleUserInput}
          />
          <button
            className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            onClick={sendMessage}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
        <button
          className="mt-4 block px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 focus:outline-none"
          onClick={clearChat}
        >
          Clear Chat
        </button>
      </div>
    </PatientDashboardLayout>
  );
};

export default Chatbot;