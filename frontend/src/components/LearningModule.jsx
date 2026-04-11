// src/components/LearningModule.jsx
import React, { useState } from 'react';
import { Play, Award, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LearningModule() {
  const navigate = useNavigate();
  const [progress] = useState(65);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium">
          <BookOpen className="w-4 h-4" /> Learning Hub
        </div>
        <h1 className="text-5xl font-semibold tracking-tighter mt-6">Grow your knowledge, grow your wealth</h1>
      </div>

      {/* Beautiful Learning Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700">
        <div className="h-64 bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center relative">
          <div className="text-8xl">📚</div>
          <div className="absolute bottom-6 left-8 text-white">
            <div className="text-sm opacity-75">LESSON 1 • BASICS</div>
            <div className="text-3xl font-semibold">What is a Sacco?</div>
          </div>
        </div>

        <div className="p-10">
          <div className="flex justify-between items-center mb-8">
            <div className="text-6xl font-bold text-emerald-600">{progress}%</div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Progress</div>
              <div className="flex items-center gap-1 text-emerald-600">
                <Award className="w-5 h-5" /> 21 day streak
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')} // Opens chatbot via floating widget or you can trigger it directly
            className="w-full h-14 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl font-semibold flex items-center justify-center gap-3 hover:brightness-110 transition-all"
          >
            <Play className="w-5 h-5" /> Start Interactive Lesson with AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
}