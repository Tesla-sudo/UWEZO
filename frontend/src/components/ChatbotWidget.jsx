// src/components/ChatbotWidget.js
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Habari! How can I help you invest smarter today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        from: 'bot', 
        text: "Great question! For beginners, start with low-risk Saccos. Want a lesson or investment ideas?" 
      }]);
    }, 900);
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
        <div className="fixed bottom-28 right-8 w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-50 flex flex-col h-[480px]">
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="font-medium">UWEZO Assistant</div>
            <button onClick={() => setIsOpen(false)}><X /></button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : ''}`}>
                <div className={`max-w-[80%] px-5 py-3 rounded-3xl ${msg.from === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask anything..."
                className="flex-1 px-5 py-3 bg-slate-100 dark:bg-slate-800 rounded-3xl outline-none"
              />
              <button onClick={sendMessage} className="bg-emerald-600 text-white px-6 rounded-3xl">Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}