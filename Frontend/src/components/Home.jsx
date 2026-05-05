import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, PlayCircle, LogOut, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TOPICS = [
  { name: 'Arrays & Hashing', url: 'https://neetcode.io/courses/dsa-for-beginners/0' },
  { name: 'Two Pointers', url: 'https://neetcode.io/courses/dsa-for-beginners/1' },
  { name: 'Sliding Window', url: 'https://neetcode.io/courses/dsa-for-beginners/2' },
  { name: 'Stack', url: 'https://neetcode.io/courses/dsa-for-beginners/3' },
  { name: 'Binary Search', url: 'https://neetcode.io/courses/dsa-for-beginners/4' },
  { name: 'Linked List', url: 'https://neetcode.io/courses/dsa-for-beginners/5' },
  { name: 'Trees', url: 'https://neetcode.io/courses/dsa-for-beginners/6' },
  { name: 'Graphs', url: 'https://neetcode.io/courses/dsa-for-beginners/9' },
];

const Home = () => {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:5001/api/interviews/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setProgress(response.data.progress || {});
      } catch (err) {
        console.error('Failed to fetch history', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-6 lg:p-12 text-white">
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
          AI DSA Platform
        </h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        {/* Hero / Special Feature Section */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 p-8 lg:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Master Data Structures & Algorithms</h2>
              <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
                Experience realistic, AI-driven mock interviews. Test your knowledge, receive immediate feedback, and track your progress to ace your real technical interviews.
              </p>
              <Link 
                to="/interview"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
              >
                <PlayCircle className="w-6 h-6" />
                Take Mock Interview
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="w-64 h-64 bg-indigo-500/10 rounded-full flex items-center justify-center border border-indigo-500/20 relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                <TrendingUp className="w-24 h-24 text-indigo-400 relative z-10" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Topic Wise Progress */}
        {!loading && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-indigo-400" />
              <h3 className="text-2xl font-bold">Topic Wise Progress</h3>
            </div>
            {Object.keys(progress).length === 0 ? (
              <p className="text-gray-400 mb-6 bg-white/5 p-4 rounded-xl border border-white/10">Take a mock interview to start tracking your progress here!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['arrays', 'two_pointers', 'sliding_window', 'stack', 'binary_search', 'linked_list', 'trees', 'graphs'].map((topicName) => {
                  const status = progress[topicName] || 'Not Started';
                  const isStruggling = status === 'Needs Review';
                  const isDoingWell = status === 'Doing Well';
                  
                  return (
                    <div key={topicName} className={`border p-5 rounded-2xl flex items-start justify-between ${isStruggling ? 'bg-orange-500/10 border-orange-500/20' : isDoingWell ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/10'}`}>
                      <div>
                        <h4 className="font-semibold text-white capitalize mb-1">{topicName.replace('_', ' ')}</h4>
                        <p className={`text-xs font-medium ${isStruggling ? 'text-orange-400' : isDoingWell ? 'text-emerald-400' : 'text-gray-400'}`}>
                          {status}
                        </p>
                      </div>
                      {status !== 'Not Started' && (
                        <div className={`p-2 rounded-lg ${isStruggling ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {isStruggling ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* DSA Notes Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-bold">DSA Notes & Resources</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {TOPICS.map((topic, i) => (
              <a 
                key={i}
                href={topic.url}
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 p-5 rounded-2xl flex flex-col transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-emerald-500/20 p-2 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <h4 className="font-semibold text-lg text-gray-200 mb-1">{topic.name}</h4>
                <p className="text-xs text-gray-400">View notes & video tutorials ↗</p>
              </a>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
