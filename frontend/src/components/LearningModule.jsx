// src/components/LearningModule.js
import React, { useState } from 'react';
import { Play, Award } from 'lucide-react';

export default function LearningModule() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-emerald-500 text-sm font-medium">LESSON 1 • Investing Basics</div>
          <h2 className="text-3xl font-semibold">What is a Sacco and why it matters</h2>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-emerald-600">{progress}%</div>
          <div className="text-xs text-slate-400">COMPLETE</div>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 mb-8 h-64 flex items-center justify-center text-6xl">
        🎤 Voice lesson playing...
      </div>

      <div className="prose dark:prose-invert">
        <p>Cooperatives (Saccos) let Kenyans pool money safely for better returns than traditional savings.</p>
      </div>

      <div className="mt-12 flex gap-4">
        <button 
          onClick={() => setProgress(Math.min(100, progress + 20))} 
          className="flex-1 h-14 bg-emerald-600 text-white rounded-3xl font-medium flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" /> Next Section
        </button>
        <button className="flex-1 h-14 border border-slate-300 dark:border-slate-600 rounded-3xl font-medium">
          Take Quick Quiz
        </button>
      </div>

      <div className="mt-8 flex items-center gap-2 text-emerald-600 text-sm">
        <Award className="w-5 h-5" /> Streak: 21 days • Keep going!
      </div>
    </div>
  );
}