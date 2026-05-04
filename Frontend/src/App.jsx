import React, { useState } from 'react';
import InterviewHeader from './components/InterviewHeader';
import CandidateStatsSidebar from './components/CandidateStatsSidebar';
import InterviewChatScreen from './components/InterviewChatScreen';
import axios from 'axios';

function App() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      type: 'text',
      content: 'Welcome to your DSA Interview. I am your AI interviewer today. Are you ready to begin? We will be focusing on Arrays and Hashing.'
    }
  ]);
  
  const [stats, setStats] = useState({
    score: 0,
    accuracy: 100,
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
      const response = await axios.post('http://localhost:5001/api/chat', { message: text });
      
      const replyMessage = response.data.reply;
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: replyMessage }]);
      
      if (response.data.score) {
        setStats(prev => ({ 
          ...prev, 
          score: response.data.totalScore,
          questionsAnswered: prev.questionsAnswered + 1 
        }));
      }

      setIsTyping(false);

    } catch (error) {
      console.error('Error communicating with backend:', error);
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: 'Sorry, I encountered an error. Please try again.' }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-7xl mx-auto">
      <InterviewHeader />
      
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

export default App;
