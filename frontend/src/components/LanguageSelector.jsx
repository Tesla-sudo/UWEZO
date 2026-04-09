// src/components/LanguageSelector.js
import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'sheng', name: 'Sheng', flag: '🔥' },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[1]);

  const handleSelect = (lang) => {
    setCurrentLang(lang);
    setIsOpen(false);
    console.log(`🌍 Language switched to ${lang.name}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 rounded-3xl border border-green-200 hover:border-green-400 transition-all shadow-sm"
      >
        <span className="text-2xl">{currentLang.flag}</span>
        <span className="font-medium text-sm">{currentLang.name}</span>
        <Globe className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-green-100 py-2 z-50">
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="px-6 py-4 hover:bg-green-50 dark:hover:bg-slate-700 flex items-center gap-4 cursor-pointer rounded-2xl mx-1"
            >
              <span className="text-3xl">{lang.flag}</span>
              <div>
                <div className="font-semibold">{lang.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}