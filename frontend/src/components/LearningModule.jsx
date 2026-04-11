// ===============================
// src/components/LearningModule.jsx
// Enhanced with:
// - Lesson completion tracking
// - localStorage persistence
// - Reputation score calculation
// - Voice lesson support
// - Progress indicator
// ===============================

import React, { useState, useEffect } from "react";
import { Play, Award, BookOpen, Shield, TrendingUp, Clock, CheckCircle } from "lucide-react";

export default function LearningModule() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [reputationScore, setReputationScore] = useState(0);

  const lessons = [
    {
      id: 1,
      title: "Understanding Saccos in Kenya",
      description:
        "Learn how Saccos work, their benefits, and how to start with as little as KES 50.",
      duration: "8 min",
      level: "Beginner",
      content:
        "A Sacco (Savings and Credit Cooperative) is a member-owned financial institution where people pool their money together to save and borrow at better rates than banks.\n\nIn Kenya, Saccos are regulated and very popular because they offer higher interest on savings and lower interest on loans.",
    },
    {
      id: 2,
      title: "How to Start Investing",
      description: "Step-by-step guide for first-time investors with small capital.",
      duration: "12 min",
      level: "Beginner",
      content:
        "1. Open a CDS account with a stockbroker\n2. Verify your identity\n3. Start small\n4. Practice using the simulator first.",
    },
    {
      id: 3,
      title: "How to Spot and Avoid Scams",
      description: "Protect yourself from fake investment schemes.",
      duration: "10 min",
      level: "Essential",
      content:
        "Red flags include guaranteed high returns, pressure to invest quickly, and unlicensed brokers.",
    },
    {
      id: 4,
      title: "Building Your Reputation Score",
      description: "How your learning improves your trust level.",
      duration: "7 min",
      level: "Intermediate",
      content:
        "Complete lessons, practice trading, and invest responsibly to increase your reputation score.",
    },
  ];

  // Load saved progress
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("completedLessons")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompletedLessons(saved);
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));

    const score = completedLessons.length * 10;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReputationScore(score);
  }, [completedLessons]);

  const openLesson = (lesson) => setActiveLesson(lesson);
  const closeLesson = () => setActiveLesson(null);

  const markComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
  };

  const speakLesson = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
  };

  const progressPercent = Math.round((completedLessons.length / lessons.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2 rounded-3xl text-sm font-medium">
          <BookOpen className="w-4 h-4" /> LEARNING HUB
        </div>

        <h1 className="text-5xl font-semibold tracking-tighter mt-6">
          Learn. Verify. Invest.
        </h1>

        <p className="text-slate-500 mt-3 text-lg">
          Reputation Score: <span className="text-emerald-600 font-semibold">{reputationScore}</span>
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mt-6">
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">{progressPercent}% completed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-3xl p-8 border hover:border-emerald-200 transition-all cursor-pointer"
            onClick={() => openLesson(lesson)}
          >
            <div className="flex justify-between mb-6">
              <div className="p-3 bg-emerald-100 rounded-2xl">
                {lesson.id === 1 && <BookOpen className="w-6 h-6 text-emerald-600" />}
                {lesson.id === 2 && <TrendingUp className="w-6 h-6 text-emerald-600" />}
                {lesson.id === 3 && <Shield className="w-6 h-6 text-emerald-600" />}
                {lesson.id === 4 && <Award className="w-6 h-6 text-emerald-600" />}
              </div>

              {completedLessons.includes(lesson.id) && (
                <CheckCircle className="text-emerald-600" />
              )}
            </div>

            <h3 className="text-xl font-semibold mb-3">{lesson.title}</h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              {lesson.description}
            </p>

            <button className="mt-8 w-full h-11 border border-emerald-600 text-emerald-600 rounded-3xl font-medium">
              Start Lesson
            </button>
          </div>
        ))}
      </div>

      {activeLesson && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-8 border-b flex justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{activeLesson.title}</h2>
                <p className="text-emerald-600 text-sm mt-1">
                  {activeLesson.duration} • {activeLesson.level}
                </p>
              </div>

              <button onClick={closeLesson} className="text-2xl">×</button>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {activeLesson.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="p-8 border-t flex gap-4">
              <button
                onClick={() => markComplete(activeLesson.id)}
                className="flex-1 h-12 bg-emerald-600 text-white rounded-3xl font-medium"
              >
                Mark as Completed
              </button>

              <button
                onClick={() => speakLesson(activeLesson.content)}
                className="flex-1 h-12 border border-emerald-600 text-emerald-600 rounded-3xl font-medium"
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


