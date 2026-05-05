import React, { useState } from 'react';
import InterviewHeader from './InterviewHeader';
import CandidateStatsSidebar from './CandidateStatsSidebar';
import InterviewChatScreen from './InterviewChatScreen';
import axios from 'axios';

function Interview() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      type: 'text',
      content: 'Welcome to your DSA Interview. I am your AI interviewer today. Are you ready to begin? We will be focusing on Arrays and Hashing.'
    }
  ]);
  
  const [stats, setStats] = useState({
    questionsAnswered: 0,
    totalQuestions: 5,
    topics: [
      { name: 'Arrays & Hashing', completed: false },
      { name: 'Two Pointers', completed: false },
      { name: 'Sliding Window', completed: false },
      { name: 'Trees', completed: false }
    ]
  });

  const handleSendMessage = async (text) => {
    // Add user message
    const newMessages = [...messages, { role: 'user', type: 'text', content: text }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/api/chat', 
        { message: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const replyMessage = response.data.reply;
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: replyMessage }]);
      
      if (response.data.isQuestion === false && !response.data.reply.includes("Interview Completed")) {
        setStats(prev => ({ 
          ...prev, 
          questionsAnswered: Math.min(prev.questionsAnswered + 1, prev.totalQuestions)
        }));
      }

      setIsTyping(false);

    } catch (error) {
      console.error('Error communicating with backend:', error);
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: 'Sorry, I encountered an error. Please try again.' }]);
      setIsTyping(false);
    }
  };

  const handleEndInterview = () => {
    handleSendMessage("I am ending the interview now. Please give a final concluding summary.");
  };

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-7xl mx-auto">
      <InterviewHeader onEnd={handleEndInterview} />
      
      <main className="flex-1 flex flex-col lg:flex-row gap-6 px-4 pb-6">
        <InterviewChatScreen 
          messages={messages} 
          isTyping={isTyping} 
          onSendMessage={handleSendMessage} 
        />
        
        <CandidateStatsSidebar stats={stats} />
      </main>
    </div>
  );
}

export default Interview;
