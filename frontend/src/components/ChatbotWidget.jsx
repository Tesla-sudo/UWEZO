// src/components/ChatbotWidget.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Globe } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown'; // <-- ADD THIS IMPORT

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'sw', name: 'Swahili' },
  { code: 'sheng', name: 'Sheng' },
  { code: 'luo', name: 'Luo' },
  { code: 'kik', name: 'Kikuyu' },
  { code: 'kal', name: 'Kalenjin' },
  { code: 'luh', name: 'Luhya' }
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const initChat = async () => {
      const systemInstruction = `
        You are the UWEZO Assistant. Your goal is to help people learn investing, build a trusted financial reputation, and safely access micro-investment opportunities. 
        Target audience: First-time investors, informal workers, small business owners, and rural citizens in Kenya.
        Key facts about UWEZO:
        - Users can start investing with as little as KES 50, KES 100, or KES 200.
        - UWEZO provides scam protection, broker verification (Capital Markets Authority), and a practice trading simulator.
        - The platform builds a "Reputation Intelligence Score" based on learning consistency, saving behavior, and engagement.
        
        Rules:
        1. Keep answers incredibly simple, accessible, and empathetic. Avoid complex financial jargon. Use spacing and short paragraphs.
        2. ALWAYS reply entirely in ${LANGUAGES.find(l => l.code === language).name}. If the user speaks a specific dialect, match it naturally.
        3. Do not invent features that UWEZO does not have.
      `;

      const model = genAI.getGenerativeModel({
        model: 'gemini-flash-latest', 
        systemInstruction: systemInstruction,
      });

      chatSessionRef.current = model.startChat({
        history: [],
      });

      const greetings = {
        en: 'Welcome to UWEZO! How can I help you learn about investing today?',
        sw: 'Karibu UWEZO! Nikusaidie vipi kujifunza kuhusu uwekezaji leo?',
        sheng: 'Niaje! Karibu UWEZO. Unataka kujua nini kuhusu ku-invest leo?',
        luo: 'Misawa! Ibiro e UWEZO. Anyalo konyi nade puonjruok weche mag keno pesa kawuono?',
        kik: 'Wĩ mwega! Karibu UWEZO. Ingĩgũteithia atĩa kwĩruta maũndũ ma kũigithia mbeca ũmũthĩ?',
        kal: 'Chamgei! Karibu UWEZO. Aginye konyun eng ngalek ap investment rani?',
        luh: 'Mulembe! Karibu UWEZO. Ndakhonya ndiena okhumanya makhuwa k\'okhubika tsisendi lero?'
      };

      setMessages([{ from: 'bot', text: greetings[language] || greetings['en'] }]);
    };

    if (apiKey) {
      initChat();
    } else {
      setMessages([{ from: 'bot', text: 'Error: Gemini API key is missing. Please check your .env file.' }]);
    }
  }, [language]);

  const sendMessage = async () => {
    if (!input.trim() || !chatSessionRef.current || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage(userMessage);
      const botResponse = result.response.text();
      
      setMessages(prev => [...prev, { from: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform"
        aria-label="Open support chat"
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 max-w-[380px] w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-50 flex flex-col h-[560px]">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="font-medium">UWEZO Assistant</div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-emerald-700 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="bg-emerald-50 text-slate-700 px-4 py-2 border-b border-emerald-100 flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4 text-emerald-600" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent outline-none flex-1 cursor-pointer font-medium"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          {/* Chat Window */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : ''}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-3xl ${
                  msg.from === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-sm' 
                    : 'bg-slate-50 dark:bg-slate-800 dark:text-white rounded-bl-sm shadow-sm border border-slate-100 dark:border-slate-700'
                }`}>
                  
                  {/* UPDATED RENDERING LOGIC */}
                  {msg.from === 'user' ? (
                    msg.text
                  ) : (
                    <ReactMarkdown 
                      components={{
                        // eslint-disable-next-line no-unused-vars
                        p: ({node, ...props}) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                        // eslint-disable-next-line no-unused-vars
                        strong: ({node, ...props}) => <strong className="font-semibold text-emerald-800 dark:text-emerald-400" {...props} />,
                        // eslint-disable-next-line no-unused-vars
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                        // eslint-disable-next-line no-unused-vars
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                        // eslint-disable-next-line no-unused-vars
                        li: ({node, ...props}) => <li className="leading-relaxed" {...props} />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  )}

                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-5 py-3 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 rounded-bl-sm flex gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="flex-1 px-5 py-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-full outline-none disabled:opacity-50 focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
              <button 
                onClick={sendMessage} 
                disabled={isLoading}
                className="bg-emerald-600 text-white px-6 rounded-full disabled:opacity-50 hover:bg-emerald-700 transition-colors shadow-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}