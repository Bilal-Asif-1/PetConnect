import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about your pet.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }, { from: 'bot', text: 'Sample answer: Please consult a vet for serious issues.' }]);
    setInput('');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold mb-4 text-yellow-900">Pet Chatbot</h1>
      <div className="theme-card p-4 rounded-2xl shadow mb-4 h-64 overflow-y-auto flex flex-col">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === 'user' ? 'text-right mb-2' : 'text-left mb-2'}>
            <span className={msg.from === 'user' ? 'bg-yellow-200 px-2 py-1 rounded' : 'bg-yellow-100 px-2 py-1 rounded'}>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex">
        <input className="flex-1 p-2 border rounded-l border-yellow-200" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your question..." />
        <button className="animal-btn px-4 rounded-r" type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot; 