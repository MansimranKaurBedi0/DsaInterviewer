import React from 'react';
import { Target, Trophy, Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CandidateStatsSidebar = ({ stats }) => {
  return (
    <div className="lg:w-80 w-full flex-shrink-0 flex flex-col gap-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel p-6 rounded-2xl"
      >
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          Live Performance
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
            <span className="text-2xl font-bold text-white">{stats.score}</span>
            <span className="text-xs text-gray-400">Total Score</span>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center">
            <Target className="w-6 h-6 text-emerald-400 mb-2" />
            <span className="text-2xl font-bold text-white">{stats.accuracy}%</span>
            <span className="text-xs text-gray-400">Accuracy</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Questions Answered</span>
              <span className="text-white font-medium">{stats.questionsAnswered} / {stats.totalQuestions}</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                style={{ width: `${(stats.questionsAnswered / stats.totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 rounded-2xl flex-1"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Topic Progress</h3>
        <div className="space-y-3">
          {stats.topics.map((topic, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
              <CheckCircle2 className={`w-5 h-5 ${topic.completed ? 'text-emerald-400' : 'text-gray-600'}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-200">{topic.name}</p>
                <p className="text-xs text-gray-500">{topic.completed ? 'Mastered' : 'Pending'}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CandidateStatsSidebar;
