import React, { useState } from 'react';
import { X, Send, Phone, Image, ShieldCheck, CheckCheck } from 'lucide-react';

export default function ChatModal({ handyman, client, onClose }) {
  if (!handyman) return null;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'handyman',
      text: `¡Hola ${client.name}! Soy ${handyman.name}. Voy en camino hacia ${client.condo}. ¿En qué apartamento estás ubicado?`,
      time: '10:02 AM'
    },
    {
      id: 2,
      sender: 'client',
      text: `Hola Carlos, estoy en la Torre B, Apto 402. Ya dejé la autorización en la caseta de guardias.`,
      time: '10:04 AM'
    },
    {
      id: 3,
      sender: 'handyman',
      text: `Excelente. Llevo la caja de herramientas completa y mi cédula verificada en la app. Llegando en 10-15 minutos.`,
      time: '10:05 AM'
    }
  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'client',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate Handyman quick auto response
    setTimeout(() => {
      const handymanReply = {
        id: Date.now() + 1,
        sender: 'handyman',
        text: '¡Entendido! Registrado en mi hoja de trabajo TASKR. Nos vemos pronto.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, handymanReply]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1b1b]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-[#1a201d] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden h-[90vh] sm:h-[650px] flex flex-col border border-[#e5e2e1] dark:border-[#2e3633] transition-colors duration-500">
        
        {/* Chat Header */}
        <div className="bg-[#033028] dark:bg-[#162b25] text-white p-4 flex items-center justify-between shrink-0 border-b border-[#1e463e] dark:border-[#2e3633]">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={handyman.avatar}
                alt={handyman.name}
                className="w-10 h-10 rounded-xl object-cover border border-[#e5a93c]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#033028]"></span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1">
                {handyman.name}
                <ShieldCheck className="w-3.5 h-3.5 text-[#e5a93c]" />
              </h3>
              <p className="text-[11px] text-[#a5cfc4] font-medium">
                {handyman.specialty} • En ruta a {client.condo}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <a
              href={`tel:${handyman.phone}`}
              className="p-2 text-[#c1ebe0] hover:text-white hover:bg-[#1e463e] rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-[#c1ebe0] hover:text-white hover:bg-[#1e463e] rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fcf9f8] dark:bg-[#121614]">
          {/* Security Banner */}
          <div className="bg-[#f0f7f5] dark:bg-[#162b25] border border-[#c1ebe0] dark:border-[#2e3633] text-[#033028] dark:text-[#a5cfc4] text-[11px] p-2.5 rounded-xl text-center font-medium">
            🔒 Chat protegido. Tu código de pase al condominio se actualizará automáticamente.
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender === 'client';
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs space-y-1 ${
                    isMe
                      ? 'bg-[#033028] dark:bg-[#1e463e] text-white rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-[#222926] text-[#1c1b1b] dark:text-[#f3f0ef] border border-[#e5e2e1] dark:border-[#2e3633] rounded-bl-none card-shadow'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right font-mono ${
                      isMe ? 'text-[#a5cfc4]' : 'text-[#717976] dark:text-[#a9acaa]'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-white dark:bg-[#1a201d] p-3 border-t border-[#e5e2e1] dark:border-[#2e3633] flex items-center space-x-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe un mensaje al técnico..."
            className="flex-1 bg-[#f6f3f2] dark:bg-[#222926] text-[#1c1b1b] dark:text-white placeholder:text-[#717976] dark:placeholder:text-[#a9acaa] text-xs px-3.5 py-2.5 rounded-full border border-[#c0c8c5] dark:border-[#414846] focus:outline-none focus:ring-2 focus:ring-[#033028] dark:focus:ring-[#e5a93c]"
          />
          <button
            onClick={handleSend}
            className="bg-[#033028] dark:bg-[#1e463e] hover:bg-[#1e463e] dark:hover:bg-[#264e45] text-white p-2.5 rounded-full shadow-md transition-transform transform active:scale-90"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
