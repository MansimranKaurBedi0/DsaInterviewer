import React from 'react';
import { BrainCircuit, Clock, ShieldCheck } from 'lucide-react';

const InterviewHeader = () => {
  return (
    <header className="glass-panel sticky top-0 z-10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between rounded-b-2xl mb-6 mx-4 mt-2 gap-4 sm:gap-0">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/30">
          <BrainCircuit className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            AI DSA Interviewer
          </h1>
          <p className="text-xs text-indigo-300/70 font-medium tracking-wider uppercase">Senior Software Engineer Role</p>
        </div>
      </div>

      <div className="flex items-center justify-end flex-wrap gap-3 mt-4 sm:mt-0">
        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-100">Arrays & Hashing</span>
        </div>
        
        <div className="flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-orange-200">Medium</span>
        </div>

        <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-200 font-mono">45:00</span>
        </div>
      </div>
    </header>
  );
};

export default InterviewHeader;
