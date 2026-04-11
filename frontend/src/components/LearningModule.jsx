// src/components/LearningModule.jsx
import React, { useState } from 'react';
import { Play, Award, BookOpen, Shield, TrendingUp, Clock } from 'lucide-react';

export default function LearningModule() {
  const [activeLesson, setActiveLesson] = useState(null);

  const lessons = [
    {
      id: 1,
      title: "Understanding Saccos in Kenya",
      description: "Learn how Saccos work, their benefits, and how to start with as little as KES 50.",
      duration: "8 min",
      level: "Beginner",
      content: "A Sacco (Savings and Credit Cooperative) is a member-owned financial institution where people pool their money together to save and borrow at better rates than banks.\n\nIn Kenya, Saccos are regulated and very popular because they offer higher interest on savings and lower interest on loans.\n\nUWEZO recommends starting with licensed Saccos that are also linked to the Nairobi Securities Exchange.",
    },
    {
      id: 2,
      title: "How to Start Investing on the NSE",
      description: "Step-by-step guide for first-time investors with small capital.",
      duration: "12 min",
      level: "Beginner",
      content: "1. Open a CDS account with a stockbroker\n2. Verify your identity (KRA PIN required)\n3. Start with as little as KES 100 through selected investment vehicles\n4. Use UWEZO's practice simulator first to learn without risk.",
    },
    {
      id: 3,
      title: "How to Spot and Avoid Scams",
      description: "Protect yourself from fake investment schemes and brokers.",
      duration: "10 min",
      level: "Essential",
      content: "Red flags:\n• Guaranteed high returns (30%+ per month)\n• Pressure to invest quickly\n• No CMA license\n• Unsolicited WhatsApp/Instagram offers\n\nAlways verify brokers using UWEZO’s Broker Verification tool.",
    },
    {
      id: 4,
      title: "Building Your Reputation Score",
      description: "How your learning and small investments increase your trust score.",
      duration: "7 min",
      level: "Intermediate",
      content: "Your UWEZO Reputation Score improves when you:\n• Complete lessons consistently\n• Practice trading in the simulator\n• Make successful small investments\n• Verify brokers before investing\n\nHigher score = Higher investment limits and better opportunities.",
    },
  ];

  const openLesson = (lesson) => {
    setActiveLesson(lesson);
  };

  const closeLesson = () => {
    setActiveLesson(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-5 py-2 rounded-3xl text-sm font-medium">
          <BookOpen className="w-4 h-4" /> LEARNING HUB
        </div>
        <h1 className="text-5xl font-semibold tracking-tighter mt-6 text-slate-900 dark:text-white">
          Learn. Verify. Invest.
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
          High-quality financial education designed for Kenyans
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 transition-all cursor-pointer group"
            onClick={() => openLesson(lesson)}
          >
            <div className="flex justify-between mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-2xl">
                {lesson.id === 1 && <BookOpen className="w-6 h-6 text-emerald-600" />}
                {lesson.id === 2 && <TrendingUp className="w-6 h-6 text-emerald-600" />}
                {lesson.id === 3 && <Shield className="w-6 h-6 text-emerald-600" />}
                {lesson.id === 4 && <Award className="w-6 h-6 text-emerald-600" />}
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3" /> {lesson.duration}
                </div>
                <span className="text-[10px] px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 inline-block">
                  {lesson.level}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              {lesson.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {lesson.description}
            </p>

            <button className="mt-8 w-full h-11 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-3xl font-medium transition-colors">
              Start Lesson
            </button>
          </div>
        ))}
      </div>

      {/* Lesson Modal */}
      {activeLesson && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-8 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {activeLesson.title}
                </h2>
                <p className="text-emerald-600 text-sm mt-1">{activeLesson.duration} • {activeLesson.level}</p>
              </div>
              <button 
                onClick={closeLesson}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-8 prose dark:prose-invert max-h-[60vh] overflow-y-auto leading-relaxed">
              {activeLesson.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4 text-slate-600 dark:text-slate-300">{paragraph}</p>
              ))}
            </div>

            <div className="p-8 border-t border-slate-200 dark:border-slate-700 flex gap-4">
              <button 
                onClick={closeLesson}
                className="flex-1 h-12 border border-slate-300 dark:border-slate-600 rounded-3xl font-medium"
              >
                Close
              </button>
              <button 
                onClick={() => alert("Voice lesson feature coming soon. For now, read above.")}
                className="flex-1 h-12 bg-emerald-600 text-white rounded-3xl font-medium hover:bg-emerald-700"
              >
                Listen to Voice Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}