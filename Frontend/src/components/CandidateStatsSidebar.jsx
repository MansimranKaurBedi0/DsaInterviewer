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
